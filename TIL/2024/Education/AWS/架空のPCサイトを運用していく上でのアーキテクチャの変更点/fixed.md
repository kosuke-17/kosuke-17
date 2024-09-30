## 運用後の構成

- セキュリティ
  - ALB への SSL の導入
  - WAF の導入
  - TODO: wordpress の脆弱性への対応
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
- 設計するコスト

- エッジキャッシュのわかりやすい説明
  https://heartbeats.jp/hbblog/2023/04/cache-with-cloudfront.html
