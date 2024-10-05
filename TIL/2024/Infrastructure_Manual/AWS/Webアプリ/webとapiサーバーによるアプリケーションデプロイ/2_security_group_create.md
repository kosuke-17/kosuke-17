# Security Group の作成

- プライベートサブネットにあるリソースはソースの指定が重要

- セキュリティグループ 1

  - セキュリティグループ名
    - todo-prod-client-ecs-sg
  - 説明
    - security group for prod client ecs
  - VPC
    - 1 で作成した VPC に接続
  - インバウンドルール
    - タイプ
      - カスタム TCP
    - プロトコル
      - TCP
    - ポート範囲
      - 3001
    - ソース
      - todo-prod-client-alb-sg
  - アウトバウンドルール
    - タイプ
      - すべてのトラフィック
    - プロトコル
      - すべて
    - ポート範囲
      - すべて
    - ソース
      - 0.0.0.0/0

- セキュリティグループ 2

  - セキュリティグループ名
    - todo-prod-client-alb-sg
  - 説明
    - security group for prod client alb
  - VPC
    - 1 で作成した VPC に接続
  - インバウンドルール
    - タイプ
      - HTTP
    - プロトコル
      - TCP
    - ポート範囲
      - 80
    - ソース
      - 0.0.0.0/0
  - アウトバウンドルール
    - セキュリティグループ 1 と同様

- セキュリティグループ 3

  - セキュリティグループ名
    - todo-prod-server-alb-sg
  - 説明
    - security group for prod server alb
  - VPC
    - 1 で作成した VPC に接続
  - インバウンドルール
    - タイプ
      - HTTP
    - プロトコル
      - TCP
    - ポート範囲
      - 80
    - ソース
      - todo-prod-client-ecs-sg
  - アウトバウンドルール
    - セキュリティグループ 1 と同様

- セキュリティグループ 4
  - セキュリティグループ名
    - todo-prod-server-ecs-sg
  - 説明
    - security group for prod server ecs
  - VPC
    - 1 で作成した VPC に接続
    - インバウンドルール
    - タイプ
      - カスタム TCP
    - プロトコル
      - TCP
    - ポート範囲
      - 3000
    - ソース
      - todo-prod-server-alb-sg
  - アウトバウンドルール
    - セキュリティグループ 1 と同様
