  import { setShowOverlay, setMessages } from "../store/actions";
  import store from "../store/store";
  import * as wss from "./wss";
  import Peer from "simple-peer";
  import { fetchTURNCredentials, getTurnIceServers } from "./turn";

  const defaultConstraints = {
    audio: true,
    video: {
      width: "480",
      height: "360",
    },
  };

  const onlyAudioConstraints = {
    audio: true,
    video: false,
  };

  let localStream;

  export const getLocalPreviewAndInitRoomConnection = async (
    isRoomHost,
    identity,
    roomId = null,
    onlyAudio
  ) => {
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        console.log("successfuly received local stream");
        localStream = stream;
        showLocalVideoPreview(localStream);

        // dispatch an action to hide overlay
        store.dispatch(setShowOverlay(false));

        isRoomHost
          ? wss.createNewRoom(identity, onlyAudio)
          : wss.joinRoom(identity, roomId, onlyAudio);
      })
      .catch((err) => {
        console.log(
          "error occurred when trying to get an access to local stream"
        );
        console.log(err);
      });
  };

  let peers = {};
  let streams = [];

  export const getConfiguration = () => {
    const turnIceServers = getTurnIceServers();

    if (turnIceServers) {
      return {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
          ...turnIceServers,
        ],
      };
    } else {
      console.warn("Using only STUN server");
      return {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      };
    }
  };

  const messengerChannel = "messenger";

  export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
    const configuration = getConfiguration();
try{
  
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
    channelName: messengerChannel,
  });

  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    wss.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (stream) => {
    console.log("new stream came");

    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });

  peers[connUserSocketId].on("data", (data) => {
    const messageData = JSON.parse(data);
    appendNewMessage(messageData);
  });

}catch(err){
  console.log(err)
}
  };

  export const handleSignalingData = (data) => {
    //add signaling data to peer connection
    peers[data.connUserSocketId].signal(data.signal);
  };

  export const removePeerConnection = (data) => {
    const { socketId } = data;
    const videoContainer = document.getElementById(socketId);
    const videoEl = document.getElementById(`${socketId}-video`);

    if (videoContainer && videoEl) {
      const tracks = videoEl.srcObject.getTracks();

      tracks.forEach((t) => t.stop());

      videoEl.srcObject = null;
      videoContainer.removeChild(videoEl);

      videoContainer.parentNode.removeChild(videoContainer);

      if (peers[socketId]) {
        peers[socketId].destroy();
      }
      delete peers[socketId];
    }
  };

  ////////////////////////////////// UI Videos //////////////////////////////////
  const showLocalVideoPreview = (stream) => {
    const videoGrids = document.getElementById("video-grids");
  
    // Check if the local stream video is already added
    if (!document.getElementById("local-video")) {
      const videoElement = document.createElement("video");
      videoElement.autoplay = true;
      videoElement.muted = true;
      videoElement.srcObject = stream;
      videoElement.id = "video-grids";
  
      videoElement.onloadedmetadata = () => {
        videoElement.play();
      };
  
      // Append the video element to the video grids container
      videoGrids.appendChild(videoElement);
    }
  };
  
  const addStream = (stream, connUserSocketId) => {
    // Display incoming stream
    const videoContainer = document.createElement("div");
    videoContainer.style.backgroundColor = "black"; 
    videoContainer.style.width = "250px"; // Set width
    videoContainer.style.height = "250px"; // Set height
    videoContainer.id = `${connUserSocketId}-container`; // Set unique ID for each container

    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.srcObject = stream;
    videoElement.id = `${connUserSocketId}-video`;

    videoElement.onloadedmetadata = () => {
        videoElement.play();
    };

    videoElement.addEventListener("click", () => {
        if (videoElement.classList.contains("full_screen")) {
            videoElement.classList.remove("full_screen");
        } else {
            videoElement.classList.add("full_screen");
        }
    });

    // Append the video element to the container
    videoContainer.appendChild(videoElement);

    // Append the container to the #video-grids div
    const videoGrids = document.getElementById("video-grids");
    videoGrids.appendChild(videoContainer);
};

  const getAudioOnlyLabel = (identity = "") => {
    const labelContainer = document.createElement("div");
    labelContainer.classList.add("label_only_audio_container");

    const label = document.createElement("p");
    label.classList.add("label_only_audio_text");
    label.innerHTML = `Only audio ${identity}`;

    labelContainer.appendChild(label);
    return labelContainer;
  };

  ////////////////////////////////// Buttons logic //////////////////////////////////

  export const toggleMic = (isMuted) => {
    localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
  };

  export const toggleCamera = (isDisabled) => {
    localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
  };

  export const toggleScreenShare = (
    isScreenSharingActive,
    screenSharingStream = null
  ) => {
    if (isScreenSharingActive) {
      switchVideoTracks(localStream);
    } else {
      switchVideoTracks(screenSharingStream);
    }
  };

  const switchVideoTracks = (stream) => {
    for (let socket_id in peers) {
      for (let index in peers[socket_id].streams[0].getTracks()) {
        for (let index2 in stream.getTracks()) {
          if (
            peers[socket_id].streams[0].getTracks()[index].kind ===
            stream.getTracks()[index2].kind
          ) {
            peers[socket_id].replaceTrack(
              peers[socket_id].streams[0].getTracks()[index],
              stream.getTracks()[index2],
              peers[socket_id].streams[0]
            );
            break;
          }
        }
      }
    }
  };

  ////////////////////////////////// Messages /////////////////////////////////////
  const appendNewMessage = (messageData) => {
    const messages = store.getState().messages;
    store.dispatch(setMessages([...messages, messageData]));
  };

  export const sendMessageUsingDataChannel = (messageContent) => {
    // append this message locally
    const identity = store.getState().identity;

    const localMessageData = {
      content: messageContent,
      identity,
      messageCreatedByMe: true,
    };

    appendNewMessage(localMessageData);

    const messageData = {
      content: messageContent,
      identity,
    };

    const stringifiedMessageData = JSON.stringify(messageData);
    for (let socketId in peers) {
      peers[socketId].send(stringifiedMessageData);
    }
  };
