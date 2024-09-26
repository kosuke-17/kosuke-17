# Getting Started with Serverless

- セキュア、信頼性のある、コスト削減につながる

- Microservice

  - サービスを構築する上でのアーキテクチャの話

- 以前は Monolithic アーキテクチャを採用していた

- Monolithic: 密結合
- Microservice: 疎結合

- サービスが疎結合であることが望ましい

  - 耐久性があり、信頼性があり、マネジメントしやすい

- Microservice の利点

  - database とサーバーやフロントエンドとバックエンドが別れていると変更やメンテナンスが蜜結合している時よりも大きくなる
    - もしマイクロサービスを使用している DB に Amazon Aurora や OpenSearch を導入するとしたら、導入がしやすい
  -

- なぜサーバーレスを使うのか

  - ビルドや起動などの server のことを気にしなくていいから
  - サーバーのマネジメントや操作を行う必要がなく、プロダクト開発に集中できる

- Serverless benefits

  - No server management
  - Pay for value service
  - Continuout Scaling
  - High Availability

- Event driven Architecture

  - Event Producer
  - Event Router
  - Event Consumer

- AWS Lambda functions

  - サーバー管理やプロビジョニングが不要でコードを実行させる
    - プロビジョニング: 必要に応じてネットワークやコンピュータの設備などのリソースを提供できるよう予測し、準備しておくこと
  - node.js や python など様々な言語に対応してる
  - イベントソースから Lamda が呼び出される
    - 自身が書いたコードが呼ばれる
  - IAM ロールの割り当てやタイムアウト処理などの考慮が必要
  - Lamda が実行された分だけ課金される
  - 呼び出されるタイプ例
    - synchronous invocation(同期呼び出し)
      - client がイベントを呼び出して、Lamda を実行するなど
      - AWS リソース: API Gateway や Cognito など
    - asynchronous invocation(非同期呼び出し)
      - client がイベントを非同期で呼び出して実行するなど
      - event queue が間に入る
      - AWS リソース: S3 や Event Bridge
    - polling
      - queue をポーリングしてイベントと共に関数を同期呼び出しする
      - AWS リソース: SQS や Kinesis など
  - 実行環境のライフサイクル
    - INIT phase、INVOKE phase、SHATDOWN phase がある
    - 情報の設定(メモリ使用量、最大呼び出し時間など) → 情報をもとに実行環境のセットアップを行う
  - IAM Resource Policy と IAM Execution Role がそれぞれ必要

- Lambda を使う前に知っておくこと

  - Linux OS とコマンドについて
  - セキュリティサービスとコンセプト
  - クラウドコンセプトと IP ネットワーキング
  - 分散コンピューティングコンセプト

- Lambda function を構築する方法

  - another from scratch
    - hello world 出力するように関数を実際に書いてトリガーと設定をする
  - use a blueprint
  - contianer image
    - 関数をデプロイしたコンテナイメージを選択して実行する

- Lambda function を実行するには実行権限が必要なため、そのためのロールを作るか既存のロールを選択する

- Design best practices

  - Separate business logic
  - Moduler functions
  - Treat functions as stateless
  - Only include what you need

- AWS serverless services
  - SQS
    - フルマネージドなメッセージを保存するメッセージキューイングサービス
    - メッセージは保存された後に期限切れになるまで保管されている
    - sender と receiver の間のバッファーとして振る舞う
    - 2 つのタイプがある
      - Standard
      - FIFO
  - SNS
    - 特徴
      - 公開されたメッセージ
      - メッセージが配信されたかどうかを気にする必要がない
      - HTTP or HTTPS retry
      - Order and delivery not guaranteed
    - ユースケース
      - CloudWatch アラーム通知
      - メールリストを通知
      - app の更新を通知
  - S3
    - オブジェクトを保存するサービス
    - 従量課金製
    - elastic なストレージ
      - ストレージの容量は追加したり削除したりすることで大きくなったり小さくなったりする
    - a
  - API Gateway
    - Lambda function を外に接続できるようにするサービス
    - 誰が api にアクセスしてきたのかわかる
  - Fargate
    - ECS のための技術
    - サーバーやクラスターを管理する必要がなくコンテナを起動することができる
    - インフラの管理ではなく、アプリの開発に集中ができる
    - OS や Config, Deps をスナップショット(コンテナイメージ)のようにとっておく
    - ユースケース
      - コンテナワークロードを実行してスケールさせる
      - web app や api などのマイクロサービス
      - AI や ML トレーニングアプリのサポート
      - コスト最適化
