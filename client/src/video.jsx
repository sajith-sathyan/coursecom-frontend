        import React, { useEffect, useState } from "react";
        import { connect } from "react-redux";
        import * as webRTCHandler from "./utils/webRTCHandler";
        import "./view.css"; // Import the CSS file
        // Import the showLocalVideoPreview function

        const Room = ({
          roomId,
          identity,
          isRoomHost,
          showOverlay,
          connectOnlyWithAudio,
        }) => {
          const [videoStreams, setVideoStreams] = useState([]);

          useEffect(() => {
            if (!isRoomHost && !roomId) {
              const siteUrl = window.location.origin;
              window.location.href = siteUrl;
            } else {
              webRTCHandler.getLocalPreviewAndInitRoomConnection(
                isRoomHost,
                (identity = "sajith"),
                roomId,
                connectOnlyWithAudio,
                (stream) => {
                  // Add the local video stream to the state
                  setVideoStreams((prevStreams) => [...prevStreams, stream]);
                }
              );
            }
          }, []);
          console.log("roomId--->",roomId)
          return (
            <>
              <div className="mainclone">
                <div className="main_left">
                  <div className="main_videos">
                    <div id="video-grids">
                    <div style={{ backgroundColor: "black"}}></div>
                    </div>
                  </div>
                  <div className="main_controls">
                    <div className="main_controls_block">
                      <div
                        className="main_controls_button"
                        id="mic"
                        onclick="muteUnmute()"
                      >
                        <i className="fas fa-microphone-slash" />
                        <span>Mute</span>
                      </div>
                      <div
                        className="main_controls_button"
                        id="video"
                        onclick="VideomuteUnmute()"
                      >
                        <i className="fas fa-video-slash" />
                        <span>Stop Video</span>
                      </div>
                    </div>
                    <div className="main_controls_block">
                      <div className="main_controls_button" onclick="invitebox()">
                        <i className="fas fa-user-plus" />
                        <span>Invite</span>
                      </div>
                      <div className="main_controls_button">
                        <i className="fas fa-user-friends" />
                        <span>Participants</span>
                      </div>
                      <div className="main_controls_button" onclick="showchat()">
                        <i className="fas fa-comment-alt" />
                        <span>Chat</span>
                      </div>
                    </div>
                    <div className="main_controls_block">
                      <div className="main_controls_button leave_red">
                        <span className="leave_meeting">
                          <a href="/">Leave Meeting</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main_right" id="chat">
                  <div className="main_right_header">
                    <h6>Chat Area</h6>
                  </div>
                  <div className="main__chat_window" id="main__chat_window">
                    <ul className="messages" id="messageadd"></ul>
                  </div>
                  <div>
                    <div className="main__message_container">
                      <input
                        type="text"
                        id="chat_message"
                        onkeydown="sendmessage(this)"
                        placeholder="Type message here.."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        };

        const mapStoreStateToProps = (state) => {
          return {
            ...state,
          };
        };

        export default connect(mapStoreStateToProps)(Room);
