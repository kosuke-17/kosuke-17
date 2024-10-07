# 5 ElasticIP とドメインの利用

## 5.1 固定 IP アドレスを割り当てる

### 5.1.1 IP アドレス確保

- EC2 ダッシュボード > Elastic IP > Elastic IP を割り当てる
  - `ap-northeast-1をチェック`

### 5.1.2 確保した IP アドレスと EC2 インスタンスに割り当てる

- Elastic IP > Elastic IP アドレスの関連付け
  - EC2 インスタンスを選択し、「関連付ける」をクリック

### 5.1.3 レイアウト崩れなどに対応

- ブラウザから「http://ElasticIP アドレス/」にアクセスすると Wordpress の画面が表示される

  - しかし、レイアウト崩れが起きたり、画像が表示されなくなる
  - これは、Wordpress はインストール時の IP アドレスやドメイン名での自動設定をするから

- wp-config.php を開いて、url の設定を記述

  - `vi /usr/share/nginx/html/wp-config.php`

```php
<?php
define('WP_HOME', 'http://57.180.232.69');
define('WP_SITEURL', 'http://57.180.232.69');

```

- 保存して、ブラウザのリロードを行い画像が表示されていることを確認

## 5.2 ドメインの利用

### 5.2.1 ドメインの取得

- `/Infrastructure_Manual/AWS/Web サイト/Web サイトを公開しよう/3_HTTP で Web サイトに接続.md` の 3.1Route53 で ドメインを申請するを行う

### 5.2.2 EC2 にドメイン名でアクセスできるようにする

- A レコードを登録
  - レコード名
    - `blogs と入力`
  - レコードタイプ
    - `A`
  - エイリアス
    - `ON`
  - 値
    - `IPアドレスの値`
