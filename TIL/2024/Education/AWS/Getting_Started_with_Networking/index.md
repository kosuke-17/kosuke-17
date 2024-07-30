## What is networking?

- デバイス(iphone)などは node と呼ばれる最小単位
- router を経由して switch で切り替えて node と node を接続している
- host node
  - ファイルサーバーやメールサーバーなど
  - サーバーのような中心的な node のこと
  - ネットワーク上で他の node にファイルやアプリケーションなどを共有する
- client node

  - host node とは独立した node
  - computer, printer, mobile device

- Network components

  - server
    - 他のデバイスやソフトウェアがアクセスできるソフトウェアサービスを起動している物理コンピュータ
  - Web server, File server, Database server Mail server...
  - network node or client
    - サーバーなどのハードウェアデバイスの管理下でサービスにアクセスするコンピューターハードウェア
    - 代表例
      - Computers, Printers, Fax machines, Personal devices(cell phone, tablets, ...)
  - hub
    - すべての node をつなげる
    - hub と同様に switch は複数の node をつなげる
      - hub は他の node に 1 つの port で何かしらのシグナルを再送するが、switch はデバイスからの再送信とデバイスへの受信をリンクに直接行わせる
  - router
    - 1 つのネットワークの中にある複数のネットワークセグメントをつなげるネットワークデバイス
    - switch のようにネットワークの間で振る舞ったり、流れてくるデータをフィルタリングしている
  - internet service provider(ISP)
    - 顧客にインターネットアクセスを提供する組織
    - ISP のオファーなしでは、インターネット上の他のネットワークにアクセスすることができない
  - cloud
    - インターネットを超えて IT リソースのオンデマンド配信を行なっている

- Open Systems Interconnection model

  - Physical layer
  - Data link layer
  - Network layer
  - Transport layer
  - Session layer
  - Presentation layer
  - Application layer

- Network models

  - peer-to-peer model
    - サーバーを介さずにデバイス同士で直接データのやり取りをすること
      - pc と printer のような関係
    - ユースケース
      - ユーザー同士がそれぞれの端末(node)でバックアップをとっておきたいとき
      - セキュリティ的な制限がないとき
      - 限りある数の peer が使われているとき
  - Client-server model
    - サーバーでデータ管理やアプリのホスティングを行い、クライアントに配布する
    - ネットワークにおけるすべてのクライアントはファイルやサーバーに保存されている情報にアクセスするための指定を行なっている
    - サーバーがダウンしたら、復元されるまでどのクライアントもネットワークへアクセスすることができない
    - ユースケース
      - ほとんどのビジネスネットワークアーキテクチャが該当する

- Networkd types

  - 2 つの一般的なネットワークタイプ
  - LAN(local area networks)
    - 一定範囲でデバイスをつなげる
    - デバイスをつなげるためにイーサネットを使う
    - ワイヤレス技術は LAN のために使われている
  - WAN(wide area networks)
    - 広い範囲(複数の町や国)

- IP address

  - node がネットワークにいおて、自信を識別をするための値
  - IPv4 addresses
    - 32 bit の長さ
  - IPv6 addresses
    - 128 bit の長さ

- CIDR(Classless Inter-Domain Routing)

  - https://aws.amazon.com/jp/what-is/cidr/
  - IP アドレスの割り当て方法
  - インターネット上のデータルーティングを向上させる目的
  - netrowk identifier と host identifierCIDR block を分けたときに/XX が netmask となる

- Subunet

  - subnetA の CIDR ブロックが 10.0.0.0/26 だったら SubnetB は 10.0.0.64/26 出ないといけない

- CIDR bolock review

  - 最初と最後の IP が供給される。ネットワークプロバイダーが独立していると、他が供給される
  - CIDR は変えることができない
    - CIDR block の範囲は現在や将来必要になる IP のために十分な IP アドレスを収容することができる
  - Subnet CIDR block は他と重なり合うことができない
    - 例えば
      - 10.0.0.0/26 CIDR block(64 IP addresses が含まれている)は同じ VPC 内の次のサブネットには 10.0.0.64/26 CIDR block を指定する必要がある
  - netmask の値が小さいほど保有できる IP アドレスが増える
    - a/24 の netmask は 256 個の IP アドレス、A/16 の netmask は 65536 個の IP アドレス

- Subnet types

  - Public subnets
    - web サイトを表示させる場合など
  - Private subnets
    - public subnets からのルーティング
    - 外部との接続を制限したい場合
    - Nat device を有して private subnet から public subnet にアクセス

- Introduction to Amazon VPC

  - Amazon VPC architecture
    - 複数の AZ にそれぞれ subnet をおく
    - デフォルトで存在する VPC は削除せずに、新たに VPC を作成していくのが推奨

- Amazon VPC quotas(割り当て)

  - 同じリージョンや異なるリージョンに複数の VPC を置くことができる

- VPC usecase

  - 複数層の web app
    - Presentation tier
      - ユーザーが website から web アプリにアクセスする層
    - Logic tier
      - アプリケーションのコードが含まれており、そこで処理が行われて presentation への応答を行う
    - Data tier
      - DB を保存していて、presentation はアクセスができない
      - Logic tire からの通信を受け取る
        - プライベートサブネットの中にあるため、インターネットからのアクセスができない

- Amazon VPC multi-tier application example

  - VPC
    - Public subnet
      - EC2 instance
        - Presentation tier
        - Web server
    - Private subnet
      - EC2 instance
        - Application server
        - Logic tier
    - Pricate subnet
      - RDS instance
        - Database server
        - Data tier

- VPC architectural patterns

  - Single VPC pattern
    - 小さくて 1 つのアプリケーションを自身や小さなチームで管理する場合に使う
    - ハイパフォーマンスなコンピューティングを求められるとき
    - identity マネジメントをするとき
  - Multi-VPC pattern
    - 1 つのチームや 1 組織でサービスを管理するとき
    - 限られたチームが基本的な維持やアクセスマネジメントをするとき
    -
  - Multi-account VPC pattern
    - 大きな組織や複数の IT チームを抱えている組織
    - 急速な成長が予想される中規模の組織

- Amazon VPC components

  - Network gateway
  - Route table
  - Network access control list
  - Security group

- CIDR blocks
  - AWSmaximum block size は最大で/16 netmask(65536 IP addresses)から/28 netmask(16 IP addresses)
