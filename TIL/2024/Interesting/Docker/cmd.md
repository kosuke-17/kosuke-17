```
<!-- imageを作成 -->
docker compose build
<!-- containerを起動 -->
docker compose up -d
<!-- containerを削除 -->
docker compose down
<!-- image一覧を表示 -->
docker images
<!-- 指定したimage idのiamgeを削除 -->
docker rmi 59a1204c4822
<!-- volume一覧を表示 -->
docker volume ls
<!-- 指定したvolume nameのvolumeを削除 -->
docker volume rm brain-breeze_dbdata
```
