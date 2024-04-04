- React Server Comopnent が何を目指しているのか

- 用語

  - Client
    - ユーザーがサービスを利用する領域
    - ブラウザやスマートフォンなどのデバイス
  - Server
    - プログラムを動かして、サービスを提供している領域
  - MPA
    - Multi Page Application
    - SPA という表現が出たことで、MPA の対比表現が出てきた
  - SPA
    - Single Page Application
  - SSR
    - Server Side Rendering
    - サーバー上でページ全体の HTML を生成する

## 静的なコンテンツ

1. Client がリクエストを送る
2. Server は用意している Web ページ(HTML 等)を含むレスポンスを返す
3. Client でブラウザレンダリングして、Web ページを表示

- JavaScript を用いたインタラクティブな操作は行っていない
  - あくまで、装飾された文章を見ることができるだけの機能
- サービス例:
  - 文章などの値が変化しない会社 HP や 商品ページなど
- 課題
  - 用意している 静的なコンテンツ だけでは物足りない

静的コンテンツ時代から発展して動的コンテンツ時代に移り変わる

## 動的コンテンツ

### MPA

- クラシック SSR

  1. リクエストを送る
  2. 動的な値を活用して 静的な HTML 等を作成
     - MVC フレームワークが使われるようになった
       1. リクエストを C(Controller)で適した M(Model)を呼び出す
       2. Model は DB から値を取得したり、外部と接続してその結果を返す
       3. Model の結果をもとに V(View) の作成を行う
       - HTML に値を埋め込める「テンプレート」を用いてページ全体を静的な HTML にして返す
       - 言語ごとにフレームワークが台頭
         - Ruby on Rails, Spring Framework, Laravel...
  3. それらをレスポンスとして返す
  4. Client でブラウザレンダリングして、Web ページを表示

  - 課題
    - 操作するたびにページをレンダリングが発生する課題
      - 更新したら、新たにページがレンダリングされて「待ち」が発生する
      - 待ちの時間は複雑な機能ほど長く発生する
    - JavaScript を用いたインタラクティブな Web アプリを実現したい
      - よりリッチなアプリへ
      - 2005 年に Ajax 通信（非同期通信）を利用した、Google Map が発表される
        - Ajax によってサーバーなどの外部との通信を可能にした
      - jQuery が 2006 年に発表

- クラシック SSR + jQuery

  - jQuery によるインタラクティブな Web アプリ構築が可能になる
    - 例
      - 外部ファイルの読み込み
        - マウス操作による Google Map での位置情報取得
      - インタラクティブに CSS 操作ができる
        - フェードイン/フェードアウトのアニメーション
        - マウスオーバーによるアニメーション
  - 課題
    - 機能が追加されていく反面、ユーザー体験や開発者体験が損なわれていく
    - jQuery による課題
      - 命令的なイベントハンドラ を読んで理解しなければいけない
        - イベントハンドラの不明瞭な依存関係を調べる

## References

[クライアントサーバーシステム](https://zenn.dev/masahiro_toba/books/aae68b4add20e9/viewer/4da97f)

[Progressive Enhancement (プログレッシブエンハンスメント)](https://developer.mozilla.org/ja/docs/Glossary/Progressive_Enhancement)

[クラッシック SSR](https://speakerdeck.com/recruitengineers/react-2023?slide=7)

[リクルート 2023 研修/React](https://speakerdeck.com/recruitengineers/react-2023?slide=4)

[Rendering on the Web](https://web.dev/articles/rendering-on-the-web)

[[基礎知識] JavaScript の歴史](https://zenn.dev/antez/books/568dd4d86562a1/viewer/bc8ac9)
