# AWS の構成図を書くときに意識すると良いポイントをまとめておく

## step0.アーキテクチャ図に “正解” はない

- 適切さは必要だが、何を伝えたいかによって図の書き方や表現の粒度を変えて良い
  - 正しく書かないといけないと思い、書くことを躊躇してしまうのは避ける
- アーキテクチャを書く目的は相手にわかりやすく伝えること

## step1.AWS サービスの位置関係を意識する

- 要素とサービスの位置関係を意識することで、ネットワークの議論をしやすい図が描ける

### AWS グローバルインフラストラクチャの中か外か

- AWS 以外にもオンプレミスのデータセンターや AWS Outposts が存在して、AWS グローバルインフラストラクチャの外に配置する

### エッジロケーションで利用するサービスかどうか

- 多くのサービスはリージョンを指定して利用する
  - Amazon Route 53 や Amazon CloudFront 、AWS Global Accelerator などのサービスは AWS グローバルインフラのなかだが、リージョンの外に配置する
  - エッジロケーションとは
    - クラウドサービスやコンテンツ配信サービスなどのネットワーク（CDN）の拠点を分散して配置すること

### リージョンを指定して利用するサービスは VPC の中か外か

- Amazon EC2、Amazon RDS、Amazon S3 などリージョンを指定して利用するサービスはリージョンの中に配置する
  - S3 などは VPC や AZ の外に配置する
  - EC2 や RDS は VPC を指定するのでその中に配置する

### VPC 内のサブネットや AZ はどう表すか

- VPC の中に配置するサービスの位置関係をより詳細に表したい場合
  - インターネットと直接の経路があるパブリックサブネットと、そうではないプライベートサブネットをそれぞれ配置
  - サブネットは AZ を指定するリソースであるため、マルチ AZ の VPC を表す場合は、VPC 中に複数の AZ が含まれるようにしつつ AZ ごとにサブネットを配置することが多い
    - Elastic Load Balancing (ELB) は複数のサブネットを指定して利用するサービスなので、図にすると配置場所を悩みやすいサービス

## Step 2. 「何を伝えたいか」で図の表現は自由に変えて良い

- 例
  - 利用している AWS サービス一覧をできるだけ細かく伝えたい
    - できるだけ細かく利用しているサービスを伝えたい
  - マルチ AZ を利用して可用性が高い構成にしていることを伝えたい
    - 災害や障害に対する可用性の検討や議論をするため
  - 大規模なシステム設計であるということを伝えたい
    - 公開事例などで、マルチアカウントやマルチリージョンを利用した大規模なシステムであることを強調したい

## Step 3. 完成させることを優先し、まずは紙とペンで描く

- 綺麗に体裁を整えることに時間をかけるより、完成させることを優先

## Step 4. 必要に応じてツールも活用

- 一度書いてしまったものを継続的に変更・メンテナンスしたい
- 同じような図やサービスをたくさん描く必要がある
- 社内の設計書であったり、外部に公開するものなのでフォーマルな図が欲しい

## 参考

https://aws.amazon.com/jp/builders-flash/202204/way-to-draw-architecture/
