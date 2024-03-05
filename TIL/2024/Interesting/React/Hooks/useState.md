# useState

- useState を使用することで、コンポーネントに変数を追加することができる

- initialvalue : state の初期値

  - 任意の値(any)を渡すことができる。
  - 初期化関数も渡すことができるが、[詳しくはこちら](https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state)

- 返り値 : 分割代入
  - 第 1 要素 : 現在の値
    - 最初のレンダリング時は初期値が返ってくる
    - セッター関数を呼んで 2 回目以降のレンダリングでは更新後の値が返ってくる
  - 第 2 要素 : セッター関数
    - state の更新をする
    - 再レンダリングを発生させる
    - 「前の状態が引数から渡ってきて値を更新するコールバック関数」を引数にできる
      - `setState(v => v + 1)`

注意事項

- hooks はコンポーネントの最上部で使用してください
- for 文などのロープ処理や if 文などの条件文の中では使用できません
- strict モードでは、不純物を見つけ出すために初期化関数を 2 回実行します

## セッター関数

特徴

- state の値を更新する
- 値の更新時に再レンダリングを発生させる
- 引数にコールバック関数を指定できる
  - コールバック関数は前の値を引数として受け取ることができる
    - `setState(v => v + 1)`
- 返り値 : 何も返さない

**注意事項**(ここ大事)

- 次のレンダリングの状態変数のみを更新する
  - もし、値の更新直後に値を読んでも、更新前の古い値が読まれる
    - これは、更新後にレンダリングされてから値が新しいものになるという順番のレンダリング前に値を読んでいるから
- もし、変更する値が前の値と同じだったら(Object.is で判断)、コンポーネントのレンダリングをスキップします
- 状態の更新をバッチ処理する
  - イベントハンドラを全て呼び出して、値の更新が全て終わった後に画面の更新を行う
  - これによって、1 つのイベントで複数回の再レンダリングが発生するのを防いでいます
  - もし DOM へのアクセスなど、React に強制的に画面を早く更新する必要がある場合は`flushSync`を使います

## 使い方

```javascript
// EX1: 通常
const [state, setState] = useState(initialvalue)

const handleClick = () => {
  setState(something) // 値を更新
  setState((v) => v + 1) // 関数を代入して計算した値を更新
}

// EX2: 値を更新してもその処理の中ではstateは更新前の値のまま
const [state, setState] = useState('hello')

const handleClick = () => {
  setState('good morning') // 値を更新
  console.log(state) // hello
}

// EX3: 関数が実行されるごとにstateが更新されるわけではない
const [state, setState] = useState(10)

const handleClick = () => {
  setState(state + 1) // 10+1
  setState(state + 1) // 10+1
  setState(state + 1) // 10+1

  // 解決策 : 保留状態を取得して、そこから次の計算を行う
  setState((v) => v + 1) // 10+1
  setState((v) => v + 1) // 11+1
  setState((v) => v + 1) // 12+1
}
```

## References

[useState](https://react.dev/reference/react/useState)
