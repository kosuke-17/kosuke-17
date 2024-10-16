# 4. HTTP/HTTPS の接続

## 4.1 HTTP の接続

- ALB を作成

- 種類
  - ALB
- 基本的な設定
  - ロードバランサー名
    - tamusite-prod-alb
  - スキーム
    - インターネット向け
  - IP アドレスタイプ
    - IPv4
- ネットワークマッピング
  - vpc
    - tamusite-prod-vpc
  - az を 2 つ以上選択
    - ap-northeast-1a (apne1-az4)
      - tamusite-prod-public-subnet
- セキュリティグループ

  - tamusite-prod-alb-sg

- ターゲットグループ
  - tamusite-prod-tg
  - 作成した EC2 をターゲットに設定
- ALB を作成
  - DNS で HTTP 接続できるか確認

# HTTPS を作成

- Route53 で DNS を登録する
- Certificate Manager で証明書のリクエストを送る

- Route53 のホストゾーンを作成

  - Certificate Manager で CNAME タイプのレコードを作成して紐付け
  - A レコードを作成
    - tamusite-prod-alb を指定

- ALB に HTTPS 用のリスナーを作成する
  - HTTPS の 443 を指定
  - ターゲットグループ
    - tamusite-prod-tg
  - デフォルト SSL/TLS サーバー証明書
    - ACM から
      - 証明書を選択
