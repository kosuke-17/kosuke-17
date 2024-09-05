# AWS Web サーバーとの初めての疎通

ECS にコンテナを立ち上げて、ALB で向き先を変えるようにしました
ECR の Image を ECS が Pull できるようにする

## 事前準備

- Next.js の web アプリを用意
  - DB アクセスはしない前提
  - 静的なサイト

## 1.VPC の作成

- Subnet の作成
  - Public subnet
    - 外部との通信を行う Subnet
    - Private subnet を作って AWS リソースを割り当てる場合は VPC エンドポイントや Nat gateway などを使用することで S3 や ECR などのリソースにアクセスすることができる
- Route table の作成
  - サブネットの振り分けを行う
- Internet gateway の作成
  - これを Route table と紐づけることでインターネットとの通信を行う
- Security group の作成

  - ALB 用
    - ブラウザから通信をする場合はタイプを HTTP(port:80) にして、ソースを `0.0.0.0/0`とする
      - ブラウザの url はデフォルトで port が 80 となるため
    - 80 以外の port をブラウザから指定したい場合(port:3000 など)、タイプをカスタム TCP として port を 3000 とすることで`http://xxxxxxxx:3000`と指定することができる
    - ソース部分は Security group を指定することができ、その場合は VPC 内部で通信を行う場合に使うことがある(クライアントから api サーバーにリクエストを投げるときなど)
  - ECS 用?
    - ECS はタイプをカスタム TCP の port3000、ソースを`0.0.0.0/0`とすれば許可される
    - ソース部分を特定の IP にすることでより制御できそう(要調査)
  - 任意: RDS 用

    - db によってタイプがことなる
      - posgresql のタイプの場合はポートが指定されて、特定の sg を指定する必要がありそう

  - セキュリティグループを同じ VPC 内の複数のインスタンスに設定すると、インスタンス間の通信がすべて許可されることになる
    - https://ent.iij.ad.jp/articles/1486/
    - https://www.cloudsolution.tokai-com.co.jp/white-paper/2023/0727-405.html
