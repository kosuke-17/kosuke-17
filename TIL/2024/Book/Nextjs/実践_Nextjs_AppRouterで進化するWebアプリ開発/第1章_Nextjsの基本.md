# 1 章 Next.js の基本

## 1.1 Next.js の初め方

- プロジェクトの雛形作成
  - プロジェクト名や TyeScript の使用などの対話を行い、プロジェクトに関するツールの設定を行う

```
npx create-next-app
```

## 1.2 アプリケーションのルーティング

### 1.2.1 Route 定義に関わる用語

参照: [Routing Fundamentals/ Terminology](https://nextjs.org/docs/app/building-your-application/routing#terminology)

UI のためのフォルダの階層構造で使われる用語

- Tree, Subtree, Root, Leaf

URL のためのフォルダ構造で使われる用語

- Segment とは Path の最小単位
- Path とは URL 文字列のこと
- Dynamic Route とは Path が動的に変わるもののこと

例 : `example.com/profile/setting`

- Route Segment : app dir ~ setting dir
  - `example.com/profile/setting`
- Root Segment : app dir
  - `example.com/`
- Segment : profile dir
  - `/profile`
- Leaf Segment : setting dir
  - `/setting`

例 : `example.com/photos/[photoId]`

- Route Segment: app dir ~ setting dir
  - `example.com/photos/[photoId]`
- Dynamic Route : photos dir ~ [photoId] dir
  - `/photos/[photoId]`
- Dynamic Segment : [photoId] dir
  - `/[photoId]`

### 1.2.2 Route Segment の最小構成ファイル

- AppRouter は`app dir`に`page.tsx`という Page ファイルを設置する

  - Page ファイルを設定することで特定の Segment に対応した画面を提供できる
  - 例えば、`./src/app/company-info/page.tsx`は`/company-info`の Segment に対応する
  - `page.tsx`でコンポーネントを`default export`することで画面に UI が表示される

【セルフメモ】

- Page ファイルの他に、ファイルの規則として共通のレイアウトを提供する layout.tsx やエラー UI を提供する error.tsx などがある
  - [File Convention を参照すると良い](https://nextjs.org/docs/app/building-your-application/routing#file-conventions)

## 1.3 SPA ならではのナビゲーション

Next.js は SPA を提供するフレームワーク。SPA とは画面リロードすることがなく、画面遷移できる仕組みを提供するアプリのことを指している。画面遷移はナビゲーションを指している。

### 1.3.1 ナビゲーションの概念と用語

[Soft Navigation](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#5-soft-navigation)

- ハードナビゲーション
  - ブラウザが画面を再読み込みする画面遷移のこと
  - 画面のコンテンツを全て再レンダリングする
- ソフトナビゲーション
  - ブラウザが画面を再読み込みしない画面遷移のこと
  - 画面の必要な箇所だけ再レンダリングする
  - SPA が行うナビゲーション

ソフトナビゲーションのメリット

- 必要箇所のみの再レンダリング
- ブラウザは取得したデータやレンダリングした画面をリロードするまで保持することができる

  - App Router は画面をキャッシュする仕組みが備わっている
  - そうすることで、DB などに再度アクセスする必要がなく、即座に画面を提供できる
  - `Link` コンポーネントおよび `useRouter Hook` は「画面を切り替える」機能だけでなく、パーフォーマンス面にも関わる重要な役割を担う(10 章に続く)

<details>
<summary style="font-size: 20px; font-weight: bold">Link コンポーネントによるナビゲーション </summary>

- dom を見てみると`Link`コンポーネントの部分が a タグに置き換わっている
- 過去には Link コンポーネント内部に a タグを挟まないといけなかったが、今は Link コンポーネントに置き換わるようになった

```javascript
import Link from 'next/link'
import styles from './style.module.css'

export function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href='/'>トップ</Link>
        </li>
        <li>
          <Link href='/categories'>カテゴリー一覧</Link>
        </li>
      </ul>
    </nav>
  )
}
```

</details>
<details>
<summary style="font-size: 20px; font-weight: bold">Dynamic Segment と Link</summary>

- `categories/[categoryName]`の Segment のうち`[categoryName]`が Dynamic Segment

```javascript
// /categories/[categoryName]/page.tsx
type Props = {
  params: { categoryName: string },
  searchParams: { [key: string]: string | string[] | undefined },
}

// ★:props からパスパラメーター、URL 検索パラメーターが参照できる
export default function Page({ params, searchParams }: Props) {
  const page = typeof searchParams.page === 'string' ? searchParams.page : '1'
  return (
    <div>
      <h1>カテゴリー別一覧画面</h1>
      <h2>カテゴリー「{params.categoryName}」</h2>
      <p>ページ番号：「{page}」</p>
    </div>
  )
}
```

</details>
<details>
<summary style="font-size: 20px; font-weight: bold">useRouter を使用したナビゲーション</summary>

```javascript
// /categories/[categoryName]/page.tsx
'use client'

import { useRouter } from 'next/router'

type Props = {
  params: { categoryName: string },
  searchParams: { [key: string]: string | string[] | undefined },
}

// ★:props からパスパラメーター、URL 検索パラメーターが参照できる
export default function Page({ params, searchParams }: Props) {
  const page = typeof searchParams.page === 'string' ? searchParams.page : '1'
  const router = useRouter()
  return (
    <div>
      <h1>カテゴリー別一覧画面</h1>
      <h2>カテゴリー「{params.categoryName}」</h2>
      <p>ページ番号：「{page}」</p>

      {/* routerを用いて、親のセグメントに戻る */}
      <button
        onClick={() => {
          router.push('/categories')
          //backを呼び出すと表示していた前画面に戻れる
          router.back()
        }}
      >
        カテゴリ一覧へ戻る
      </button>
    </div>
  )
}
```

</details>

## 1.4 ネスト可能なレイアウト

- App Router では親 Segment Layout の中に子 Segment がネストされる

  - つまり子 Segment が親 Segment のレイアウトの影響を受ける
  - 特定の Subtree は全て同じ UI を持つ実装が可能になる

- 親 Segment には Page ファイルは存在せず、Layout ファイルのみが存在することができる
  - 逆も然り

【セルフメモ】

- 親 Segment のレイアウトのみに Route Groups を用いて Layout を適用できると思ったらできなかった
  - 今後できるのかな?
