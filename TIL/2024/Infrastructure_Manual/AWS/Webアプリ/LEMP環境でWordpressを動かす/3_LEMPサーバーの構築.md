# 3 LEMP サーバーの構築

## 3.1 nginx のインストール

### 3.1.1 nginx を EC2 にインストール

- ソフトウェアインストールには dnf コマンドを使用
  - [パッケージ管理ツール(Amazon Linux 2023)](https://docs.aws.amazon.com/ja_jp/linux/al2023/ug/package-management.html)

```bash
# 最新版のnginxをインストール
# yオプションは使わない(自動でインストールされるのを防ぐため)
dnf install nginx

# Is this ok [y/d/N]と聞かれるので、ログから何をインストールするか調べてyを入力
```

### 3.1.2 nginx の起動

```bash
# 起動
systemctl start nginx
# 確認
systemctl status nginx
# 「Active: active(running) since...」と出力されていればok
```

### 3.1.3 ブラウザで確認

- パブリック IP アドレスを入力してアクセスすると表示される
  - プライベートサブネットに EC2 が置かれている場合は ALB や CloudFront が事前にないと接続できない

## 3.2 PHP のインストール

- php 関連のパッケージをインストール

```bash
dnf install php php-mysqli php-mbstring php-gd

# Is this ok [y/d/N]と聞かれるので、ログから何をインストールするか調べてyを入力
```

- nginx の再起動

```bash
systemctl restart nginx
```

## 3.3 MariaDB のインストール

### 3.3.1 インストール

```bash
dnf install mariadb105-server

# Is this ok [y/d/N]と聞かれるので、ログから何をインストールするか調べてyを入力
```

### 3.3.2 mariadb 起動

```bash
systemctl start mariadb
```

### 3.3.3 mariadb 操作

```bash
# 初期状態にはrootユーザーしか存在しない
mysql -u root -p
# 尋ねられるpasswordは設定されていないためenterをクリック

# MariaDB [(none)] >
ALTER USER 'root'@'localhost' IDENTIFIED BY 'mydbpassword';
```

### 3.3.4 ユーザーとデータベースを作成

```bash
# ユーザー作成
create user 'wordpress'@'localhost' IDENTIFIED BY 'mypassword';

# データベース作成
create database wordpressdb;

#権限を設定
grant all privileges on wordpressdb.* to 'wordpress'@'localhost';
FLUSH PRIVILEGES;

show databases;
# wordpressdbがあることを確認
```

## 3.4 Wordpress をダウンロードしてインストール

### 3.4.1 wordpress をダウンロード

```bash
# ダウンロード
mkdir /home/wordpress
cd /home/wordpress
wget https://wordpress.org/latest.tar.gz

# ダウンロードしたファイルを展開
tar xzvf latest.tar.gz

# nginxからみえる場所に移動
mv wordpress/* /usr/share/nginx/html

# apacheユーザーに/usr/share/nginx/htmlディレクトリ書き込み権限を与える
chown apache.apache -R /usr/share/nginx/html
chmod +w -R /usr/share/nginx/html

# ブラウザでhttp://パブリックIP/wp-admin/install.phpを開いてwordpressの設定を行う
```

### 3.4.2 wordpress を設定

- データベース名などを入力
  - データベース名: wordpressdb
  - ユーザー名: wordpress
  - パスワード: mypassword
  - データベースのホスト名: localhost
  - テーブルの接頭辞: wp\_
- wordpress の初期設定

### 3.4.3 オプションの設定

- EC2 インスタンスの再起動時に自動起動する設定を追加

```bash
systemctl enable nginx
systemctl enable mariadb
systemctl enable php-fpm
```
