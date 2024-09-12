# VPC の作成

- VPC の設定

  - 作成するリソース
    - 「VPC など」にチェック
  - 名前タグの自動生成
    - 「todo-prod」を入力
  - IPv4 CIDR ブロック
    - CIDR ブロックを入力
  - IPv6 CIDR ブロック
    - ここは入力しない
  - テナンシー
    - デフォルトを選択
  - アベイラビリティゾーン (AZ) の数
    - 2 つ
  - パブリックサブネットの数

    - 2 つ

      - brain-breeze-prod-subnet-public1-ap-northeast-1a

        - 10.0.0.0/20

      - brain-breeze-prod-subnet-public2-ap-northeast-1c

      - 10.0.16.0/20

    - CIDR ブロックをカスタマイズできる

  - プライベートサブネットの数

    - 2 つ

      - brain-breeze-prod-subnet-private1-ap-northeast-1a
        - 10.0.128.0/20
      - brain-breeze-prod-subnet-private2-ap-northeast-1c
        - 10.0.144.0/20

    - CIDR ブロックをカスタマイズできる

  - NAT ゲートウェイ
    - 今回は選択なし
  - VPC エンドポイント
    - 今回は選択なし
