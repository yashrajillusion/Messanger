import { Avatar, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import InputEmoji from "react-input-emoji";
import React, { createRef, useEffect, useState } from "react";
import { messages } from "./messages";
import { ChatlogicStyling, isSameSender } from "./ChatstyleLogic";
export const ChattingPage = ({ pic }) => {
  const scrolldiv = createRef();

  useEffect(() => {
    const scrollToBottom = (node) => {
      node.scrollTop = node.scrollHeight;
    };

    scrollToBottom(scrolldiv.current);
  });
  return (
    <div className="chattingpage">
      <div className="top-header">
        <div className="user-header">
          <Avatar src={pic} />
          <p className="user-name">Yash Raj</p>
        </div>
        <div>
          <div className="user-fet">
            <SearchIcon />
            <CallIcon />
            <VideoCallIcon />
            <MoreHorizIcon />
          </div>
        </div>
      </div>
      <div ref={scrolldiv} className="live-chat">
        {messages.map((el, index) => (
          <div
            className={el.sender._id != 1 ? "rihgtuser-chat" : "leftuser-chat"}
          >
            <div className={el.sender._id != 1 ? "right-avt" : "left-avt"}>
              <div className={ChatlogicStyling(el.sender._id, 1)}>
                <p>{el.content}</p>
                <p className="time chat-time">
                  {new Date(el.createdAt).getHours() +
                    ":" +
                    new Date(el.createdAt).getMinutes()}
                </p>
              </div>

              {isSameSender(messages, index) ? (
                <Avatar src={el.sender.pic} />
              ) : (
                <div className="blank-div"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="sender-cont">
        <InputContWithEmog />
      </div>
    </div>
  );
};
const ColorButton = styled(Button)(() => ({
  color: "white",
  fontSize: "20px",
  textTransform: "none",
  padding: "12px",
  marginRight: "15px",
  backgroundColor: "#5865f2",
  "&:hover": {
    backgroundColor: "#3a45c3",
  },
}));
function InputContWithEmog() {
  const [text, setText] = useState("");

  function handleOnEnter(text) {
    console.log("enter", text);
  }
  function handleChatClick() {
    setText("");
  }
  return (
    <>
      <div className="search-cont send-message">
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
      </div>
      <ColorButton
        onClick={handleChatClick}
        variant="contained"
        endIcon={<SendIcon />}
      ></ColorButton>
    </>
  );
}
