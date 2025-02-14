# オライリーの Terraform 本の学習記録

## Terraform 実行用の IAM ユーザーを作成

- アクセスキーを csv でインストール

## ターミナルにアクセスキーをセット

- ターミナルを閉じたらこの設定は消えてしまう。
  - `export AWS_ACCESS_KEY_ID=XXXXXXX`
  - `export AWS_SECRET_ACCESS_KEY=YYYYY`
- 別のセットの仕方もあると思うので今後調べる。

## provider と region の指定

- provider: aws
- region: 東京リージョン

## リソースを作成するための文法

```
resource "<プロバイダ>_<タイプ>" "名前" {
  [設定...]
}
```

名前は terraform 内で使用する識別子

## terraform init

- 実行すると terraform がコードをスキャンして、どのプロバイダを使うのかを判断する
- そのプロバイダに関するコードを.terraform フォルダにダウンロードする
- .terraform は gitignore に記載しておいた方が良い

## terraform plan

- 変更を加える前に何をする予定なのかを確認する
- コードを世に出す前に正当性を確認する重要なコマンド
- git などの diff コマンドに似ている

## リソース属性の参照(resource attribute reference)

- <PROVIDER>\_<TYPE>.<NAME>.<ATTRIBUTE>

## 暗黙的依存

- あるリソースから他のリソースへ参照を追加すると、暗黙的依存が設定される
- Terraform は依存グラフを作成して、リソースの作成順を判断する
- `terraform graph`

## イミュータブルインフラの考え方が Terraform には存在する

- EC2 インスタンスはターミネートされて完全に新しいインスタンスが作成される
- そうすると、web サーバーのユーザーに対してはダウンタイムが発生してしまう
- 作成と削除を繰り返すとその分だけお金もかかってしまうかもしれないので注意が必要
- ゼロランタイムデプロイを行う方法がある模様

## 入力変数

```
variable "NAME" {
  [Config]
}
```
