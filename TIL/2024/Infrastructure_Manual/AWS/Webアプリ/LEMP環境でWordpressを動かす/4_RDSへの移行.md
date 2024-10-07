# 4 RDS への移行

## 4.1 RDS の DB インスタンスを作成

| 項目                         | 設定値                                                    |
| :--------------------------- | :-------------------------------------------------------- |
| データベースエンジン         | MariaDB                                                   |
| インスタンスのクラス         | db.t3.micro(無料枠)                                       |
| マルチ AZ 配置               | しない                                                    |
| ストレージタイプと割り当て   | 汎用(SSD)/ 20GiB                                          |
| DB インスタンスの識別子      | wordpressdb                                               |
| マスターユーザーの名前       | root                                                      |
| マスターユーザーのパスワード | myrdspassword                                             |
| VPC                          | デフォルト VPC                                            |
| サブネットグループ           | デフォルト                                                |
| パブリックアクセシビリティ   | いいえ                                                    |
| AZ                           | EC2 インスタンスと同じ                                    |
| セキュリティグループ         | DB 用の SG を作成して割り当てる(MariaDB の場合は 3306 番) |

- 実際に運用する場合はデフォルト VPC は使用せずにパブリックサブネットを使用する
- EC2 インスタンスが配置されている AZ は事前に確認しておく
- ユーザー名とパスワードは第三者に推測されないものにする

## 4.2 Wordpress のデータベースを DB インスタンスに変更

### 4.2.1 RDS のエンドポイントを確認

- 「xxxx.xxxxx.ap-northest-1.rds...」を控えておく

### 4.2.2 EC2 インスタンスでバックアップを取る

```bash
# バックアップを作成
mysqldump --databases wordpressdb -u root -p > /tmp/wordpressdb.sql

# EC2にインストールしたMariaDBの時に尋ねられるパスワードを入力
```

### 4.2.3 DB インスタンスにリストア

```bash
mysql -h wordpressdb.xxxxxx.ap-northeast-1.rds.amazon.com -u root -p < /tmp/wordpressdb.sql
```

### 4.2.4 Wordpress の設定を変更

- wp-config.php

- 変更前

```bash
# The name of the database for Wordpress
define('DB_NAME', 'wordpressdb')
# MySQL database username
define('DB_USER', 'wordpress')
# MySQL database pawwsord
define('DB_PASSWORD', 'mypassword')
# MySQL database pawwsord
define('DB_HOST', 'localhost')
```

- 変更後

```bash
# The name of the database for Wordpress
define('DB_NAME', 'wordpressdb')
# MySQL database username
define('DB_USER', 'root')
# MySQL database pawwsord
define('DB_PASSWORD', 'myrdspassword')
# MySQL database pawwsord
define('DB_HOST', '確認したRDSのエンドポイント')
```

- nginx を再起動

```bash
systemctl restart nginx
```

### 4.2.5 EC2 インス t ンス上の MariaDB の停止とアンインストール

```bash
system stop mariadb

# アンインストール
dnf remove mariadb105-server
```
