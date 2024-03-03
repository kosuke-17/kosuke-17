# Referencing Values with Refs

## Why(なぜ use Ref を使うのか)

- useState の値だと下記の 2 つに対応できない。
  - コンポーネントがレンダリングしたときに状態(値)が維持したままでいてほしい。
  - 状態(値)が変更するタイミングでレンダリングをトリガーしたくない

## What(useRef は何をするのか)

- useRef は current プロパティを持つオブジェクト(一般的な JS Obj)を返す
  - current プロパティは string, number, オブジェクト, 関数など任意の値を保持できる
- current プロパティを動的に更新することができる
  - 更新しても再レンダリングをトリガーしない
- useState のセッター関数で再レンダリングが起きても、current プロパティの値は同じ値のままで、値が失われたり初期化されたりしない

- [useRef は内部でどうなっているのか](./Deep_Dive.md#how-does-useref-work-inside)

## How(どう使うのか)

- 多くのユースケースとしては DOM 要素へのアクセス(DOM 要素の保持、操作)
  - 要素がなくなれば、myRef も null になる

```javascript
const App = () => {
  const myRef = useRef(null)
  return <div ref={myRef} />
}
```

- timeout ID を保持する必要があるとき

  - setInterval,clearInterval 関数を用いた機能開発の時に返り値である ID を ref で保持することで Interval の処理を操作できる

- JSX の計算に必要ないオブジェクト
  - 最初のレンダリング中に 1 回だけ設定する: `if (!ref.current) ref.current === new Obj()`

### ref のベストプラクティス

React が ref.current の変更を認識しないため、ref.current の値をレンダリング中に読むだけでもコンポーネントがどのような振る舞いをするのか予測するのが難しくなる。

- 以下の原則に従うことでコンポーネントを予測可能にさせる

  - エスケープハッチとして扱う
    - 外部システムまたはブラウザ API を操作するときに便利。
    - ロジックとデータフローが ref に依存している場合はアプローチを再構築した方が良い
  - レンダリング中に ref.current を読み書きしない
    - レンダリング中に操作したい場合は useState を使用する

## Which(どちらか)

ref と state の違い

| 項目                       | useRef                                                                     | useState                                                                                                       |
| -------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 返り値                     | current プロパティを持つオブジェクト({ current: init })                    | 状態の値とセッター関数の配列([state, setState])                                                                |
| 値の変更時の再レンダリング | トリガーしない                                                             | トリガーする                                                                                                   |
|                            | 可変: current の値をレンダリングプロセスの外で更新できる(同期的に更新する) | 不可変: 再レンダリングをキューに入れるために、セッター関数で値を変更する(スナップショット(同期的に更新しない)) |
| レンダリング中の読み書き   | current の値を読み書きしてはいけない                                       | 値をいつでも読める                                                                                             |

## References

[Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
