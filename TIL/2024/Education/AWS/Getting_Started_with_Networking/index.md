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

- Amazon VPC default components

  - Main route table
  - Network access control list
  - Security group

- VPC ID and tags
  - VPC ID
    - VPC を作成したときに自動で付与される ID
    - ランダムな数字の文字列で VPC を識別する
    - 追加したコンポーネントと関連づけるときに必要となる
      - subnets, route table など
    - VPC ID は編集できない
- VPC tags

  - VPC ID はコンポーネントと関連付けるときに覚えておくのが難しいので、固有の名前(tag)を付与することで、容易に紐付けできるようにする
  - 例
    - vpc-xxxxxx(Devlop VPC)
    - vpc-yyyyyy(Production VPC)
    - vpc-zzzzzz(Testing VPC)

- Subnets in AWS

  - Internet から Public な subnet は接続できて、private な subnet は接続できない
  - このようにしてセキュリティーコントロールを行う
  - 上記の subnets を持つ構成を複数の AZ で構築しておくことで、特定の AZ 内の subnet に接続できなくなっても、他の AZ に接続しにいくことでユーザーが接続できないような事態を一時的に防げる
  - 5 つの IP アドレスの区分けをおこなっている
    - First IP
      - Network address
    - Second IP
      - VPC local router(internal communication)
    - Third IP
      - Domain Name System(DNS) resolution
    - Fourth IP
      - Future use
    - Last IP
      - Network broadcast address

- Subnet size

  - ベストプラクティス
    - 大きなサブネットを作る
    - 小さなサブネットを作ることはおすすめしない
    - ネットワーク上ですべての node が IP アドレスを必要とするため
    - 64 IP addresses をそれぞれ 6 つの subnet で利用可能にするよりも 256 IP addresses を 2 つの subnet で利用可能にする方が良い

- Subnet and VPC assosiations
  - subnet を作るときには VPC と関連付けることが必須
  - VPC の中にある Subnet はデタッチができない
- Network gateway

  - Internet gateway

    - VPC とインターネットが接続可能な状態にする
    - name と tag の指定が必要
    - VPC ID に internet gateway を付与して使う
    - one to one の関係性を持つ
    - そのため、複数の VPC やそれぞれの VPC が特定の internet gateway を持つことはできない
    - 特定の VPC に internet gateway を付与している場合は、一度デタッチしてから他の VPC にリタッチする必要がある
    - memo(別の環境を作って最後にこの gateway を変えることで別のリソースに移行することができるということ？)

  - Virtual private gateway
    - On-premises のサイトを VPC に接続をする場合に使用する
    - この接続方法を site to site VPN Connection をいう

- Route tables

  - Destination
    - トラフィックを送信する IP addresses の範囲
  - Target - 宛先トラフィックの送信に使用する
    gateway, network interface, connection

- Route table associations
  - main の route table を使ったり、カスタマイズした route table を使う
  - 1 つの subnet に対してそれぞれの route table を指定することもできるし、2 つ以上の subnet に対して 1 つの route table を使用することができる
- Security groups
  - vpc 内では 2 つの security group が存在する
    - Instance level
    - Subnet level
  - インバウンドルールとアウトバウンドルールを用いてトラフィックをフィルタする方法を提供する
- Security group rules

  - inbound rules
    - デフォルトで security group はインバウンドルールを持たない
    - そのため、inbound rules を追加するまでインスタンスに他のホストからの接続を受け付けない
  - outbound rules

    - security group は全ての outbund traffic を許可する outbound rules を持つ
    - そのため、必要な outbound traffic のみを許可する outbound rule を追加する必要がある
    - もし、outbound rule が 1 つも存在しなければ、許可されたインスタンスから発生する outbound traffic は存在しない
    - アウトバウンド ルールの destination によって、インスタンスから送信できるトラフィックとそのトラフィックの送信先が決まる

  - ポイントはどの状態のルールが働いていることで outbound や inbound のリクエストを発せさせることができるかを
    リクエストを発せさせることができるかを決定する

- Choosing security groups

  - Public Subnet にある EC2(Web server)や Private Subnet にある EC2(Application server)、Database server など、目的に応じた security group を設定する必要がある

- Network ACLs

  - 他の fire wall で VPC を守るために利用する
  - Subnet level で動く
  - 1 つの Network ACL は 1 つの Subnet に紐づけることができる
  - 特定の IP アドレスを deny できる
  - Rule の順番と deny のルールによっては全て deny してしまう可能性がある

- Elastic IP

  - 固定の IP
  - インスタンスは停止して再起動すると public IP は再設定されてしまうが、Elastic IP を付与しておくことで再設定されることがなくなる
  - VPC を跨いだ Elastic IP の利用を行うことができる
    - リージョンレベルで可能

- NAT gateway

  - Private Subnet とインターネットを繋ぐ役割を持つ
  - Private Route Table に NAT gateway と Public Subnet をつなげる

- VPN

  - VPN を繋げないと VPC とリモートのネットワークと通信が取れない
  - Customer gateway を設置
  - Virtual Private gateway を設置
  - Private Route Table を設置
  - destination に特定の IP(リモートのネットワーク)を指定
  - site to stie VPN connection を用いて、Customer gateway と Virtual Private gateway を繋げる
  - AWS Direct Connect が VPN の代わりになりそう

- VPC Endpoint

  - Interface VPC Endpoint
    - VPC 間や AWS サービス、private な空間のネットワークを内部で接続する
  - Gateway Endpoint
    - VPC で Internet gateway や Nat device が要求されない DynamoDB や S3 と信頼性の高い接続を行うときに使用する

- VPC peering

  - 自身の VPC 間、他のアカウントの VPC、異なる region の VPC への接続
    - Route table でそれぞれ target と destination を設定しておく

- そのほかの AWS Networking service
  - Amazon Route 53
    - DNS のサービス
  - Cloud Front
    - エッジロケーションと呼ばれるデータセンターのネットワークを通して、コンテンツの配信を行なっている
    - 低レイテンシーなユーザーにも高速でコンテンツを届けられるようになっている
