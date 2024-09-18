# 1. VPC に PublicSubnet を作成

1. 2 段階認証を用いてログイン
2. VPC を作成

   1. VPC 名: wordpress-prod-vpc
      - 「サービス名-vpc」で命名
      - prod や stg などの環境ごとの単語も必要があればつける
   2. IPv4 CIDR: 10.0.0.0/16
      - 利用可能な IP 数 : 65,536
      - なぜ`/16`にした？
        - TODO
   3. IPv6 CIDR ブロック: ブロックなし
      - なぜ`ブロックなし`にした？
        - TODO
   4. テナンシー: デフォルト
      - なぜ`デフォルト`にした？
        - TODO

3. パブリックサブネットを作成

- サブネット名: wordpress-prod-public-subnet
- az:アジアパシフィック東京/ap-northeast-1a
- IPv4 VPC CIDR ブロック: 10.0.1.0/24

4. セキュリティグループ作成

- セキュリティグループ名
  - wordpress-prod-ec2-sg
- 説明
  - sg for wordpress-ec2-prod
- VPC
  - wordpress-prod-vpc
- インバウンドルール
  - タイプ
    - SSH
  - プロトコル
    - TCP
  - ポート範囲
    - 22
  - ソース
    - 0.0.0.0/0
    - 「0.0.0.0/0」で公開しない方が良い為、IP 制限をかける
    - TODO:後で調べる
- アウトバウンドルール

  - タイプ
    - すべてのトラフィック
  - プロトコル
    - すべて
  - ポート範囲
    - すべて
  - ソース

    - 0.0.0.0/0

  - セキュリティグループのリソース名について
    - 「{product}-{env}-{aws_service}-sg」のように aws のサービスも命名規則に含まれているのが好ましい
    - aws のサービスによって命名を変えていくのが良い
    - リソース名から何を知りたいのかを考えて命名する
    - https://future-architect.github.io/coding-standards/documents/forAWSResource/AWS%E3%82%A4%E3%83%B3%E3%83%95%E3%83%A9%E3%83%AA%E3%82%BD%E3%83%BC%E3%82%B9%E5%91%BD%E5%90%8D%E8%A6%8F%E7%B4%84.html
    - https://dev.classmethod.jp/articles/aws-name-rule/

5. インターネットゲートウェイ

- 名前タグ : wordpress-prod-igw
  - 作成した VPC にアタッチ

6. ルートテーブル

- サブネットの関連付け
  - wordpress-prod-public-subnet
- ルートに igw を設定

参考

- [「VPC のみを作成する」](https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/create-vpc.html)
