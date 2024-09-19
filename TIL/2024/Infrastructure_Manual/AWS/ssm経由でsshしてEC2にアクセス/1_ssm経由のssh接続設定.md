## EC2 インスタンス用の IAM ロールを作成

- EC2 インスタンス用の IAM ロールを作成する
  - 許可するポリシー: `AmazonSSMManagedInstanceCore`
  - ロール名: ssm-role

## EC2 を作成

- EC2 を作成して ssm-role を割り当てる

  - すでに作成している EC2 の場合は ssm-role を割り当てて、再起動する

- TODO: EC2 をパブリックサブネットにおいて ssm を行えるようにする

## AWS CLI 実行 IAM ユーザーを作成

- ユーザー名:tamura-ko

  - アクセスキーを作成して aws configure に設定
    - profile の設定でも良い

```bash
aws configure

# Access key IDの入力を求められる: XXXXXXXXXX
# Secret access keyの入力を求められる: XXXXXXXXXX
# Regionの入力を求められる:ap-northeast-1
```

## AWS CLI 用 IAM ポリシー作成

- Resource に関しては特定の EC2 インスタンスを指定するのが良い

  - TODO: ここがまだ適切に指定できなかったので調べて修正

- AWS CLI 実行 IAM ユーザーに付与する

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "StartSession",
      "Effect": "Allow",
      "Action": ["ssm:StartSession"],
      "Resource": ["*"]
    },
    {
      "Sid": "TerminateSession",
      "Effect": "Allow",
      "Action": ["ssm:TerminateSession", "ssm:ResumeSession"],
      "Resource": ["arn:aws:ssm:*:*:session/${aws:userid}-*"]
    }
  ]
}
```

## ~/.ssh/config に ssh 時に必要な情報を記述

```bash
vim ~/.ssh/config

# Host ssm
#         HostName i-[インスタンスID]
#         User tamura-ko
#         ProxyCommand sh -c "aws ssm start-session --target %h --document-name AWS-StartSSHSession --parameters 'portNumber=%p'"
#         IdentityFile [pemキーへのパス].pem
```

- User は AWS CLI 実行 IAM ユーザーの名前を指定
- profile を指定していたら`ProxyCommand`は以下の通りになる

  - `sh -c "aws --profile [プロファイル名] ssm start-session --target %h --document-name AWS-StartSSHSession --parameters 'portNumber=%p'"`

- https://qiita.com/Mouflon_127000/items/3c841ec12a01fa7f9c8d#aws-cli%E7%94%A8iam%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC%E4%BD%9C%E6%88%90
- https://zenn.dev/dem_1/articles/543b4835a3c1c7
- https://iret.media/104916
- https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/getting-started-restrict-access-examples.html#restrict-access-example-instances
