# 4. HTTP/HTTPS の接続

- Route53 で新規でドメインを取得する
- ドメインを既に取得していた場合
  - ホストゾーンを新たに作成する場合はドメインのネームサーバーの値とホストゾーンのネームサーバーの値が同じであることを確認する
    - そうしないと http ができなかったり ACM の検証が保留中のままだったりする

## 4.1 HTTP の接続

- ALB を作成

- 種類
  - ALB
- 基本的な設定
  - ロードバランサー名
    - tamusite-prod-alb
  - スキーム
    - インターネット向け
  - IP アドレスタイプ
    - IPv4
- ネットワークマッピング
  - vpc
    - tamusite-prod-vpc
  - az を 2 つ以上選択
    - ap-northeast-1a (apne1-az4)
      - tamusite-prod-public-subnet
- セキュリティグループ

  - tamusite-prod-alb-sg

- ターゲットグループ
  - tamusite-prod-tg
  - 作成した EC2 をターゲットに設定
- ALB を作成
  - DNS で HTTP 接続できるか確認

# HTTPS を作成

- Certificate Manager で証明書のリクエストを送る

- Route53 のホストゾーンを作成

  - Certificate Manager で CNAME タイプのレコードを作成して紐付け
  - A レコードを作成
    - tamusite-prod-alb を指定

- ALB に HTTPS 用のリスナーを作成する

  - HTTPS の 443 を指定
  - ターゲットグループ
    - tamusite-prod-tg
  - デフォルト SSL/TLS サーバー証明書
    - ACM から
      - 証明書を選択

- 80 ポートのリスナーは https へリダイレクトさせる修正を行うことで誤って http 接続になるのを防ぐ

## そのほか必要なこと

- EC2 の中にファイルを github から持ってきたい

  - https://zenn.dev/oreo2990/articles/d6e7837c64e6fc
  - https://zenn.dev/emily_mz/scraps/c2f0dbd34ea336
  - nat gateway が必要そう
  - github に ec2 で生成した公開鍵を置く
    - https://zenn.dev/torahack/scraps/c2e5a2199af2b3

- npm がまだ入ってなさそう
- elastic ip を削除する

- amazon 2023 に AMI を選択してインスタンスを新たに作成

  - nat gateway も作成
  - 以下のコマンドで node を管理
    ```bash
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
      nvm install 20
    ```
    - https://zenn.dev/yohei_watanabe/articles/dfda076654037f
  - git をインストールして、github からファイルをダウンロード
    - https://zenn.dev/torahack/scraps/c2e5a2199af2b3
    - 不要な階層にファイルをダウンロードしてしまったときのディレクトリごと削除コマンド
      - `rm -rf <ディレクトリ名>`
      - https://uxmilk.jp/8318

- nginx の html にビルドしたファイルを移動させれば、問題なくサイトが表示される
