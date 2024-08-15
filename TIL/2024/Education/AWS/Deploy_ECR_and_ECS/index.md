# ECR と ECS でアプリケーションをデプロイ

1. ECR を作成
   1. リポジトリ名 : `xxx-api-ecr` 、`xxx-web-ecr`
2. ECS Culster の作成
   1. Culster 名 : `xxx-api-cluster`、`xxx-web-cluster`
   2. Fargate を指定
3. ECS Task 定義を作成
   1. ECS→Task 定義 →Task 定義を作成
   2. Task 名 : `xxx-api-task` 、`xxx-web-task`
   3. タスクサイズは最低限の`.25vCPU`と`.5GB`
4. ECS Service の作成
   1. Task 名 : `xxx-api-service` 、`xxx-web-service`
   2. ファミリーに先ほど作成した Task 定義を指定
5. デプロイ用の IAM ユーザーの作成
   1. ユーザー名 : githubactions
   2. 付与する権限: `AmazonEC2ContainerRegistryFullAccess`、`AmazonECS_FullAccess`
   3. アクセスキーの作成
      1. CSV ファイルをダウンロードしておく
6. Github のリポジトリで AWS 認証情報を設定
   1. Github のリポジトリの settings からダウンロードした CSV ファイルのアクセスキー(ID と KEY)を設定
      1. Name: `AWS_SECRET_ACCESS_ID`と`AWS_SECRET_ACCESS_KEY`
7. ワークフローの作成

   1. github の Action タブから、ワークフローファイルの雛形を作成

   - コードを修正

     ```yaml
     name: Deploy to Amazon ECS

     on:
       push:
         branches: ['xxx']

     # ここでAWSの情報を指定する
     env:
       AWS_REGION: ap-northeast-1
       ECR_REPOSITORY: xxx-ecr
       ECS_SERVICE: xxx-service
       ECS_CLUSTER: xxx-cluster
       ECS_TASK_DEFINITION: ./aws/task-def.json
       CONTAINER_NAME: xxx-container

     permissions:
       contents: read

     jobs:
       deploy:
         name: Deploy
         runs-on: ubuntu-latest
         environment: production

         steps:
           - name: Checkout
             uses: actions/checkout@v4

           - name: Configure AWS credentials
             uses: aws-actions/configure-aws-credentials@v1
             with:
               aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
               aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
               aws-region: ${{ env.AWS_REGION }}

           - name: Login to Amazon ECR
             id: login-ecr
             uses: aws-actions/amazon-ecr-login@v1

           - name: Build, tag, and push image to Amazon ECR
             id: build-image
             env:
               ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
               IMAGE_TAG: ${{ github.sha }}
             run: |
               # build時のpathは変える必要がある場合もある
               cd server
               docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
               docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
               echo "image=$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG" >> $GITHUB_OUTPUT

           - name: Fill in the new image ID in the Amazon ECS task definition
             id: task-def
             uses: aws-actions/amazon-ecs-render-task-definition@v1
             with:
               task-definition: ${{ env.ECS_TASK_DEFINITION }}
               container-name: ${{ env.CONTAINER_NAME }}
               image: ${{ steps.build-image.outputs.image }}

           - name: Deploy Amazon ECS task definition
             uses: aws-actions/amazon-ecs-deploy-task-definition@v1
             with:
               task-definition: ${{ steps.task-def.outputs.task-definition }}
               service: ${{ env.ECS_SERVICE }}
               cluster: ${{ env.ECS_CLUSTER }}
               wait-for-service-stability: true
     ```

8. task definition をアプリに設定
   1. ./aws/task-def.json にタスク定義から JSON をダウンロードして貼り付ける
9. デプロイのために github に push!!

参考

- https://qiita.com/ysda/items/5288b8cab8502185e1aa
