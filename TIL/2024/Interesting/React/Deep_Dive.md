<!-- TODO -->

# How does React know which state to return?

useState はどのようにして状態を返してるのか。useState が trigger されて再レンダリングされている中身がどうなっているのかを知りたいというモチベーション。初回レンダリングと２回目以降のレンダリングの判別どうしてるのという話。

# How does useRef work inside?

- useRef は値を変更してもなぜ re-rendering をトリガーしないのか。useState などで re-rendering が発生しても値が保持されたままなのか。

  - useRef の内部の一番上に状態のみの useState が実装されているようなものだから。

  ```javascript
  function useRef(initialValue) {
    const [ref, unused] = useState({ current: initialValue })

    return ref
  }
  ```

  - useRef は常に同じオブジェクトを返す必要があるため、セッター関数は使用しない。
  - refs はオブジェクト指向だとインスタンスのフィールドを連想させます。
    - オブジェクト指向は this.something で ref は somethingRef.current

## References

[How does React know which state to return?](https://react.dev/learn/state-a-components-memory#how-does-react-know-which-state-to-return)

[How does useRef work inside?](https://react.dev/learn/referencing-values-with-refs#how-does-use-ref-work-inside)
