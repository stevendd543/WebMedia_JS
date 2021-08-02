## mime type 媒體類別

是一種表示文件、檔案或各式位元組的標準

參考:https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Basics_of_HTTP/MIME_types

## MediaRecorder onDataAvailable

The DataAvailable event is fired when the MediaRecorder delivers media data to your application for its use. <br>
The data is provided in a Blob object that contains the data

步驟 1、在影音串流的最後，還沒交給 handler 處理的影音資料會先放入單個 blob 物件
When the media stream ends, any media data not already delivered to your ondataavailable handler is passed in a single Blob.

步驟 2、當停止錄製的時候，所有的由 dataAvailable 事件捕捉的影音串流資料，會被放入單一個 blob 中
When MediaRecorder.stop() is called, all media data which has been captured since recording began or the last time a dataavailable event occurred is delivered in a Blob; after this, capturing ends.

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::<br>
The Blob containing the media data is available in the <br>
dataavailable event's data property. 影音資料被放在 data 中<br>
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

### what is blob?

Blob 是 Binary Large Object 的縮寫，表示的是二進位檔案的資料內容，透過 Blob，JavaScript 才能讀寫二進位資料的檔案。和 ArrayBuffer 不同的地方是，ArrayBuffer 是操作記憶體，而 Blob 是用來操作二進位檔案（但尚未參照到實體檔案上）。
