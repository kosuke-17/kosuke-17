# VPC のセキュリティのベストプラクティス

### 複数の AZ にサブネットを配置する

- VPC にサブネットを追加してアプリケーションをホストすることで、本番アプリケーションの可用性、耐障害性、及びスケーラビリティが向上する

### サブネット内の EC2 インスタンスへのトラフィックを制御

- セキュリティグループを使用
- インスタンス単位でトラフィックを制御
- [詳細](https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/vpc-security-groups.html)

### サブネットレベルでインバウンドトラフィックとアウトバウンドトラフィックを制御

- ネットワーク ACL を使用
- サブネット単位でトラフィックを制御
- [詳細](https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/vpc-network-acls.html)

### VPC 内の AWS リソースへのアクセスを管理

- AWS Identity and Access Management (IAM) ID フェデレーション、ユーザー、およびロールを使用
- [詳細](https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/security-iam.html)

### IP トラフィックを監視

- VPC、サブネット、またはネットワークインターフェイス間で送受信される IP トラフィック
- VPC フローログを使用
- [詳細](https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/flow-logs.html)

### VPC 内のリソースへの意図しないネットワークアクセスを特定

- Network Access Analyzer を使用
- [詳細](https://docs.aws.amazon.com/vpc/latest/network-access-analyzer/what-is-network-access-analyzer.html)

### VPC を監視および保護

- インバウンドトラフィックとアウトバウンドトラフィックをフィルタリングする
- AWS Network Firewall を使用
- [詳細](https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/vpc-security-best-practices.html)

### AWS 環境内のアカウント、コンテナ、ワークロード、データに対する潜在的な脅威を特定する

- 脅威検出には、Amazon EC2 インスタンスに関連付けられた VPC フローログのモニタリングが含まれる
- Amazon GuardDuty を使用する
- [詳細](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_vpc)

## 参考

- [VPC のセキュリティのベストプラクティス](https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/vpc-security-best-practices.html)
