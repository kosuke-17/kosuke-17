# 概要

- WordPress を EC2 で起動させる

1. VPC に PublicSubnet を作成
2. PuclicSubnet に EC2 を起動
3. EC2 に必要なパッケージをインストール

   1. Apache
   2. PHP
   3. WordPress

4. WowdPress を起動

## 取り組むにあたって

- IAM は 2 段階認証を入れる
- VPC の理解をする
  - CIDR
  - セキュリティグループ
  - IGW
  - ルートテーブル
- AWS リソースには適切な名前をつける
- EC2 を起動したら、作業ユーザーを作成し、sudo 権限を付与する
  - ec2-user は ssh できなくする
- 接続先サーバーの host 名は必ず設定する
  - hoge@10.0.1.122みたいな画面で作業しない
  - 間違って prod 環境で作業してしまうなどのミスを起こさないため
- Apache、PHP、WordPress は全て、最新安定バージョンをインストールする

  - 今回はここに縛りを設けない
  - 2024 年 9 月 17 日現在の最新安定バージョン
    - Apache
      - 2.4.62 Released
      - https://httpd.apache.org/download.cgi#apache24
    - PHP
      - 8.3
      - https://www.php.net/downloads.php
      - amazon-linux-extras では 8.2 が最新の stable なのでそれをインストール
        - https://www.konosumi.net/entry/2023/01/22/204340
    - Wordpress
      - 6.6.2
      - https://ja.wordpress.org/download/releases/
    - MySQL
      - https://dev.mysql.com/doc/
        - リリースノートに書かれている最新バージョンが 8.4 だった
      - https://dev.mysql.com/downloads/mysql/

- インストール中に流れてくるログをすべて確認する
- インストール中に「はい」か「いいえ」を聞かれたら、きちんと調べて回答する
- Apache などをインストールしたら、その都度疎通確認を行う
- systemctl コマンドで、再起動しても WordPress や Apache が自動で立ち上がるようにする
