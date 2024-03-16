# 第 2 章 Server Component とレンダリング

## 2.1 Server Component と Client Component

<!-- 大事 -->

### 2.1.1 Server Component の概要

- React では、SSR におけるすべてのコンポーネントは**ブラウザ/サーバーの両方**で実行されるものだった
  - コンポーネントは同期関数でしか書くことができなかった
    → つまりコンポーネント自体が非同期関数では動かない
- 対して、「React Server Component(RSC)」は**サーバーサイドでのみ**実行されるコンポーネントである

  - Server Component では非同期で書くことができる
    - コンポーネント上から DB のデータや API のデータを非同期で取得してレンダリングすることが可能になった

- App Router は定義したコンポーネントはデフォルトで Server Component として扱われる
  - Server Component のみで構成されているのであれば、コンポーネントの JS ファイルがブラウザに送られないので、高速な Web アプリになる

【セルフメモ】

- 非同期関数コンポーネントで DB アクセスできることで、Server Component であれば useEffect を使用して外部との同期を行う必要がなくなった
  - useEffect の削減できるメリットにつながる

### 2.1.2 Client Component の概要

- 従来の Pages Router は getServerSideProps などで SSR を提供していた

  - サーバーとブラウザの両方で実行されていた
    - サーバー側で、HTML のレンダリングを行う
    - ブラウザ側で、インタラクティブな操作ができるようにイベントハンドラなどの JS コードを DOM にアタッチする「ハイドレーション」という処理を行う必要があった
  - すべてのコンポーネントをブラウザ向けにバンドルする必要がある

- Server Component はサーバーサイドでしか実行されないため、「ブラウザ/サーバー両方で実行されるコンポーネントが必要」

  - それが Client Component

- `"use client"`をファイルに記述して宣言することで Client Component として扱うことができる

  - Client Component をまたいだ先のコンポーネントコードはインタラクションに必要なコードが含まれているものとして、ブラウザ向けにバンドルされて送られる
  - 「ブラウザでも実行されるべきコンポーネント」が多くのケースで小さな範囲に絞り込むことができる
    - 従来の SSR はすべてのコンポーネントをバンドルする必要があったため、それと比べるとかなり処理量が削減される

- App Router では Server Component と Client Component との境が存在することで、ブラウザにおくる JavaScript を必要最小限に抑えられてパフォーマンスの向上が見込める

- Client Component から import されるコンポーネントや関連ファイルもバンドルされることを覚えておく必要がある

【セルフメモ】

- アプリが成長してコード量が多くなると、ページ単位での SSR だと処理に追われてパフォーマンスが下がってしまう
  - Client のコードが増えていくことでパフォーマンスの低下につながっていた。他に選択肢がなかったから仕方がない気もする
  - Server Component が出たことで、Client にコードを書くのか Server にコードを書くのかをパフォーマンスの観点から判断して選択できるようになったのが良いのかもしれない
    - 考えることが増えて大変と思うかもしれないが、UX を良いものにするという本質から逆算するとすぐに判断できるのかもしれない

### 2.1.3 Server / Component の使い分け

- Server Component を使うケース
  - データを取得
  - バックエンドリソースを取得(API 叩くとか)
  - 機密情報を扱う(Cookie などに入れておくデータとか)
- Client Component を使うケース
  - インタラクティブな機能を持つ
  - コンポーネントに保持した状態を扱う
  - ブラウザ用の API や Hooks を使用する

### 2.1.4 Server/Client Component の境界

- 必要な場所で必要に応じて`"use client"`の宣言を行う

  - すべての Client Component で宣言するものでない
    - 親が Client Component であるならば、子コンポーネントは`"use client"`の宣言を行う必要がない

- 「Client Component でしか使えない API が存在します」というエラーで警告されてから`"use client"`の宣言を行うぐらいの感覚で良い

Client Component の実例

<details>
<summary style="font-size: 20px; font-weight: bold">イベントハンドラーを追加したい</summary>

```javascript
'use client' // ★: "use client" ディレクティブを追加する

export function LikeButton({ photoId }: { photoId: string }) {
  // ★: onClick イベントハンドラーを追加したい
  return (
    <button
      onClick={() => {
        console.log(`photoId ${photoId} が「いいね」されました`)
      }}
    >
      いいね
    </button>
  )
}
```

</details>
<details>
<summary style="font-size: 20px; font-weight: bold">usePathname Hook を使用して、現在のパスを取得したい</summary>

```javascript
"use client"; // ★: "use client" ディレクティブを追加する

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";

function getAriaCurrent(flag: boolean) {
  return flag ? { "aria-current": "page" as const } : undefined;
}

export function Nav() {
  // ★: usePathname Hook を使用して、現在のパスを取得したい
  const pathName = usePathname();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/" {...getAriaCurrent(pathName === "/")}>
            トップ
          </Link>
        </li>
        <li>
          <Link
            href="/categories"
            {...getAriaCurrent(pathName.startsWith("/categories"))}
          >
            カテゴリー一覧
          </Link>
        </li>
      </ul>
    </nav>
  );
}


```

</details>

## 2.2 Server Component のデータ取得

### 2.2.1 直接データを取得する Server Component

- Server Component ではコンポーネントレベルでデータ取得ができる
- セキュリティ、パーフォーマンス的な観点から可能な限り Server Component を使用することが推奨されている
  - 理由
    - アクセストークンや API キーの機密情報がクライアント側に漏洩されてしまうことを防ぐことができる
    - クライアント・サーバー間における通信の往復回数が削減される
    - クライアント・サーバー間におけるウォーターフォールが削減される
- Page ファイルのみがデータ取得できるわけではない
  - Layout ファイルやそれらの子コンポーネントの Server Component でもデータ取得できる

### Server Component のデータ取得の実例

- モックデータを返す API サーバーを用意

- getPhotos 関数のような fetch 関数を利用したデータ取得関数を用意
  - どういったデータを取得しているのかわかりやすい
  - リクエストのメモ化の考慮漏れが起こりづらい

<details>
<summary style="font-size: 20px; font-weight: bold">データを取得し、表示する</summary>

```javascript
async function getPhotos() {
  const data: { photos: Photo[] } = await fetch(
    'http://localhost:8080/api/photos'
  ).then((res) => res.json())
  return data.photos.map(({ id, title }) => ({ id, title }))
}

export default async function Page() {
  const photos = await getPhotos() // <- データを取得
  return (
    <div className={styles.container}>
      <h1>トップ画面</h1>
      <ul>
        {photos.map(({ id, title }) => (
          <li key={id}>
            <Link href={`/photos/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

</details>

複数種類のデータを取得する場合は平行でデータ取得することで、レスポンスが速くなる

<details>
<summary style="font-size: 20px; font-weight: bold">データを平行で取得する</summary>

```javascript
async function getCategory(categoryName: string) {
  const data: { category: Category } = await fetch(
    `http://localhost:8080/api/categories/${categoryName}`
  ).then((res) => res.json())
  return data.category
}

async function getPhotos() {
  const data: { photos: Photo[] } = await fetch(
    'http://localhost:8080/api/photos'
  ).then((res) => res.json())
  return data.photos
}

type Props = {
  params: { categoryName: string },
  searchParams: { [key: string]: string | string[] | undefined },
}

export default async function Page({ params, searchParams }: Props) {
  // ★: Promise.all を使用した並列データ取得
  const [category, photos] = await Promise.all([
    getCategory(params.categoryName),
    getPhotos(),
  ])
  // 🚧: 本来であれば、カテゴリーに紐づく写真のみを取得しページネーションを施す
  const page = getPage(searchParams)

  // ...
}
```

</details>

## 2.3 動的データと静的データ取得

<!-- 大事 -->

- fetch 関数は Next.js が Web API の fetch 関数を拡張している
  - なぜ拡張しているのか
    - 静的データをキャッシュするため拡張している
    - `.next/cache/fetch-cache`にキャッシュ
  - キャッシュすることで何が良いのか
    - データソースへのアクセスを減らし、レスポンスの高速化に寄与

### 2.3.1 動的データ・静的データの概要

API から取得するデータは動的データと静的データの 2 種類に分けられる

- 動的データ
  - 頻繁に更新されるデータ
  - 閲覧履歴、商品在庫数など
- 静的データ
  - 更新頻度が低く、誰もが共有できるデータ
  - 商品概要、ブログ記事など

### 2.3.2 fetch 関数デフォルトのキャッシュ設定

- fetch 関数に施している拡張 : 「何も指定しなければ、静的データ取得と扱われて結果はキャッシュされる」
- 動的なデータの場合はどうするのか
  - `{ cache: "no-store"}`を指定することで、デフォルトの設定が解除されて、リクエストのたびにデータ取得を行う

### 2.3.3 キャッシュの把握に関数注意事項

- Next.js のキャッシュは`npm run dev`で起動した場合だと、正確な挙動を把握できない

  - ビルドして、`npm start`できどうする必要がある

- Next.js のキャッシュを削除するには`rm -rm .next/cache/fetch-cache`を行う

### 2.3.4 動的データ取得・静的データ取得

training-web3 でトップ画面の下記のコードを追加して、`npm run clean start`して再起動する
→ 画面をリロードするたびにデータ取得のリクエストが行われる

```javascript
async function getPhotos() {
  const data: { photos: Photo[] } = await fetch(
    'http://localhost:8080/api/photos',
    { cache: 'no-store' } // 追加
  ).then((res) => res.json())
  return data.photos.map(({ id, title }) => ({ id, title }))
}
```

## 2.4 Route のレンダリング

<!-- 大事 -->

- Next.js は Route 単位でレンダリング手法を変えられるため、可能なものは静的ファイルとして配信するべき

### 2.4.1 Route ごとのレンダリング種別

- 静的レンダリング Route : すべてのリクエストに対して、同じレンダリング結果をレスポンスする
  - レンダリング結果を HTML などの静的ファイルに出力し、レスポンスとして使用できる
    - ユーザーと地理的に近い CDN から配信できる
  - 「SSG/ISG」と呼ばれ、Pages Router から存在する機能を App Router が引き継いでいる
    - より細かな粒度で徹底が可能
  - パフォーマンス面で、動的レンダリング Route よりも優れている
- 動的レンダリング Route : リクエストの内容に応じて、異なるレンダリング結果をレスポンスする

  - リクエスト内容を都度評価する
  - 常に最新のデータを返したり、レスポンスに応じたレンダリング結果を動的に変える Route

- 「動的・静的」の判別
  - ビルドしたタイミングで Route 一覧が表示される
    - λ アイコンは「動的」Route
    - ○ アイコンは「静的」Route

### 2.4.2 動的レンダリング Route

- **Next.js は基本的にすべての Route を「静的レンダリング」しようとする**
  - 以下の要因が含まれる場合に静的レンダリングができないと判断されて、「動的なレンダリング」を提供する
    - 要因 1 : 動的データ取得の使用
      - `{ cache: "no-store" }`などで動的データ取得にするという記述で判断する
      - API サーバーが停止した状態で、ビルドを試すと失敗する
        - ビルド時にすべての Route においてレンダリングを試して、動的データ取得が含まれているかをチェックしてる
    - 要因 2 : 動的関数の使用
      - 動的関数 : HTTP リクエストの内容を参照する関数のこと
        - cookies(),headers(),searchParams(), useSearchParams()
      - ビルド時に動的関数が使用されているかをすべての Route で検証する
        - 使用が確認されると、Route は動的レンダリングに切り替わる
    - 要因 3 : Dynamic Segment の使用
      - パスパラメーターが送られてくるため、動的レンダリングとして判断される
        - 条件によっては静的レンダリングになりうる

### 2.4.3 静的レンダリング Route

- Route 実装に「動的」レンダリングが含まれない場合、Next.js は「静的」レンダリング結果をキャッシュファイルに出力
- キャッシュファイルへの出力タイミング
  - ビルド時
  - リクエスト時
  - Revalidate 時
    - 正確には Time-based/On-demand Revalidation によってタイミングが違う

---

使う項目

## 2.1

### 2.1.1

<details>
<summary style="font-size: 20px; font-weight: bold"></summary>
</details>

【セルフメモ】
