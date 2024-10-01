## 運用後の構成

- セキュリティ
  - ALB への SSL の導入
  - WAF の導入
  - wordpress の脆弱性への対応
    - プラグインの脆弱性を調べる
      - wpscan を使用
    - WordPress の認証情報漏洩対策
      - 2 段階認証導入のプラグイン
    - SQL インジェクション対策
      - SQL 命令文で使用される特殊文字へのバリデーション・エスケープ
    - セキュリティ系のプラグインを導入
      - SiteGuard WP Plugin とか？
    - バックアップを定期的に取っておく
- 負荷に対する強度
  - 静的なページは S3 にキャッシュして EC2 への負荷をかけない
    - エッジキャッシュ
  - ALB を用いた負荷分散
  - EC2 の Auto Scaling
- 運用を考慮した構成
  - github actions によるデプロイ
  - レプリカ DB の活用
    - メインの DB の AZ で災害が発生した時に復旧する目的
- 監視
  - CloudWatch
    - EC2 のメトリクスを監視
    - TODO: ある条件の閾値を超えたら通知したりメールを送信して検知する仕組みづくり
- コスト

- 合計のコスト(/月 or GB)

  - USD 409.432/月

  - Route53
    - 0.5
  - CloudFront
    - 0.0120
  - S3
    - 0.025 + 0.0047
  - Natgateway
    - 44.64
  - ALB
    - 17.496
  - WAF
    - 26.00
  - EC2(t4g.micro×2):
    - 15.552
  - RDS(db.t4g.medium×2)
    - 290.88
  - CloudWatch(カスタムメトリクス 7 つ ×EC2 インスタンス)
    - 4.2
  - VPC エンドポイント
    - 10.08

- 詳細

  - Route53
    - 従量課金
    - 1 ホストゾーンにつき、USD 0.50/月
    - クエリ数に応じて増加
  - CloudFront
    - プロトコル: HTTPS
    - 10000 リクエストあたり USD 0.0120/月
  - S3
  - ストレージ料金
    - USD 0.025/GB
  - リクエストとデータ取り出し
    - USD 0.0047/1000 リクエストあたり
      - エッジキャッシュに使う？
  - Natgateway
    - USD 0.062/時
      - １ヶ月とすると USD 44.64(0.062*24*30)/月
  - ALB
    - USD 0.0243/時
    - １ヶ月 稼働とすると USD 17.496(0.0243*24*30)/月
  - WAF

    - マネージドルールグループ
      - 26.00 USD/月
      - AWS WAF 公式のケース C を参考https://aws.amazon.com/jp/waf/pricing/

  - EC2
    - t4g.micro
      - USD 0.0108/時
    - １ヶ月 2 台稼働とすると USD 15.552(0.062*24*30\*2)/月
  - RDS(MySQL)
    - db.t4g.medium
      - USD 0.202/時
    - １ヶ月 2 台稼働とすると USD 290.88(0.202*24*30\*2)/月
  - CloudWatch
    - カスタムメトリクスの場合
      - 7 メトリクス*2 インスタンス * 0.30 USD = USD 4.2/月
    - AWS CloudWatch 公式の例 1 を参考
      https://aws.amazon.com/jp/cloudwatch/pricing/
  - VPC エンドポイント
    - USD 0.014/時
    - １ヶ月 稼働とすると USD 10.08(0.014*24*30)/月

- エッジキャッシュのわかりやすい説明
  https://heartbeats.jp/hbblog/2023/04/cache-with-cloudfront.html
