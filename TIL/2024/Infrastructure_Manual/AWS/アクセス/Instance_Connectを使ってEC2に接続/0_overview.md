# Instance Connect で EC2 に接続

- AWS コンソール上から、EC2 に接続する方法
- SSH クライアントと同様の操作をブラウザで行うためのもの

- 条件
  - SSH で接続できるようになっていなければいけない
    - セキュリティグループで 22 番を開ける必要がある
  - 通常、パブリック IP が割り当てられているインスタンスにしか接続できないが Instance Connect を使うとプライベート IP の環境でも接続できる
