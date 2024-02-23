# Props(Properties)

- props(React Component Props)とはあるコンポーネントから別のコンポーネントにデータを渡すために使用されます。

  - 入力操作などによって起こるデータの変更を動的に検知してレンダリングする必要があるため。
  - 親のコンポーネントから子のコンポーネントに渡すことができる。
  - 子のコンポーネントから親のコンポーネントに渡すことができない。
  - React Props は read only の扱いをして、直接 props を変更するようにしてはいけない。
    - そこから新しい値を派生することはできる。
  - **イミュータブルな props だけではインタラクティブなコンポーネントは実装できないので、[useState Hooks](./State.md) を利用する必要がある。**
  - props を受け取ったコンポーネントはそれらがどこでどのように発生したのかを知る必要がない
    - where: 親のコンポーネントかそれ以上の階層で発生
    - how: ステートや変数、そのほかのもの
  - スプレッド構文による展開や Rest props(残りの props)は実装詳細を読みやすくするのに役立つ。誤った使い方をするとバグが発生しやすくなるので注意が必要。
  - prop はデフォルトの値を指定できる。
    - `({ title = "Hello" })`
  - 開始タグと終了タグの間にあるテキスト、変数、HTML 要素、React 要素などを children として props に渡すことができる。
  - コンポーネントも props として渡すことができる。
  - render prop components というコンセプト
    - `<Amount toCurrency={(amount) => <Euro amount={amount} />} />`

- Props は{ XXX }のように早い段階で分解できる

```javascript
const App = () => {
  const greeging_text = 'Welcome to React'

  return (
    <div>
      // 以下のような渡し方も可能
      <Greeting text={greeging_text} />
      // 変数を定義せずにインラインで渡す
      <Greeting text={'Welcome to React'} />
      // ダブルクウォート or シングルクウォートで渡す
      <Greeting text='Welcome to React' />
      // Objectで渡す。子コンポーネントでは"text.greeting"のようにする。
      <Greeting text={{ greeting: 'Welcome to React' }} />
    </div>
  )
}

const Greet = (props) => {
  return <h1>{props.text}</h1>
}
// 早い段階で分解
const Greet = ({ text }) => {
  return <h1>{text}</h1>
}
```

`text={{ greeting: 'Welcome to React' }}`の渡し方は初心者には混乱の原因になる。
もしオブジェクトで渡すなら変数定義すると良いかも

- React で style を当てるときにこのことに気がつく

```javascript
const App = () => {
  // 意図的に変数定義して読みやすくする。
  const text = { greeting: 'Welcome to React' }
  return (
    <div>
      <Greeting text={text} />
    </div>
  )
}
```

- props にあるものだけ使いたいため、分割代入することもできる

```javascript
const App = () => {
  return (
    <div>
      <Welcome text='Welcome to React' myColor='red' />
    </div>
  )
}

// ex1
const Welcome = ({ text, myColor }) => {
  return <h1 style={{ color: myColor }}>{text}</h1>
}

// ex2
const Welcome = (props) => {
  const { text, myColor } = props
  return <h1 style={{ color: myColor }}>{text}</h1>
}

// ex3
const Welcome = (props) => {
  return <h1 style={{ color: props.myColor }}>{props.text}</h1>
}
```

- 子コンポーネントにスプレッド構文で props を渡すことが可能
  - 注意: 同じキーが存在すると上書きしてしまうため、上書きに気づかずバグが起こる可能性がある。
  - memo:これが便利なタイミングは一番小さい粒度のコンポーネントに props を渡すときに省略したいとき。typescript で型をきちんと定義すれば、そこだけ見ればよくなる。

```javascript
const App = () => {
  const title = 'React'
  const description = 'Your component library for ...'

  return (
    <div>
      <Welcome title={title} description={description} />
    </div>
  )
}
const Welcome = (props) => {
  return (
    <div
      style={{
        border: '1px solid black',
        height: '200px',
        width: '400px',
      }}
    >
      <Message {...props} />
      {/* propsにtitleが存在したら、上書きされてバグが起きやすくなる */}
      <Message title='JavaScript' {...props} />
    </div>
  )
}
```

※memo: props として渡す値は必要なもののみを渡す。そうすることで外的な要因を受けてバグが発生する可能性がなくなるから。

- 親コンポーネントから受け取った props の残りの props をスプレッド構文で分割代入できる。
  - 残りの props を展開もできる。(EX2)

```javascript
// EX1
const Button = ({ label, onClick, ...others }) => (
  <button disabled={others.disabled} onClick={onClick}>
    {label}
  </button>
)
// EX2
const Button = ({ label, onClick, ...others }) => (
  <button onClick={onClick} {...others}>
    {label}
  </button>
)
```

- boolean の true を省略して prop として渡すことができる

```javascript
const App = () => {
  return <Button disabled />
}
```

<details>
<summary style="font-size:20px">
render prop components
</summary>
<details>
<summary>
Ex1
</summary>

```javascript
const App = () => (
  <div>
    <h1>US Dollar to Euro:</h1>
    <Amount toCurrency={(amount) => <Euro amount={amount} />} />

    <h1>US Dollar to Pound:</h1>
    <Amount toCurrency={(amount) => <Pound amount={amount} />} />

  </div>
);

const Amount = ({ toCurrency }) => {
const [amount, setAmount] = React.useState(0);

const handleIncrement = () => setAmount(amount + 1);
const handleDecrement = () => setAmount(amount - 1);

return (
<div>
<button type="button" onClick={handleIncrement}> +
</button>
<button type="button" onClick={handleDecrement}> -
</button>

      <p>US Dollar: {amount}</p>
      {toCurrency(amount)}
    </div>

);
};

const Euro = ({ amount }) => <p>Euro: {amount \* 0.86}</p>;

const Pound = ({ amount }) => <p>Pound: {amount \* 0.76}</p>;

export default App;

```

</details>
<details>
<summary>
Ex2.refactor
</summary>

```javascript
import * as React from 'react'

const App = () => (
  <div>
    <h1>US Dollar to Euro:</h1>
    <Amount>{(amount) => <Euro amount={amount} />}</Amount>

    <h1>US Dollar to Pound:</h1>
    <Amount>{(amount) => <Pound amount={amount} />}</Amount>
  </div>
)

const Amount = ({ children }) => {
  const [amount, setAmount] = React.useState(0)

  const handleIncrement = () => setAmount(amount + 1)
  const handleDecrement = () => setAmount(amount - 1)

  return (
    <div>
      <button type='button' onClick={handleIncrement}>
        +
      </button>
      <button type='button' onClick={handleDecrement}>
        -
      </button>

      <p>US Dollar: {amount}</p>
      {children(amount)}
    </div>
  )
}

const Euro = ({ amount }) => <p>Euro: {amount * 0.86}</p>

const Pound = ({ amount }) => <p>Pound: {amount * 0.76}</p>

export default App
```

</details>
</details>

## References

[How to use Props in React](https://www.robinwieruch.de/react-pass-props-to-component/)
