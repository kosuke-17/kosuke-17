# State

- コンポーネント固有のメモリを State と呼ぶ

- **変数(let, cont)だけでは十分でない**

  - 再レンダリングしたときに変数は変更されずに初期値の状態になる。

  - 定義されている関数などでローカル変数が変更されてもレンダリングが発生しない。

useState はこの問題を解決してくれる。

useState の返り値は Array Distructing して 2 つの item を返す。

`const [変数, setter 関数] = useState(initialData)`

- useState の変数は再レンダリングされても値が保持されている。
- useState の setter 関数はコンポーネントを再レンダリング
  するトリガーの役割がある。
- useState を複数使用しているコンポーネントがあれば、変数をオブジェクトにして 1 つの useState で管理できるかを考えると良い([Choosing the State Struecture](https://react.dev/learn/choosing-the-state-structure))

useState の流れ

- コンポーネントが初めてレンダリングされたときには initialData が記憶されて最新の値の変数となる。
- setter 関数が呼ばれると、実行時の引数を記憶して、再レンダリングのトリガーとなる。
- コンポーネントの再レンダリングが起きて、記憶している変数と setter 関数を返す。
- 同じコンポーネントをコピーして表示している場合は内部の変数(state)はそれぞれ分離しています。それぞれ変数が更新されても、お互いは干渉しません

  - 一方で親に当たるコンポーネントから変数を渡しているとそれぞれのコンポーネントで再レンダリングが発生します。

## References

[State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
