import React,{useEffect,useRef}from "react";
import Webcam from "react-webcam";
class App extends React.Component{
    render(){
      return(
       <A/>
      )
    }
    
}
const A = () => {
  const webcamRef = useRef(null); //用來抓dom上的節點:webcam (內有current物件可以使用，且不會re-render)
  const mediaRecorderRef = useRef(null); 
  const [capturing, setCapturing] = React.useState(false);
  //將recordedChunks綁定狀態，並初始化空陣列[]，由setRecordedChunks來注入資料
  const [recordedChunks, setRecordedChunks] = React.useState([]);
    /*useCallback會回傳保存的函式，只會在後面相依的array
    [webcamRef, setCapturing, mediaRecorderRef]有改變才會回傳更新的函式*/
  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    /*創建recorder物件，並給他source stream:webcamRef.current.stream */
    /*mime type詳細放在readme */
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    /*影片資料會觸發dataAvailable事件去捕捉，並執行function:handleDataAvailable*/
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable  // callback function
    );
    mediaRecorderRef.current.start(/*timeslice*/);//timeSlice 可有可無
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    //data from dataavailable event 
    ({ data }) => {
      if (data.size > 0) {
        //取得先前資料prev，在concatenate新資料
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    //停止錄影
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);
  console.log(recordedChunks);
  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      //將影片串流recordedChunks以blob形式儲存在瀏覽器中並設定mime type
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      //將recordedChunks以blob形式的檔案創建一個url來定位檔案在瀏覽器的位置
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      
      //下載完要手動清除內存，否則會影響效能
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <>
    
      <Webcam audio={false} ref={webcamRef} />
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
    </>
  );
};

// ReactDOM.render(<WebcamStreamCapture />, document.getElementById("root"));

// https://www.npmjs.com/package/react-webcam

export default App;
