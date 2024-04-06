// 1.buttonを見つける
const likeButton = document.getElementById('likeButton')
// 2.clickイベントを検知するためにリスナーをアタッチ
// 3.状態を更新する処理を記述
likeButton.addEventListener('click', () => {
  // do something like action
  // data-liked属性を読み取って状態を追跡
  const liked = likeButton.getAttribute('data-liked') === 'true'
  likeButton.setAttribute('data-liked', !liked)
  likeButton.textContent = liked ? 'Like' : 'Liked'
})

// ネットワーク経由でDBに状態を保存する場合は以下のような記述で行なっていた
const likeButtonByXMLHttpRequest = document.getElementById('likeButton')
likeButton.addEventListener('click', () => {
  var liked = likeButton.getAttribute('data-liked') === 'true'

  const xhr = new XMLHttpRequest()
  xhr.open('POST', '/like', true)
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr < 400) {
      // Success
      likeButton.setAttribute('data-liked', !liked)
      likeButton.textContent = liked ? 'Like' : 'Liked'
    } else {
      console.log({ 'Server return an error': xhr.statusText })
    }
  }

  xhr.onerror = function () {
    console.log('Network Error')
  }

  xhr.send(JSON.stringify({ liked: !liked }))
})

// 2015年に導入されたfetch APIを使用
const likeButtonByFetchAPI = document.getElementById('likeButton')
likeButton.addEventListener('click', () => {
  const liked = likeButton.getAttribute('data-liked') === 'true'

  fetch('/like', {
    method: 'POST',
    body: JSON.stringify({ liked: !liked }),
  }).then(() => {
    likeButton.setAttribute('data-liked', !liked)
    likeButton.textContent = liked ? 'Like' : 'Liked'
  })
})

// fetchが失敗した場合、pendingの場合の挙動
const likeButtonWithFailedAndPending = document.getElementById('likeButton')
likeButton.addEventListener('click', () => {
  const liked = likeButton.getAttribute('data-liked') === 'true'
  const isPending = likeButton.getAttribute('data-pending') === 'true'

  likeButton.setAttribute('data-pending', 'true')
  likeButton.setAttribute('disabled', 'disabled')

  fetch('/like', {
    method: 'POST',
    body: JSON.stringify({ liked: !liked }),
  })
    .then(() => {
      likeButton.setAttribute('data-liked', !liked)
      likeButton.textContent = liked ? 'Like' : 'Liked'
      likeButton.setAttribute('disabled', null)
    })
    .catch(() => {
      likeButton.setAttribute('data-faild', 'true')
      likeButton.textContent = 'Failed'
    })
    .finally(() => {
      likeButton.setAttribute('data-pending', 'false')
    })
})
