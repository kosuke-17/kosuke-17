# 1. VPC に Subnet を作成

1. 2 段階認証を用いてログイン
2. VPC を作成

   1. VPC 名: tamu-prod-vpc
   2. IPv4 CIDR: 10.0.0.0/16
   3. IPv6 CIDR ブロック: ブロックなし
   4. テナンシー: デフォルト

3. パブリックサブネットを作成

- ALB を作成する時に複数のパブリックサブネットが存在する必要がある

- サブネット名: tamusite-prod-public1-subnet-1a
- az:アジアパシフィック東京/ap-northeast-1a
- IPv4 VPC CIDR ブロック: 10.0.0.0/16
- IPv4 サブネット CIDR ブロック: 10.0.0.0/20

- サブネット名: tamusite-prod-public2-subnet-1c
- az:アジアパシフィック東京/ap-northeast-1c
- IPv4 VPC CIDR ブロック: 10.0.0.0/16
- IPv4 サブネット CIDR ブロック: 10.0.16.0/20

4. プライベートサブネットを作成

- サブネット名: tamusite-prod-private-subnet-1a
- az:アジアパシフィック東京/ap-northeast-1a
- IPv4 VPC CIDR ブロック: 10.0.0.0/16
- IPv4 サブネット CIDR ブロック: 10.0.128.0/20

5. セキュリティグループ作成

- セキュリティグループ名
  - tamusite-prod-alb-sg
- 説明
  - sg for tamusite-alb-prod
- VPC
  - tamusite-prod-vpc
- インバウンドルール

  - タイプ
    - HTTP
  - プロトコル
    - TCP
  - ポート範囲
    - 80
  - ソース

    - 0.0.0.0/0

  - タイプ
    - HTTPS
  - プロトコル
    - TCP
  - ポート範囲
    - 443
  - ソース

    - 0.0.0.0/0

- アウトバウンドルール

  - タイプ
    - すべてのトラフィック
  - プロトコル
    - すべて
  - ポート範囲
    - すべて
  - ソース

    - 0.0.0.0/0

- セキュリティグループ名
  - tamusite-prod-web-sg
- 説明
  - sg for wordpress-web-prod
- VPC
  - wordpress-prod-vpc
- インバウンドルール

  - タイプ
    - HTTP
  - プロトコル
    - TCP
  - ポート範囲
    - 80
  - ソース
    - sg(tamusite-prod-alb-sg)

- アウトバウンドルール

  - タイプ
    - すべてのトラフィック
  - プロトコル
    - すべて
  - ポート範囲
    - すべて
  - ソース

    - 0.0.0.0/0

- セキュリティグループ名
  - tamusite-prod-vpcendpoint-sg
- 説明
  - sg for tamusite-prod-vpcendpoint
- VPC
  - wordpress-prod-vpc
- インバウンドルール

  - タイプ
    - HTTPS
  - プロトコル
    - TCP
  - ポート範囲
    - 443
  - ソース
    - 0.0.0.0/0

- アウトバウンドルール

  - タイプ
    - すべてのトラフィック
  - プロトコル
    - すべて
  - ポート範囲
    - すべて
  - ソース

    - 0.0.0.0/0

5. インターネットゲートウェイ

- インターネットゲートウェイの作成
  - 名前 : tamusite-prod-igw
- tamusite-prod-vpc にアタッチ

6. ルートテーブル

- 1 つ目のルートテーブル作成
  - tamusite-prod-rtb-public
  - 明示的なサブネットの関連付け
    - tamusite-prod-public1-subnet-1a
    - tamusite-prod-public2-subnet-1c
- ルートを編集から ターゲットに tamusite-prod-igw を設定(ソースは 0.0.0.0/0)

- 2 つ目のルートテーブル作成

  - tamusite-prod-rtb-private
  - 明示的なサブネットの関連付け
    - tamusite-prod-private-subnet-1a

7. VPC のリソースマップでそれぞれがつながっていることを確認
