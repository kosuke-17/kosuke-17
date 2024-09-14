# 2. PuclicSubnet に EC2 を起動

## EC2 の作成及び起動

- 名前とタグ
  - wordpress-on-ec2-hands-on-ec2
- アプリケーションおよび OS イメージ (Amazon マシンイメージ)

  - Amazon Linux
  - Amazon Linux 2023 AMI(無料枠)
  - アーキテクチャ
    - 64 ビット(x86)
      - 64 ビット(Arm)もあるが何が違う?

- インスタンスタイプ
  - t2.micro(無料枠)
- キーペア (ログイン)

  - キーペアを作成

- ネットワーク設定
  - ネットワークを指定
    - wordpress-on-ec2-hands-on-vpc
  - サブネットを指定
    - wordpress-on-ec2-hands-on-public-subnet
  - パブリック IP の自動割り当て
    - 「有効化」する
  - ファイアウォール (セキュリティグループ)
    - wordpress-on-ec2-hands-on-sg
- ストレージを設定
  - 一旦デフォルトを使用
- EC2 を起動

## 初めて接続する

`ssh -i <作成したpemファイル> ec2-user@<パブリクIP>`

## 新たなユーザーで ssh する

- ユーザー作成/確認

  - [Amazon EC2 Linux インスタンスのシステムユーザーを管理する](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/managing-users.html)
  - ユーザーに権限をきちんと与える

### ユーザーを作成

```bash
sudo adduser tamura-ko
```

### ユーザーに sudo 権限を与える

```bash
sudo usermod -G wheel tamura-ko
```

### ユーザーに切り替え

```bash
sudo su - tamura-ko
```

### 公開鍵を設置

- .ssh を作成

```bash
mkdir .ssh
chmod 700 .ssh

# authorized_keysの権限を確認
ls -la
# 出力結果: 「 drwx------. 2 ... .ssh 」
# d:ディレクトリ, r:読み取り(4), w:書き込み(2), x:実行(1)
```

- .ssh/authorized_keys を作成

```bash
touch .ssh/authorized_keys
chmod 600 .ssh/authorized_keys

# authorized_keysの権限を確認
ls -la
# 出力結果: 「 -rw-------. 1 ... authorized_keys 」
# -:ファイル, r:読み取り(4), w:書き込み(2)
```

- [Linux の権限確認と変更(chmod)（超初心者向け）](https://qiita.com/shisama/items/5f4c4fa768642aad9e06)

### 公開鍵をコピー

- ec2-user の authorized_keys の中身を tamura-ko のユーザーの.ssh/authorized_keys の中身に複製

<!-- ここはメモ程度の記述 -->
<!-- ```zsh
pbcopy < ~/.ssh/id_rsa.pub
# または
cat ~/.ssh/id_rsa.pub | pbcopy
```

```bash
cp コピー元 コピー先のディレクトリ名
``` -->

### authorized_keys にコピーした公開鍵を割り当てる

```bash
vim authorized_keys
<!-- ここでauthorized_keysファイルに公開鍵をペースト -->
source authorized_keys
```

### 新たなユーザーで ssh してみる

<!-- TODO -->

`ssh -i <作成したpemファイル> tamura-ko@<パブリクIP>`

<!-- ここはまだできないので調べる -->

## ec2-user は ssh できなくさせる

<!-- TODO -->

## 静的ホスト名の割り当て

- - [Ubuntu Linux を実行している Amazon EC2 インスタンスに静的ホスト名を割り当てるにはどうすればよいですか?](https://repost.aws/ja/knowledge-center/linux-static-hostname)
  - ユーザーに権限をきちんと与える
  - wordpress-on-ec2-hands-on-ec2-localhost

```
1  sudo hostnamectl
2  hostname
3  sudo vim /etc/hosts
4  sudo hostnamectl set-hostname wordpress-on-ec2-hands-on-ec2-localhost
5  hostname
6  exit
```

参考
root で作業するやり方
https://graff-it-i.com/2021/11/21/del-ec2-user/
