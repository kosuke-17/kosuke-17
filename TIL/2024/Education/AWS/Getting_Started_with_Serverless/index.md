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
