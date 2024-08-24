# rbenv install をするとエラーが発生する

- `rbenv install 3.2.2`を実行するとエラーが発生

- [この記事](https://qiita.com/notakaos/items/e3e30443b1e57f84e7d8)を参考にインストール時のエラーを解消

やったこと

- https://github.com/rbenv/ruby-build/discussions/2118
  - homebrew などに libyaml をインストールしておく必要がある
- `brew info libyaml`を実行して libyaml があるか確認
  - Not installed と書かれていればインストールしてみる
- `brew install libyaml`を実行

- `rbenv install 3.2.2`
