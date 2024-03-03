# Rendering Lists

## Why(なぜ Rendering Lists を使うのか)

- 同じ内容で同様の UI(Component) を提供したい場合、それらのデータが配列であれば JavaScript の map メソッドや filter メソッドを使用することで実現が可能

## What(Rendering Lists は何をするのか)

- データが配列であれば map メソッドを使用して一覧の内容を表示する

  - filter メソッドを使用すれば意図した内容のみ表示するように絞り込みが可能
  - 一覧の内容のそれぞれの HTML にユニークな識別値を key 属性として渡す必要がある
    - 内容それぞれの順番が変わるとき、新たな内容が追加/削除されるときに DOM tree に知らせるため
    - root が空の JSX タグ `<></>`の場合に key を記述することができない。その場合は Fragment コンポーネントを明示的に使用する。(`<></>`は Fragment コンポーネントの省略記法)

## How(どう使うのか)

```javascript
//EX1
const listItems = people.map((person) => (
  <div key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </div>
))

// EX2
// use Fragment when there is several DOM nodes.
import { Fragment } from 'react'
const listItems = people.map((person) => (
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
))

// Bad EX: shoud use Fragment like above
// const listItems = people.map((person) => (
//   < key={person.id}>
//     <h1>{person.name}</h1>
//     <p>{person.bio}</p>
//   </>
// ))
```

### なぜ key が必要なのか

- ファイル一覧に名前がなかったらどのように参照するでしょうか？
  - 1 つ目のファイル、2 つ目のファイルのように順番で参照します。
  - key はこのファイルの順番と同様の役割を担います。
- 配列のインデックスを key に利用したくなりますが、良い方法ではありません。
  - 配列に新たなアイテムが追加、または削除されたときに配列内のアイテムはインデックスの番号が変わるからです。
- 同様に`key={Math.random()}`のようにその場で使用しないでください。
  - 毎回、コンポーネントの作成を行う必要が出てくるためです。
  - データの ID などを使うようにしてください。
- コンポーネントはキーを props として受け取らないようにしてください。

- どこから一意の Key を取得するのか
  - DB から ID などのユニークな値を利用する
  - uuid などで、ユニークな値を生成する
- key のルール
  - 異なる配列の JSX 内では同じ key を使用してもよい
  - key を再レンダリングなどで新たに作成してはいけない

### Tip

- 明示的な Fragment コンポーネントは list の内容が複数の node の場合にのみ使用する。他に使用する用途はない。[参考](https://ja.react.dev/reference/react/Fragment#how-to-write-a-fragment-without-the-special-syntax)
- map メソッドのコールバック関数で return を省略して書くことができる。

```javascript
const listItems = chemists.map((person) => <li>...</li>) // Implicit return!

// Curly brace
const listItems = chemists.map((person) => {
  return <li>...</li>
})
```

高次関数: コールバック関数を受け取る関数
コールバック関数: ある関数を呼び出す際に引数として渡される関数のこと

## References

[Rendering Lists](https://react.dev/learn/rendering-lists)
