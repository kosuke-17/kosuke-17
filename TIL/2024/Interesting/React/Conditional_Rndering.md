# Conditional Rendering

- コンポーネントは条件によって場合に異なった表示を行いたい場合がある。if 文や論理演算子(&&など)や三項演算子などの JavaScript 構文を使って JSX を条件付きにレンダリングさせることができる。

```javascript
// EX1: if文で条件に一致した場合に特定のJSXを返す。そうでない場合には別のJSXを返す。
// 補足1) ①と②はオブジェクト指向を理解している人からする別々のインスタンスに思える。しかし、JSX要素は内部状態を持たず、実在のDOMではないため、JSX要素はインスタンスではない。このことから、①と②は完全に同等である。
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className='item'>{name} ✔</li> // ①
  }
  return <li className='item'>{name}</li> // ②
}

// EX2: 条件一致した場合にnullを返すこともできる。しかし、nullを返すのは一般的ではない。
function Item({ name, isPacked }) {
  if (isPacked) {
    return null
  }
  return <li className='item'>{name}</li>
}

// EX3: DRY原則に従って、重複しているコードは共通化する。そうすることで、コードのメンテナンス性を低下させないようにする。
// 注意1: コンポーネントが何回ものネストされた条件付きのJSXとなっていたら、子コンポーネントとして取り出すことを考えよう。複雑な表現になりそうであれば、変数や関数(FC含む)でより簡潔に書くことを意識しよう。
function Item({ name, isPacked }) {
  return <li className='item'>{isPacked ? name + '✅' : name}</li>
  {
    /* 補足2) 取り消し線をつけるのであれば、delタグを使うと良い。 */
  }
  // return <li className='item'>{isPacked ? <del>name + '✅'</del> : name}</li>
}

// EX4: &&を用いた論理演算子による簡潔な書き方
// 注意2: &&演算子の左にはNumber型の値を置かないようにしましょう。もし&&演算子の左が0だったら、何も表示するのではなく、0を表示してしまうからです。その場合の対処としては、0に!演算子を2回つけて真偽値に変換してください。または大なり(>)演算子を用いてください
function Item({ name, isPacked }) {
  return (
    <li className='item'>
      {/* isPackedがtrueなら&&演算子以降を処理する。falseなら何もレンダリングしない。*/}
      {name} {isPacked && '✅'}
    </li>
  )
}

// EX5: 変数letを活用した書き方
// 最も冗長だが、最も柔軟な書き方
function Item({ name, isPacked }) {
  let itemContent = name
  if (isPacked) {
    {
      /* 
      再代入.
      任意のテキストも代入可能 : <del>{name + " ✔"}</del>
    */
    }
    itemContent = name + '✅'
  }
  // いまさら: 中括弧をしようすることで、JavaScriptをしようすることができる
  return <li className='item'>{itemContent}</li>
}
```

補足 1 のより詳しい内容は[こちら](https://react.dev/learn/preserving-and-resetting-state)

## References

[How to use Props in React](https://www.robinwieruch.de/react-pass-props-to-component/)

<!-- TODO -->
<!-- 他のConditional Renderingについて -->

[React Conditional Rendering](https://www.robinwieruch.de/conditional-rendering-react/)
