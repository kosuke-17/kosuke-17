# Reusing Logic with Custom Hooks

- React は useState,useEffect などの組み込みの Hooks があります
- データを取得したり、ユーザーがオンラインかどうかを追跡したり、チャットルームに接続したりしたい時にそれ専用の Hooks が欲しいと思い作成することが可能です

## コンポーネント間でロジックを共有するためのカスタムフック

- ネットワークに大きく依存するアプリを開発している場合、アプリを使用中にネットワーク接続が誤って切断されたらユーザーに警告したいと考えています
- コンポーネントには 2 つの対応が必要です
  - ネットワークのオンライン状態を追跡している state
  - グローバルなオンラインとオフラインのイベントをサブスクライブし、それらの状態を更新するエフェクト
- コンポーネントがネットワークステータスとの同期をし続ける必要があるでしょう

```javascript
export default const StatusBar = () => {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  },[])

  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}
```

- このロジックを他のコンポーネントでも使いたくなります
  - ボタンコンポーネントでネットワーク接続中には「保存」、切断中は「接続中」の文言を表示させたい

```javascript
export default function SaveButton() {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
    }
    function handleOffline() {
      setIsOnline(false)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  function handleSaveClick() {
    console.log('✅ Progress saved')
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  )
}
```

- 重複しているロジックは 1 つのロジックにまとめたい

- useState と useEffect の処理を useOnlineStatus のカスタムフックにまとめました

```javascript
function StatusBar() {
  const isOnline = useOnlineStatus()
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
}

function SaveButton() {
  const isOnline = useOnlineStatus()

  function handleSaveClick() {
    console.log('✅ Progress saved')
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  )
}

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
    }
    function handleOffline() {
      setIsOnline(false)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  return isOnline
}
```

- 重複のロジックが含まれなくなった
  - それ以上に重要なのが、実行したいこと(オンライン状態を使っている)を記述して、実行方法(ブラウザのイベントをサブスクライブする)を記述するのではない
  - ロジックをカスタムフックのなかに抽出することで、外部システムやブラウザ API などの詳細を隠すことができる
  - コンポーネントのコードは実装ではなく意図を表現する

## References

[Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
