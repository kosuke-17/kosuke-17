# 架空の CP サイトを運用するための設計を行う

以下の観点で運用前の構成の改修を行う

- セキュリティ
- 負荷に対する強度
- 運用を考慮した構成
- 監視
- 設計するコスト

  - WordPress、AWS、CP サイトの特性を良く理解した上で、 「最低限コストはこのくらい、これとこれをオプションで付けると、 こう言った物まで出来るが、そのメリットはこれくらい。」 と提案できる

- 宿題のヒント
  - ALB ＋ SSL くらいは必ず導入
  - CI/CD は GithubActions
  - 「WordPress セキュリティ」とかでググって、どんな対応をすべきか調べる
    - インフラエンジニアには「サービス・Web アプリ・クラウドインフラ」を幅広く知識として無きゃ行けない事を理解して、解らない事は良く調べる

## 運用前の構成

<img src="運用前.png"  />

#### セキュリティ面の課題

- AWS サービス
  - パブリックサブネットにある
  - WAF が導入されていない
- Wordpress
  - TODO: セキュリティ診断ツール WPScan を使って調べる
  - ブルートフォースアタック（総当たり攻撃）などの不正ログイン対策について
    - SiteGuard WP Plugin の保護プラグインの導入
      - https://academy.gmocloud.com/wp/wordpress/20210126/10935

#### 負荷に対する強度面の課題

- AWS サービス
  - 単一障害点
  - ALB による負荷分散ができていない
  - 冗長化(Auto Scaling による増加したアクセスの分散)ができていない
    - ec2 の場合ファイル同期処理が必要
    - lsyncd と rsync の組み合わせでリアルタイムに WordPress のデータの同期
    - ecs ならタスクを再度作れば良い？
- Wordpress
  - CPU 負荷の増加
  - アクセス集中した際の対策ができていない
    - キャッシュプラグイン（ページキャッシュ）の導入
    - CDN サービスなどを利用し、外部サーバーからデータ(記事内の画像など)を配信

> WordPress で運用中のウェブサイトの場合、アクセスが増えるとともに下記のような状況が発生する。CPU 負荷が増加する。転送量が増加する。突発的なアクセス集中が発生し、HTTP リクエストが多く発生する。
> https://www.shin-server.jp/support/faq/service_hp_wp_measures_againstload.php

#### 運用を考慮した構成面の課題

- ALB によるターゲットの切り替え
- RDS のバックアップ
- SSL 化を行う
- WAF の導入

#### 監視面の課題

- Cloud watch で EC2 の監視をしてリソース状況に異常が起こらないかをモニタリング

  - 死活監視
    - EC2 インスタンスの状態（「起動中（running）」や「停止中（stopped）」など稼働状態）やステータス（EC2 ホストやネットワークなどサービスの異常）を検知できる
    - CloudWatch Events で検知し、CloudWatch Alarm で通知する
  - リソース監視
    - CPU、メモリー、ディスクの使用量や使用率など、OS のパフォーマンスモニターと同等の情報をメトリクスとして収集できる
    - CloudWatch Alarm で閾値を設定し、閾値を違反した場合に通知する
  - ログ監視

    - OS のシステムログやアプリケーションが出力するログファイルのテキストデータを収集できる
    - CloudWatch Logs で収集し、フィルター条件に一致したログテキストを検出時に CloudWatch Alarm で通知する

  - https://www.fujitsu.com/jp/products/software/resources/feature-stories/cloud-operation/aws-monitoring/

#### コスト面の課題

- Cloudwatch

  - 監視の項目やルールによっては CloudWatch の無料利用枠に収まらない

    - 監視の間隔は標準で 5 分だがそれ以上短くしたい場合は料金が発生
    - EC2 インスタンスによって異なるメトリクスの数、ログデータの量(1GB)によって料金が決まる
    - 例

      ```
      アプリケーションが、5 つの Amazon EC2 インスタンスで、24 時間 365 日、1 か月で 30 日間アプリケーションを実行し、すべてのインスタンスで EC2 の詳細モニタリングを有効にした場合、料金は以下のようになります。

      メトリクスの合計数 = インスタンスあたり 7 メトリクス x 5 インスタンス = 35 メトリクス

      CloudWatch メトリクスの月額料金 (カスタムメトリクスあたり0.30 USD) = 35 x 0.30 USD = 10.50 USD

      CloudWatch の月額料金 = 1 か月あたり 10.5 USD
      ```

  - https://aws.amazon.com/jp/cloudwatch/pricing/

## 参考

https://pages.awscloud.com/JAPAN-event-OE-Hands-on-for-Beginners-Scalable-2022-confirmation_386.html
https://kurojica.com/cloud/blog/redundancy_wordpress/

後でみる

- https://murablog.net/2023/10/15/ec2%E3%81%A8rdsmysql%E3%81%AE%E7%B5%84%E3%81%BF%E5%90%88%E3%82%8F%E3%81%9B%E3%81%A7wordpress%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89/

aws 公式: AWS での WordPress に関するベストプラクティス
https://docs.aws.amazon.com/ja_jp/whitepapers/latest/best-practices-wordpress/welcome.html
