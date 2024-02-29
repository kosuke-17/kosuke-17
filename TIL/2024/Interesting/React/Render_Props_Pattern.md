# Render Props Pattern

- コンポーネントを再利用しやすくするパターンの一つ
- JSX を返すコールバック関数を render という prop にして、子コンポーネントでは render を実行するだけにしてレンダリングロジックは記述しない。
  - render という prop 名でなくても良い

```javascript
  const Title = (props) => props.render()

  <div className="App">
    <Title render={() => <h1>✨ First render prop! ✨</h1>} />
    <Title render={() => <h2>🔥 Second render prop! 🔥</h2>} />
    <Title render={() => <h3>🚀 Third render prop! 🚀</h3>} />
  </div>
```

- ## なぜ、render prop を使いたくなるのか？

子コンポーネントの state を別のコンポーネントでも使用したいときには親コンポーネントで state を管理するのがよくとられる実装です。しかし、state を更新すると state が関係しないコードも再レンダリングされてしまいます。

```javascript
function Input({ value, handleChange }) {
  return <input value={value} onChange={(e) => handleChange(e.target.value)} />
}

export default function App() {
  const [value, setValue] = useState('')

  return (
    <div className='App'>
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input value={value} handleChange={setValue} />
      <Kelvin value={value} />
      <Fahrenheit value={value} />
    </div>
  )
}
function Kelvin({ value = 0 }) {
  return <div className='temp'>{value + 273.15}K</div>
}

function Fahrenheit({ value = 0 }) {
  return <div className='temp'>{(value * 9) / 5 + 32}°F</div>
}
```

それを防ぐために下記のように render props を利用して実装します。これなら、state が関係するコードのみ再レンダリングされます。

```javascript
function Input(props) {
  const [value, setValue] = useState('')

  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      {props.render(value)}
    </>
  )
}

export default function App() {
  return (
    <div className='App'>
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input
        render={(value) => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      />
    </div>
  )
}
```

- children としても render prop を渡すことができる

```javascript
export default function App() {
  return (
    <div className='App'>
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input>
        {(value) => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      </Input>
    </div>
  )
}
function Input(props) {
  const [value, setValue] = useState('')

  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      {props.children(value)}
    </>
  )
}
```

- pros

  - 必要なコンポーネントのみロジックやデータを渡す方法に適したコンポーネントの構造をとる。
  - render や children として使用することでコンポーネントの再利用性が高まる。
  - 再利用性やデータの共有のメリットを HOC パターンも同じく与えることができる
    - HOC パターンを利用することで起こりうる名前の衝突問題は、render props パターンでは起きない

- cons
  - render props により深いネスト構造ができてしまう可能性がある
  - render props パターンで解決しようとした問題は大半が React Hooks で置き換えることができる

## References

[Render Props Pattern](https://www.patterns.dev/react/render-props-pattern)
