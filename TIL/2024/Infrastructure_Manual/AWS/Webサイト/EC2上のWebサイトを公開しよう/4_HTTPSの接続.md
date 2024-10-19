# 4. HTTP/HTTPS 接続

## 4.1 Route53 のドメイン設定

- **Route53 で新規ドメインを取得する**
- **既存ドメインを使用する場合**
  - ホストゾーンを新たに作成した場合、ドメインのネームサーバーとホストゾーンのネームサーバーが一致していることを確認する。
    - これを行わないと、HTTP 接続ができなかったり、ACM (AWS Certificate Manager) の検証が保留のままになる。

## 4.2 HTTP 接続の設定

### ALB (Application Load Balancer) の作成

1. **ALB の基本設定**

   - 種類: ALB
   - ロードバランサー名: `tamusite-prod-alb`
   - スキーム: インターネット向け
   - IP アドレスタイプ: IPv4

2. **ネットワークマッピング**

   - VPC: `tamusite-prod-vpc`
   - AZ (アベイラビリティゾーン): 2 つ以上選択
     - ap-northeast-1a (apne1-az4)と ap-northeast-1c
     - サブネット: `tamusite-prod-public-subnet`

3. **セキュリティグループ**

   - 名前: `tamusite-prod-alb-sg`

4. **ターゲットグループ**

   - 名前: `tamusite-prod-tg`
   - 作成した EC2 インスタンスをターゲットとして設定

5. **ALB の作成**
   - 作成後、DNS にて HTTP 接続できることを確認する。

## 4.3 HTTPS 接続の設定

1. **証明書の取得**

   - AWS Certificate Manager で証明書リクエストを送信。

2. **Route53 ホストゾーンの設定**

   - CNAME レコードを Certificate Manager から作成し、ドメインに紐付け。
   - A レコードを作成し、ALB (`tamusite-prod-alb`) を指定。

3. **ALB に HTTPS リスナーを作成**

   - リスナーポート: 443 (HTTPS)
   - ターゲットグループ: `tamusite-prod-tg`
   - SSL/TLS サーバー証明書: ACM から取得した証明書を選択。

4. **HTTP (80 番ポート) から HTTPS へのリダイレクト**
   - 80 番ポートのリスナーに、HTTPS (443 番ポート) へのリダイレクト設定を追加し、誤って HTTP 接続になるのを防ぐ。
