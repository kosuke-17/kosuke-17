# DBeaver を使って RDS に接続

- DBeaver を使って EC2 経由で RDS に接続
  - EC2 を起動
    - pem キーを作成
    - pem キーでない秘密鍵公開鍵のやり方もありそう
      - ec2 にユーザー作って秘密鍵と公開鍵を設定および PC で保存して接続できそう
  - EC2 で SSH をできるようにする
  - EC2 を RDS のセキュリティグループで許可する
    - ここがきちんと設定されてないと接続できないので注意
  - EC2 で postgres に接続できるようにする
    - postgres をインストール
      ```
      <!-- インストール可能なバージョンを検索 -->
      sudo yum search postgresql
      <!-- インストール -->
      sudo yum install postgresql16.x86_64
      <!-- バージョン確認 -->
      psql -V
      <!-- postgresqlに接続 -->
      psql -h xxx -U xxx -d xxx
      ```
  - DBeaver を PC にインストール
    - DBeaver の RDS の設定値と SSH の設定値を入力する
    - 入力値が正しいことをきちんと確認
    - EC2 の設定値(SSH する値)
      - HOST/IP: EC2 のパブリック IP
      - User name: ec2-user(自身で作成したユーザー)
      - Authentication Method: Publick key
      - Private key:pem キー or 公開鍵
    - RDS の設定値
      - Host(BD_HOST): xxx
      - Database(DB_NAME): xxx
      - ユーザー名(ユーザー名): xxx
      - パスワード: xxx
  - 接続

## 参考

- https://cloud5.jp/con-aurora-postgresql-by-ec2-psql/
- https://scrapbox.io/makibako/EC2%E3%81%8B%E3%82%89RDS%E3%81%AB%E6%8E%A5%E7%B6%9A%EF%BC%88postgresql%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%92%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%EF%BC%89
