<!-- TODO -->

## Rendering Lists

- 一覧データの違いが内容のみである場合は、同様のインターフェイス(見た目)で表示される

  - そのときに、一覧データが配列であれば map メソッドを使用して、一覧の内容を表示させる。
  - 特定の条件に当てはまる一覧データのみを表示したければ、filter メソッドを利用して一覧データの絞り込みを行う。
  - map メソッドを利用して、一覧データを表示するときにユニークな識別値(string or number)を key として渡す必要がある。

  - map のコールバック関数は中括弧で囲む場合は return を明示的に書くと返り値を返す。中括弧を省略すると return を明示的に書く必要がなくなる。

    - 一覧データの順番が変わったり、追加、削除されたときに正しい更新として DOM tree に知らせる役割がある。

  - DOM node が複数の場合は root のタグが`<>...</>`のようになる。この場合には key を記述することができない。その場合は Fragment コンポーネントを使用する。

  ```javascript
  const listItems = chemists.map((person) => <li>...</li>) // Implicit return!

  // Curly brace
  const listItems = chemists.map((person) => {
    return <li>...</li>
  })

  // use Fragment when there is several DOM nodes.
  import { Fragment } from 'react'
  const listItems = people.map((person) => (
    <Fragment key={person.id}>
      <h1>{person.name}</h1>
      <p>{person.bio}</p>
    </Fragment>
  ))
  ```

- どこから一意の Key を取得するのか
  - DB から ID などのユニークな値を利用する
  - uuid などで、ユニークな値を生成する
- key のルール
  - 異なる配列の JSX 内では同じ key を使用してもよい
  - key を再レンダリングなどで新たに作成してはいけない

### なぜ React は key が必要なのか

- ファイル一覧に名前がなかったらどのように参照するでしょうか？
  - 1 つ目のファイル、2 つ目のファイルのように順番で参照します。
  - key はこのファイルの順番と同様の役割を担います。
- 配列のインデックスを key に利用したくなりますが、良い方法ではありません。
  - 配列に新たなアイテムが追加、または削除されたときに配列内のアイテムはインデックスの番号が変わるからです。
- 同様に`key={Math.random()}`のようにその場で使用しないでください。
  - 毎回、コンポーネントの作成を行う必要が出てくるためです。
  - データの ID などを使うようにしてください。
- コンポーネントはキーを props として受け取らないようにしてください。

## References

[Rendering Lists](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)

```

```
