import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { ChattingPage } from "./ChattingPage";
import { MyChat } from "./MyChat";
import SideNavbar from "./SideNavbar";

export const HomeComp = () => {
  const { user, loading, error } = useSelector((store) => store.user);
  const navigate = useNavigate();
  if (!user._id) {
    return <Navigate to="/register" />;
  }
  return (
    <div className="home-cont">
      <SideNavbar />
      <MyChat />
      {/* <ChattingPage /> */}
      <MessageStarter />
    </div>
  );
};

const MessageStarter = () => {
  return (
    <div className="chattingpage start-msg">
      <div>
        <Avatar sx={{ width: 70, height: 70 }} />
        <h3>Welcome, Christina!</h3>
        <p>Please select a chat to start messaging.</p>
      </div>
    </div>
  );
};
