# 第 9 章 データ更新と UI

## 9.1 Server Action の基礎

- Server Action : Form からサーバーの非同期関数を直接呼び出せる機能
  - メリット
    - API Client(中間コード)がなくなる
    - Browser 向けにバンドルされていた API Client が少なくなる
    - ハイドレーションが完了する前に実行できる
  - "use server"の宣言が必要
    - 関数内に記述
    - ファイルとして関数を切り出す場合は、actions.ts といった Server Actions 専用ファイルに切り出す
  - form タグの action 属性に関数を渡す
- FormData(引数の参照)
  - Server Action は第一引数に Web 標準の FormData オブジェクトをとる
- Binding Arguments(引数のバインド)
  - 関数オブジェクトの bind メソッドを使用して、Server Action に引数をバインドできる
  - バインドされた引数の後ろに FormData をとる

```js
export default function Page() {
  const action = myAction.bind(null, id)

  return (
    <form action={action}>
      {/* ... */}
    </form>
  )
}

export default async function myAction(id: string, formData) {
  //...
}
```

- Progressive Enhancement
  - ハイドレーションが完了する前に Form が利用できるため、ユーザーを待たせることがない
    - リッチなインタラクションをハイドレーションが完了した後に追加する
  - form 要素に action 属性を渡すことで有効になる
  - 以前までは onSubmit ハンドラーで JS がロードされてからハイドレーションを行い、それが完了するまで Form イベントを送信できなかった

## 9.2 Server Action によるデータ保存

- On-demand Revalidation: 任意のタイミングでキャッシュを無効化するプロセスのこと

  - 利点(Route Handler と比べて)
    - router.refresh を実行する必要がない
    - redirect 関数を使用して遷移すると、更新と同時に画面遷移ができる
  - キャッシュを無効化するだけで、キャッシュが再作成されるのは新たにリクエストを送ったとき
  - revalidatePath: 特定の Route のパスでキャッシュを無効化
  - revalidateTag: 特定のタグでキャッシュを無効化

    - タグはどこかにまとめておくほうがリクエストを送る関数と revalidate する関数で再利用できる
    - タグは userId などを用いて一意のキャッシュを行うほうが良い

  - Route Handler で revalidateTag による無効化をする場合は router.refresh の実行も必要

    - Ruoter キャッシュにヒットしているから

  - メッセージの表示分岐
    - useFormStatus Hook を用いて、レンダリングした form 要素の情報を参照できる
      - 注意点: 子コンポーネントで useFormStatus を使う場合は form 要素ないに含まれていること

## 9.4 Server Action のエラーハンドリング

- Server Action のための useFormState Hook
  - Form の状態を保持する Hooks
  - Client Component のみ
- prisma.$transaction でエラーが発生したときにロールバックを自動で実行されるようにする

## 9.5 Server Action とフィードバック UI 表示

- いいねを送る
  - ログインしていればいいねの処理
  - ログインしていなければ「ログイン誘導モーダル」が表示
    - 自身でセットした status 数値を参照して、モーダルを出し分ける
  - key 属性による強制再レンダリングでエラーが発生されるたびに開かれる

## 9.6 Server Action による楽観的 UI 更新

- ログインユーザー ID を参照できた場合のみログイン中と判断してコメント投稿コンポーネントを表示
- section タグ : 具体的な意味を持たないタグ
  - article タグや nav タグなどのセクショニングタグと同様
- Optimistic Update(楽観的更新): Web API リクエストが成功する前提で先んじて UI を更新する手法のこと
- useOptimistic : Optimistic Update を実装するための React Hook
  - サーバーサイドで(重い)処理が行われている間、どのようなデータを表示するかを決定する機能
    - 送信中は灰色にして、完了したら黒色の文字にするみたいな
      - useOptimistic の第二引数のコールバック関数で sending: true を渡して色を変えてる
        - sending の型がつかないのが違和感あり

## 9.7 Server Action の Form バリデーション

- 登録するデータに不整合がおこならいかを事前に検証
- Zod: TypeScript プロジェクトに適したバリデーションライブラリ
  - ZodError が throw される
- try/catch によるバリデーションエラーの補足と状態更新
  - Server Action でバリデーションして、try/catch 内で ZodError が throw されたら catch して、フロントに通達する
  - form 要素の onSubmit 属性にバリーデーション処理を記述して値のチェック
- バリデーションエラーが発生したら、event.preventDefault()を呼び出し、form 要素の submit(action 実行)を中止する

  - Client バリデーションで不正な入力値が見つかった場合は、送信を中止するということ
  - action と onSubmit を切り分けている理由は、Progressive Enhancement を維持するため

- ハイドレーションが完了する前の送信: Client バリデーションを実行できない
- ハイドレーションが完了した後の送信: Client バリデーションを実行できる

## 9.8 Revalidiate の設計

- Data キャッシュや Full Route キャッシュはパフォーマンス面で大きなメリットがある

  - データとキャッシュを同期させるための工夫が必要
    - なぜかキャッシュが更新されないというのを防ぐため

- 複数ページをキャッシュしている場合、revalidatePath で特定のページを無効化しても、他のページが無効化されないため、不整合が発生する

  - そこで revalidateTag を事前にキャッシュへ付与しておくことで、タグ付けしたキャッシュを無効化する

- **キャッシュタグの設計**
  - 任意のタグ文字列をどのように文字列にするかがポイント
    - タグが抽象的であるほど、無効化は楽になる
      - 抽象的 : 大雑把にこのページなど
        - next: { tags: ["categories"]}
    - タグが具体的であるほど、データソースアクセス効率が良好になる
      - 具体的 : このページの何番目など
        - next: { tags: ["categories/${categoryName}"]}
  - 然るべきデータのキャッシュを revalidate するかは tag の抽象的、具体的な命名によって決まる
    - ここをアプリでどれが最適かを考える必要がある
