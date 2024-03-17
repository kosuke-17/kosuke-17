# 第 4 章 Route Handler

## 4.1 Route Handler の定義

### 4.1.1 Route Handler の概要

- route.ts というファイルを設置することで Route Handler を定義

  - 定義した Path がリクエストの API となる
  - route.ts 内で HTTP リクエストの関数ごとに対応
    - GET,POST,PUT,PATCH,DELETE,HEAD,(OPTION)
    - HTTP リクエストに沿った関数が export されていなければ 405 エラー(method not allowed)発生
    - NextResponse : 関数の第一引数で渡ってくる
    - NextRequest : 関数が返すレスポンス
      - 第 2 引数のオプションで HTTP ステータスコードを返すことができる

- 以下のようなコンフリクトに注意
  - app/route.ts
  - app/api/route.ts
  - 開発時(next dev)には気付けなく、next build でのビルド時に気づく
  - app/api というディレクトリを用意して、そこで Route Handler を定義していくというやり方に統一すると、コンフリクトは起こらない

## 4.2 Route Handler のレンダリング

- 画面の Route が HTML をレンダリングするように、Route Handler は JSON をレンダリングする
  - 画面の Route と同様に「静的レンダリング・動的レンダリング」を切り替えることができる

### 4.2.1 静的 Route Handler

- ビルド時にレスポンスボディの JSON をキャッシュファイルとして出力する
  - リクエストのたびに外部の API からデータを取得する必要がない
- ビルド時の ○ のアイコン

- 静的データ取得
  - Route Handler で fetch 関数を使用している場合、複数のリクエストに対して同じキャッシュファイルを使用する

### 4.2.2 動的 Route Handler

- ビルド時の λ のアイコン

- 要因 1 : Dynamic Segment 値の参照
  - 第二引数の params から渡ってくる Dynamic Segment 値(id など)
- 要因 2 : Request オブジェクトの参照
  - URL インスタンをを生成するために使用する request.url の記述
- 要因 3 : 動的関数の使用
  - cookeis()や headers()を使用
- 要因 4 : GET と HEAD 以外の HTTP 関数の export
- 要因 5 : Segment Config Options の指定
  - 公式を参照する

## 4.3 Route Handler の使用例

- ブラウザからの HTTP リクエストに対応する

  - ユーザー操作に応じて DB に操作内容を保存する

- 例 : いいね機能
  - Route handler でログインユーザーの情報がわかるため、誰がいいねしたのかがわかる
