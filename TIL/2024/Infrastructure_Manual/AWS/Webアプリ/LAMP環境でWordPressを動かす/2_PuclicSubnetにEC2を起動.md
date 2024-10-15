# 2. PuclicSubnet に EC2 を起動

## 2.1 EC2 の作成及び起動

- 名前とタグ
  - wordpress-prod-ec2
- アプリケーションおよび OS イメージ (Amazon マシンイメージ)

  - Amazon Linux 2 AMI(無料枠)
    - Amazon Linux 2023 AMI(無料枠)は選ばない
    - [AL2023 は AL2 のような Amazon-Linux-Extras を搭載していないため](https://aws.amazon.com/jp/linux/amazon-linux-2023/faqs/)
  - アーキテクチャ
    - 64 ビット(x86)
      - 64 ビット(Arm)もあるが何が違う?

- インスタンスタイプ
  - t2.micro(無料枠)
- キーペア (ログイン)

  - キーペアを作成(pem ファイルをダウンロード)
    - wordpress-prod-key

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

## 2.2 初めて接続する

### 2.2.1 読み取り権限を与える

```bash
chmod 400 作成したpemファイル
```

### 2.2.2 ssh 接続

```bash
ssh -i 作成したpemファイル ec2-user@パブリクIP

# 接続が確認できたら、exitする
exit
```

- 接続できない場合
  - 注意 1) ssh を許可しているセキュリティグループがあるか確認する。
  - 注意 2) サブネットがプライベートになっていないか確認。
  - 注意 3) ルートテーブルがインターネットゲートウェイにルートが設定されているか確認

## 2.3 新たなユーザーで ssh する

- [Amazon EC2 Linux インスタンスのシステムユーザーを管理する](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/managing-users.html)

### 2.3.1 ユーザーを作成

```bash
sudo adduser tamura-ko
```

### 2.3.2 パスワード無しで sudo コマンドを実行できるようにする

```bash
# rootに移動
sudo su -
visudo
# 以下の部分をコメントアウトはずす
# ## Same thing without a password
# %wheel	ALL=(ALL)	NOPASSWD: ALL
```

- https://linuc.org/study/column/4047/

### (任意)ユーザーにパスワードをつける

- TODO: ここは必要かを調べる

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

### 2.3.3 ユーザーに sudo 権限を与える

- wheel のグループに入れることで sudo 権限を与えたことになる

```bash
# aオプションを併用しないとそれまで所属していたサブグループから外れてしまう
sudo usermod -aG wheel tamura-ko
# idコマンドでwheelグループへの所属を確認
sudo su - tamura-ko
id
# groups=1001(tamura-ko),10(wheel)と表示されていたら完了
```

- https://linuc.org/study/column/4077/

### 2.3.4 tamurako のユーザーに切り替え

```bash
sudo su - tamura-ko
```

## 2.4 公開鍵を設置

### 2.4.1 .ssh を作成

```bash
mkdir .ssh
chmod 700 .ssh

# authorized_keysの権限を確認
ls -la
# 出力結果: 「 drwx------. 2 ... .ssh 」
# d:ディレクトリ, r:読み取り(4), w:書き込み(2), x:実行(1)
```

### 2.4.2 .ssh/authorized_keys を作成

```bash
touch .ssh/authorized_keys
chmod 600 .ssh/authorized_keys

# authorized_keysの権限を確認
ls -la
# 出力結果: 「 -rw-------. 1 ... authorized_keys 」
# -:ファイル, r:読み取り(4), w:書き込み(2)
```

- [Linux の権限確認と変更(chmod)（超初心者向け）](https://qiita.com/shisama/items/5f4c4fa768642aad9e06)

### 2.4.3 公開鍵をコピー

- ec2-user の authorized_keys の中身を tamura-ko のユーザーの.ssh/authorized_keys の中身に複製
  - ec2-user にユーザーを切り替える

```bash
cat ~/.ssh/authorized_keys
# catした中身をコピー
```

### 2.4.4 authorized_keys にコピーした公開鍵を割り当てる

- tamura-ko にユーザーを切り替える

```bash
# 方法1: リダイレクト記号で値を挿入
# ショートカットキーによるペーストだと改行やインデントが入ってしまうがこの方法ならその心配がない
# このコマンドを実行してもうまくいかなかった
cat > authorized_keys
# こちらのコマンドならうまく行った(コピーする必要ない)
# tamura-koのルートディレクトリ
sudo cat ../ec2-user/.ssh/authorized_keys > ../tamura-ko/.ssh/authorized_keys

#方法2
vim authorized_keys
# ここでauthorized_keysファイルに公開鍵をペースト
```

### 2.4.5 新たなユーザーで ssh してみる

`ssh -i <作成したpemファイル> tamura-ko@<パブリクIP>`

## 2.5 ec2-user は ssh できなくさせる

### 2.5.1 ファイル名を変えて ssh できなくさせる

```bash
mv authorized_keys authorized_keys.unused

# 以下のように出れば完了
# ec2-user@xxx.ap-northeast-1.compute.amazonaws.com: Permission denied (publickey,gssapi-keyex,gssapi-with-mic).
```

別の方法

- sshd_config に DenyUsers を追加 で対応
  - https://www.usupi.org/sysad/102.html
  - https://www.linuxmaster.jp/linux_skill/2021/04/amazon-linux2ec2ec2-user.html
  - 例: ec2-user の接続を拒否する

```bash
# /etc/ssh/sshd_configで最後に以下を記述
DenyUsers ec2-user

# sshを再起動
sudo systemctl restart sshd

# exitする
exit

# ec2-userでログイン
ssh -i "xxx.pem" ec2-user@xxxxxx

# ログインできない確認
# Permission denied (publickey,gssapi-keyex,gssapi-with-mic).

```

- os によってはコマンドが違う

  - https://maku.blog/p/9gs3cmu/

- ユーザーごと削除
  - 必要に応じて r オプションを使用する
  - ユーザーが作成したファイルを残したい場合は、「 -r 」を使用しない
  - https://kazmax.zpp.jp/linux_beginner/userdel.html
  - https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/managing-users.html

```bash
sudo userdel ユーザー名

# 削除されているため、スイッチできないことを確認
sudo su - ec2-user
# su: ユーザ ec2-user が存在していません


# sshもできないことを確認
# ec2-userでログイン
ssh -i "xxx.pem" ec2-user@xxxxxx
# ログインできない確認
# Permission denied (publickey,gssapi-keyex,gssapi-with-mic).
```

- https://graff-it-i.com/2021/11/21/del-ec2-user/

## 2.6 静的ホスト名の割り当て

- - [Ubuntu Linux を実行している Amazon EC2 インスタンスに静的ホスト名を割り当てるにはどうすればよいですか?](https://repost.aws/ja/knowledge-center/linux-static-hostname)

```bash
1  hostnamectl
2  sudo hostnamectl set-hostname wordpress-prod
3  hostnamectl
# 「Static hostname: wordpress-prod」となっていれば完了
# ログアウトして再度ログインするとhost
4  exit
```

- 1 と 2 の間に sudo vim /etc/hosts で Static hostname を記述する必要がありそう?

## 補足: EC2 のパブリック IPv4 DNS を作成

- DNS サーバーの構築

  - VPC の設定画面から、「アクション」>「DNS ホスト名を編集する」を選択
  - 「DNS ホスト名」で有効化にチェック入れて保存すると、VPC 内に起動したインスタンスに DNS 名が名が割り当てられる
  - EC2 インスタンスの詳細画面の「パブリック IPv4 DNS」で DNS 名が確認できる
  - DNS 名で、web ブラウザにアクセルするとパブリック IP アドレスと同様に Apache(及び wordpress)にアクセスできる

  - 参考: https://zenn.dev/oreo2990/articles/5315112aa9d38e

## (任意)Session Manager を使う設定手順

- EC2 インスタンスに SSM エージェントをインストールする
  - AmazonLinux2 には SSM エージェントがプリインストールされている
  - 下記の記事より利用中の OS へインストールの必要があるかを確認、インストール
    - [Session Manager を通して SSH 接続のアクセス許可を有効にして制御する - AWS Systems Manager](https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/session-manager-getting-started-enable-ssh-connections.html)
- EC2 インスタンス用の IAM ロールを作成する
  - 許可するポリシー: `AmazonSSMManagedInstanceCore`
- EC2 インスタンスに作成した IAM ロールをアタッチする
- SSM エンドポイントへのアウトバウンドアクセス経路を用意する

  - インスタンスがパブリックサブネットの場合はインターネットゲートウェイを通じてアクセスできる
  - プライベートサブネットの場合は VPC エンドポイントを作成する必要がある

- https://tracl.cloud/archives/engineerblog/aws-ec2-connect-to-session-manager
- https://dev.classmethod.jp/articles/ec2-access-with-session-manager/#EC2%25E3%2582%25A4%25E3%2583%25B3%25E3%2582%25B9%25E3%2582%25BF%25E3%2583%25B3%25E3%2582%25B9%25E3%2581%25ABSSM%25E3%2582%25A8%25E3%2583%25BC%25E3%2582%25B8%25E3%2582%25A7%25E3%2583%25B3%25E3%2583%2588%25E3%2582%2592%25E3%2582%25A4%25E3%2583%25B3%25E3%2582%25B9%25E3%2583%2588%25E3%2583%25BC%25E3%2583%25AB
