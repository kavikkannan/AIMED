'use client';
import { useState, useRef, useEffect } from 'react';
import { saveAs } from 'file-saver';
import CommonHeaderPage from "./CommonHeaderPage";


const QuestionPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [timer, setTimer] = useState(0);
  const videoRef1 = useRef(null);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const questions = [
    "What is your name?",
    "Where are you from?",
    "What are your hobbies?",
    "What is your favorite book?",
    "Describe your best vacation."
  ];

  const startRecording1 = async () => {
    setRecordedChunks([]);
    setTimer(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef1.current.srcObject = stream;
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.start();
      setRecording(true);
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };
  const startRecording2 = async () => {
    setRecordedChunks([]);
    setTimer(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.start();
      setRecording(true);
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const stopRecording1 = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      videoRef1.current.srcObject.getTracks().forEach((track) => track.stop());
      setRecording(false);
      clearInterval(intervalRef.current);
    }
  };
  const stopRecording2 = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setRecording(false);
      clearInterval(intervalRef.current);
    }
  };

  const restartRecording1 = () => {
    stopRecording1();
    startRecording1();
  };
  const restartRecording2 = () => {
    stopRecording2();
    startRecording2();
  };

  const saveVideo1 = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    saveAs(blob, 'recorded-video.webm');
  };
  const saveVideo2 = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    saveAs(blob, 'recorded-video.webm');
  };

  return (
    <div className="h-screen bg-black text-white">
        <CommonHeaderPage/>
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-2 grid-rows-2 h-full">
        {/* [1,1] Camera Feed */}
         <div className="p-4 flex justify-center items-center bg-black">
          <video
            ref={videoRef1}
            autoPlay
            muted
            className="w-full h-full object-cover border-2 border-white"
          ></video>
        </div>

        {/* [1,2] Controls */}
        <div className="p-4 flex flex-col justify-center items-center bg-black space-y-4">
          <div className="flex space-x-4">
            {!recording ? (
              <button
                onClick={startRecording1}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording1}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Stop Recording
              </button>
            )}
            {recording && (
              <button
                onClick={restartRecording1}
                className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
              >
                Restart Recording
              </button>
            )}
            {recordedChunks.length > 0 && (
              <button
                onClick={saveVideo1}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save Recording
              </button>
            )}
          </div>
          <div className="text-lg font-semibold">
            Timer: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
          </div>
        </div>

        {/* [2,1] Questions Display */}
        <div className="p-4 bg-black flex justify-center items-center">
          {!recording ? (
            <div className="text-center text-xl">Please start recording to access the question</div>
          ) : (
            <div className="text-center text-xl font-medium">{questions[selectedQuestion - 1]}</div>
          )}
        </div>

        {/* [2,2] Question Numbers */}
        <div className="p-4 bg-black">
          <h2 className="text-xl font-semibold mb-4">Questions</h2>
          <ul>
            {questions.map((_, index) => (
              <li
                key={index}
                className={`p-2 cursor-pointer rounded text-center mb-2 border border-white ${
                  selectedQuestion === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-700'
                }`}
                onClick={() => recording && setSelectedQuestion(index + 1)}
              >
                Question {index + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col h-full">
        {/* Controls */}
        <div className="p-4 flex justify-center items-center bg-black">
          <div className="flex space-x-4">
            {!recording ? (
              <button
                onClick={startRecording2}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording2}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Stop Recording
              </button>
            )}
            {recording && (
              <button
                onClick={restartRecording2}
                className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
              >
                Restart Recording
              </button>
            )}
            {recordedChunks.length > 0 && (
              <button
                onClick={saveVideo2}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save Recording
              </button>
            )}
          </div>
        </div>

        {/* Camera Feed */}
        <div className="p-4 flex justify-center items-center bg-black">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-fit object-cover border-2 border-white"
          ></video>
        </div>

        {/* Questions Display */}
        <div className="flex-grow flex flex-col justify-center items-center p-4 bg-black">
          {!recording ? (
            <div className="text-center text-xl mb-4">Please start recording to access the question</div>
          ) : (
            <div className="text-center text-xl font-medium mb-4">{questions[selectedQuestion - 1]}</div>
          )}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => recording && setSelectedQuestion((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              disabled={!recording || selectedQuestion === 1}
            >
              Previous
            </button>
            <button
              onClick={() => recording && setSelectedQuestion((prev) => Math.min(prev + 1, questions.length))}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              disabled={!recording || selectedQuestion === questions.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
