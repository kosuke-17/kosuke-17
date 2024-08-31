# Docker コマンドで ECR に image を push

- 対象のイメージをビルド
  - docker image build -t sbcntr-backend:v1 .
- イメージの確認
  - docker image ls
- 対象のイメージを ECR の URI のタグ名に変更
  - docker image tag sbcntr-backend:v1 <イメージの URI>
  - イメージの URI の例: [AWS_ACCOUNT_ID].dkr.ecr.ap-northeast-1.amazonaws.com/ECR のリポ- ジトリ名:v1
- 複製されたかの確認
  - docker image ls
- ECR にログイン
  - aws ecr --region ap-northeast-1 get-login-password | docker login --username AWS - --password-stdin https:<イメージの URI>
  - イメージの URI の例: [AWS_ACCOUNT_ID].dkr.ecr.ap-northeast-1.amazonaws.com/ECR のリポ- ジトリ名
- ECR にイメージをプッシュ
  - docker image push [AWS_ACCOUNT_ID].dkr.ecr.ap-northeast-1.amazonaws.com/ECR のリポジ- トリ名:v1
- 終わり

- ECR にあるイメージを pull
  - docker image pull [AWS_ACCOUNT_ID].dkr.ecr.ap-northeast-1.amazonaws.com/ECR のリポジトリ名:v1
