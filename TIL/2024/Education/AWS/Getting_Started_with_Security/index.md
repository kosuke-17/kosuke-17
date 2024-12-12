# Getting Started with Security

## セキュリティについて(Introduction to Security)

- クラウドには様々なデータがある

  - メディカルデータ
  - 会社情報
  - パーソナル認識情報

- それらのデータを PC から誰でも見えてしまう状態は好ましくない

- 閲覧しているユーザーの権限を適切に振り分ける必要がある
  - QC エンジニアの場合は読み取り権限のみ
  - 開発エンジニアの場合は読み取り権限と書き込み権限のみ
  - リーダー(マネージャー)は読み取り、書き込み、削除権限など
- 利用者が作業に必要な権限のみを付与することが大切

- 組織では多くのユーザーがデータへのアクセスを行う機会がある

  - その場合に、IAM を利用することで権限のマネジメントを行なっていくことができる

- 認証
  - ベーシックなコンピュータセキュリティのコンセプト。
  - 自身の身元を証明する工程
- 認可

  - ユーザーに権限が付与されているかを確認する工程
  - もし認証されたユーザーであることが確認できれば、特定の IT リソースにやリクエストしているデータへのアクセス権限を認める

- セキュリティのレイヤー

  - AWS のデータセンター
    - perimeter(周囲) layer
    - infrastructure layer
    - enviroment layer
      - AWS のデータセンターは地震や災害などによる影響を軽減するような立地に配置されている
    - data layer

- AWS は AWS Shared Responsibility model があり、AWS 側でのセキュリティの責任と顧客の AWS を使う上での責任が分かれている。
  - 顧客がやるとこ
    - サービスへのアクセス制限は顧客が管理する
    - 暗号化
    - ネットワークトラフィックの保護
  - S3
    - 暗号化
    - アクセスポリシー
    - ファイル削除保護
    - ユーザーアクセスなど
  - EC2
    - OS ゲストのパッチ
    - セキュリティグループの設定
    - volumes の暗号化
    - ユーザーアクセスなど
  - VPC
    - セキュリティグループ設定
    - Network ACL の設定
    - パブリック、プライベートアクセスの設定
    - ユーザーアクセスなど
  - AWS がやること
    - AWS の基盤のサービス
    - グローバルのインフラ
      - AZ, Regions, Edge locations
    - 稼働してるサービスのインフラを保護

## Introduction to AWS Identify and Access Management(IAM について)

- IAM はデフォルトでは権限を持たない
  - ポリシーを作成して、権限を付与する
- ユーザーグループ
- ロール
- IAM user は人やアプリケーションに該当する
  - AWS マネジメントコンソールにはパスワードが必要
  - プログラムによるアクセスにはアクセスキーが必要
    - AWS CLI や AWS SDK を利用したアクセス
    - アクセスキーはローテションするとセキュリティによるリスクが減らせる
- IAM は追加料金はない

- MFA(Multi factor authentication)

  - AWS のログインページと MFA のデバイス(APP)
  - AWS CLI と MFA のデバイス(APP)

- IAM Identity Center

## Using IAM(IAM を使う)

- 作成する対象

  - IAM ユーザー
    - 暗黙的な拒否がデフォルトなので、明示的に AWS リソースにアクセスするように権限のアタッチが必要
  - IAM グループ
    - Admin のグループ、開発者グループ、テスターグループのように分けていくのが良さそう
  - IAM ロール
    - ヘルメットと一緒で作業するユーザーに付与したり、外したりする権限のまとまりのこと
  - IAM ポリシー
    - Effect, Action, Resource の 3 つがある
      - Effect は Allow と Deny が入れられる
    - AWS で用意されているマネージドポリシーがある
    - ユーザーが自身で作成できるカスタマーマネージドポリシーもある
    - ユーザー、グループ、ロールの中だけに作成できるインラインポリシーもある

- 作成する方法

  - AWS Management Console
  - AWS CLI
  - AWS SDK

- Root user
  - 最初に作成するユーザー
  - 全ての権限がある
  - MFA を有効化する
  - 強力なパスワードにする
  - 誰にもアクセスキーを共有しない
  - ルートユーザーのアクセスキーは disabled にするか削除する
  - IAM user を作成して、そっちで作業する

## Additional AWS Security Services(AWS のセキュリティサービスについて)

- AWS Cognito
  - 認証認可を Web や mobile app で行う時に使う
- AWS Key Management Service(KMS)
  - 暗号化したキーを作成したり管理する
  - キーのタイプ: AWS-owned keys, AWS-managed keys, Customer-managed keys
- AWS Secrets Manager
  - シークレットな情報を管理する
    - DB のクレデンシャルやパスワード、API キーなど
- AWS Shield
  - ネットワークの保護
  - 有料版を使うといろんな保護や監視が可能になる
- Amazon GuardDuty
  - 悪意のあるアクティビティや異常な動作をモニタリングし、AWS のアカウント、ワークロード、データを保護する脅威検出サービス
