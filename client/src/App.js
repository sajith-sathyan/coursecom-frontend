import React, { useEffect } from 'react';
import JoinRoomPage from './JoinRoomPage/JoinRoomPage';
import RoomPage from './RoomPage/RoomPage';
import IntroductionPage from './IntroductionPage/IntroductionPage'
import { Route, Routes } from "react-router-dom";
import { connectWithSocketIOServer } from './utils/wss';
import MyComponent from './RoomPage/RoomPage';
import Video from './video';

function App() {

  useEffect(()=>{
    connectWithSocketIOServer()
  },[])
  return (
    <Routes>
    {/* <Route path="*" element={<FourNotFour/>} /> */}
    <Route path="/" element={<IntroductionPage />} />
    <Route path="/room" element={<RoomPage />} />
    <Route path="/join-room" element={<JoinRoomPage />} />
    <Route path="/join" element={<MyComponent />} />
    <Route path="/video" element={<Video/>} />
    

    </Routes>
    
   
  );
}

export default App;
