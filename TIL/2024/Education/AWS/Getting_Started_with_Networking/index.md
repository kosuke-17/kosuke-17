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
