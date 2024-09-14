# 2. PuclicSubnet に EC2 を起動

## EC2 の作成及び起動

- 名前とタグ
  - wordpress-prod-ec2
- アプリケーションおよび OS イメージ (Amazon マシンイメージ)

  - Amazon Linux
  - Amazon Linux 2023 AMI(無料枠)
  - アーキテクチャ
    - 64 ビット(x86)
      - 64 ビット(Arm)もあるが何が違う?

- インスタンスタイプ
  - t2.micro(無料枠)
- キーペア (ログイン)

  - キーペアを作成(pem ファイルをダウンロード)

- ネットワーク設定
  - ネットワークを指定
    - wordpress-prod-vpc
  - サブネットを指定
    - wordpress-prod-public-subnet
  - パブリック IP の自動割り当て
    - 「有効化」する
  - ファイアウォール (セキュリティグループ)
    - wordpress-prod-sg
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

### 補足ユーザーにパスワードをつける

```bash
# rootユーザーに切り替え
sudo su -
# rootユーザーのみ実行可能
passwd tamura-ko
→ パスワードを入力

# シンプルなパスワードだと怒られる
# BAD PASSWORD: The password fails the dictionary check - it does not contain enough DIFFERENT characters

```

- https://atmarkit.itmedia.co.jp/flinux/rensai/linuxtips/033cngpaswd.html

### ユーザーに sudo 権限を与える

- wheel のグループに入れることで sudo 権限を与えたことになる

```bash
# aオプションを併用しないとそれまで所属していたサブグループから外れてしまう
sudo usermod -aG wheel tamura-ko
# idコマンドでwheelグループへの所属を確認
sudo su - tamura-ko
id
```

- https://linuc.org/study/column/4077/

### パスワード無しで sudo コマンドを実行できるようにする

```bash
# rootに移動
sudo su -
visudo
# 以下の部分をコメントアウトはずす
# ## Same thing without a password
# %wheel	ALL=(ALL)	NOPASSWD: ALL
```

- https://linuc.org/study/column/4047/

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

```bash
cat ~/.ssh/authorized_keys
# catした中身をコピー
```

### authorized_keys にコピーした公開鍵を割り当てる

```bash
vim authorized_keys
# ここでauthorized_keysファイルに公開鍵をペースト
```

### 新たなユーザーで ssh してみる

`ssh -i <作成したpemファイル> tamura-ko@<パブリクIP>`

## ec2-user は ssh できなくさせる

ファイル名を変えて ssh できなくさせる

```bash
mv authorized_keys authorized_keys.unused
```

- https://graff-it-i.com/2021/11/21/del-ec2-user/

## 静的ホスト名の割り当て

- - [Ubuntu Linux を実行している Amazon EC2 インスタンスに静的ホスト名を割り当てるにはどうすればよいですか?](https://repost.aws/ja/knowledge-center/linux-static-hostname)

```
1  sudo hostnamectl
2  hostname
3  sudo vim /etc/hosts
4  sudo hostnamectl set-hostname wordpress-prod
5  hostname
6  exit
```
