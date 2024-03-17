# 第 3 章 AppRouter の規約

## 3.1 Segement 構成ファイル

Route Segement のファイルは Page と Layout だけではない

- Segment 構成ファイルは通常画面以外の UI も提供する

  - エラー UI や読み込み UI など...
    - ネストされた Segment は親の layout、loading、not-found、error が Subtree として構築される
  - Server Component または Client Component で作成

- layout.tsx
  - Segment とその子の共通のレイアウト UI
- page.tsx
  - Segment の通常時の UI
- lading.tsx
  - Segment とその子の読み込み UI
  - ローディングスピナーなど簡易的なローディング UI を提供できる
  - props は指定できない
- not-found.tsx
  - Segment とその子の 404 エラー UI
  - データ取得や該当のリソースが見つからなかったことを通知する UI
  - notFount()が実行されると例外が thorw されるため、それを catch して表示される
- error.tsx
  - Segment とその子のエラー UI
    - 404 エラーを上書きしてしまう可能性がある
  - データ取得や画面の提供時に例外が発生したら、UI を表示
  - "use client"を定義して,Client Component として扱う
  - layout.tsx でエラーが発生したときは親 Route Segment の error.tsx が処理される
- route.ts
  - サーバーサイド API エンドポイント
  - Web API を提供するためのファイル
  - App Router では「Route Handler」と呼ぶ
- template.tsx
  - 再レンダリングされるレイアウト UI
- default.tsx
  - Parallel route のフォールバック UI
- grobal-error
  - Segment 単位で設定しないファイル
  - 他の error.tsx でハンドリングされなかった例外をキャッチした場合、この画面が表示
  - "use client"を定義して,Client Component として扱う

```javascript
<Layout>
  <Template>
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        {/* ローディングが終わって返ってきたレスポンスが見つからなければNotFoundを表示したい */}
        <ErrorBoundary fallback={<NotFound />}>
          <Page />
        </ErrorBoundary>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>

↓以下のようにネストされたSegmentにも読み込みUIやエラーUIが構築される
<Layout>
  <Template>
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <Layout>
          <Template>
            <ErrorBoundary fallback={<Error />}>
              <Suspense fallback={<Loading />}>
                <ErrorBoundary fallback={<NotFound />}>
                  <Page />
                </ErrorBoundary>
              </Suspense>
            </ErrorBoundary>
          </Template>
        </Layout>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
```

## 3.2 Segment 構成フォルダ

### 3.2.1 Dynamic Route Segment

- slug: URL の最後にある Web アドレスの固有の識別部分

  - app/users/area/[sulg]/page.tsx

- 基本
  - [sulg]という命名規則
    - sulg というキーは任意で指定可能(id とか, userId とか)
- Catch-all Segment
  - [...sulg]という命名規則
  - ネストされた Path に対応して、配列としてパスパラメーターを参照可能
  - { sulg: ["国","県","町"] }
    - "/area/国/県/町"
  - "/area"リクエストには応じることができない
  - 【セルフメモ】: ブログの階層構造に使えそう
- Optional Catch-all Segment
  - [[...sulg]]という命名規則
  - "/area"リクエストにも応じることが可能
  - { sulg: ["国","県","町"] } or {}
    - "/area/国/県/町" or "/area"

### 3.2.2 Route Groups

- /(sometnig)とディレクトリ名を定義する
- 用途ごとに異なるレイアウトを提供したいケースに使用する
- 親の Laypout は Route Groups の子 Segment に適用される
  - それ以外に異なるレイアウトを子 Segment に適用できる
- 親セグメントの Root Layout を適用しつつ、Route Groups にそれぞれ Layout を適用できる

### 3.2.3 Private Folder とコロケーション

- コロケーション : 特定機能の関連ファイルをまとめること
- Private Folder : アンダースコアを接頭辞に持つフォルダを Private Folder という
  - Next.js では Private Folder は Routing 対象外になる
  - "/\_components"
    - 慣例的に閉じられたスコープに必要なコンポーネントの格納先であることを示す

## 3.3 Parallel Routes と Intercepting Routes

- Parallesl Routes
  - @folder というフォルダ名規則を使用して、Slot を作成する
    - Segment ではないため、URL に影響しない
  - Slot は layout.tsx において、children と同じように props を渡すことができる
  - @folder を Root とした Subtree と表示している Root Segment が一致したタイミングで表示される
  - default.tsx は一致する Route Segment が表示されるまでの間、Slot に表示されるフォールバック UI
- Intercepting Routes
  - Route をインターセプトするための Route 定義
  - 通常定義された Segment をインターセプトし、このフォルダ内に格納された異なる Segment 定義を画面として提供する
    - 相対パス規則に似たフォルダ名定義
    - 同じレベル:(.)
    - 1 つ上の階層:(..)
    - 2 つ上の階層:(..)(..)
    - app ディレクトリの root:(...)
  - ソフトナビゲーションでモーダル画面を表示する UI の実装などが可能
    - 「ソフトナビゲーション時のみ」という決まり
  - リロードなどして、ハードナビゲーションをするとインターセプトは起きずに通常定義されたセグメントが画面として提供される
  - 例
    - /@modal/(.)photo/[photoId]/page.tsx
    - /photos/photos/[photoId]/page.tsx

## 3.4 Route のメタデータ

- SEO 観点で重要なメタデータを定義する API が用意されている
  - <head>要素内の<title>や<meta>

### 3.4.1 静的メタデータ

- 任意 Segment の Page ファイルや Layout から metadata オブジェクトを export する
  - レンダリングされる HTML に適切なメタデータが出力される

### 3.4.2 動的メタデータ

- 任意 Segment の Page ファイルや Layout ファイルから、generateMetadata 関数を export する

【セルフメモ】: メタデータは後で調べる必要あり
