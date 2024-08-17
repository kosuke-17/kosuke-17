# ECS exec を使って Fargate のコンテナにアクセスする方法

- [AWS 公式 : ECS Exec を使用して Amazon ECS コンテナをモニタリングする](https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/developerguide/ecs-exec.html)

- ECS Exec を使用して、実行中の Linux または Windows コンテナでコマンドを実行できる

- ECS Exec permissions

  - 実行するには以下のポリシーを持つ IAM ロールを作成して、タスクロールとして指定する必要がある
  - [AWS 公式ドキュメント](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html)

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "ssmmessages:CreateControlChannel",
          "ssmmessages:CreateDataChannel",
          "ssmmessages:OpenControlChannel",
          "ssmmessages:OpenDataChannel"
        ],
        "Resource": "*"
      }
    ]
  }
  ```

- クラスターとサービスを作成して、タスクが作成されていれば、以下のコマンドを実行して、enableExecuteCommand が true かどうかを確認する

  ```
  aws ecs describe-tasks --cluster [cluster-name] --tasks [task-id]
  ```

- もし、enableExecuteCommand が false の場合は実行可能に変更するコマンドを叩く

  ```
  aws ecs update-service --region ap-northeast-1 --cluster [cluster-name] --service [service-name] --enable-execute-command
  ```

  - このコマンドを叩いた場合はタスク定義の再デプロイを行う

- Fargate のコンテナにアクセス

  ```
  aws ecs execute-command --region ap-northeast-1 --cluster [cluster-name] --task [task-id] --container [container-name] --interactive --command "/bin/sh"

  The Session Manager plugin was installed successfully. Use the AWS CLI to start a session.

  Starting session with SessionId: ecs-execute-command-07cfe2faxxxxxxxxxxxxxxxxx
  ```

### 参考

- https://qiita.com/okubot55/items/b1fb07b2de08c354275b

- https://aws.amazon.com/jp/blogs/news/new-using-amazon-ecs-exec-access-your-containers-fargate-ec2/
