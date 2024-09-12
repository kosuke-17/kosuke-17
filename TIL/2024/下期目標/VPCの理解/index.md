# VPC の理解のために作成した静的サイトを閲覧できるようにする

1. プロダクション用のネットワーク構築の調査

- VPC の IP アドレス範囲を指定
  - IP アドレスの範囲に注意
    - VPC ピアリングなど別の VPC と繋ぐ場合に IP アドレスの範囲が重複していると対応できない
- サブネットを追加
- (インターネット)ゲートウェイを追加
- セキュリティグループを関連付け
- ルートテーブルを追加

  - トラフィックを移動させる IP アドレスの範囲 (宛先) と、トラフィックを送信するゲートウェイ、ネットワークインターフェイス、または接続 (ターゲット) を指定

- production と staging の vpc を別々にしておく
  - なぜ？
    - 誤操作のリスクを回避
- サブネットは複数の AZ に作成する
- トラフィックの制御を行う

  - SG: インスタンスレベル
  - ネットワーク ACL: Subnet レベル

- 監視を行う

  - 意図しないアクセスを検知: Network Access Analyzer

- 余談

  - 単一の AWS アカウント、単一の VPC の構成をすることもある
  - システムの種類と環境の用途で AWS アカウントを分けるパターンがある
  - VPC の設計はアカウント設計に関連する(大事)

- 参考
  - [VPC のセキュリティのベストプラクティス](https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/vpc-security-best-practices.html)
  - [\[AWS\]VPC の設計の考え方](https://qiita.com/morih90/items/d21d72364fd01e0d0169)
  - [AWS アカウントと VPC、分ける？ 分けない？: 分割パターンのメリット・デメリット](https://dev.classmethod.jp/articles/account-and-vpc-dividing-pattern/)

2. VPC、サブネット、ルートテーブルの設定
3. 静的サイトを構築
4. Github actions の継続的なデプロイ
5. ALB を用いたトラフィックの分散
