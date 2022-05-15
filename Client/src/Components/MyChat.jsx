import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import React, { useRef, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Badge } from "@mui/material";
import { useDispatch } from "react-redux";
import { makeSearchApi } from "./Redux/Searching/action";
import { useSelector } from "react-redux";
export const MyChat = () => {
  const [search, setSearch] = useState(false);
  const { search_result, loading, error } = useSelector(
    (store) => store.search
  );
  const ref = useRef();
  const dispatch = useDispatch();
  const handleQuery = (e) => {
    let id;
    return function (e) {
      if (!e.target.value) {
        setSearch(false);
        return;
      }
      if (ref.current) clearTimeout(ref.current);
      setSearch(true);
      ref.current = setTimeout(() => {
        dispatch(makeSearchApi(e.target.value));
      }, 1000);
    };
  };
  return (
    <div className="mychat-cont">
      <div>
        <div className="notification">
          <h2>Chats</h2>
          {/* <NotificationsIcon /> */}
          <Badge badgeContent={0} color="error">
            <Notificationcomp />
          </Badge>
          {/* <AddIcon /> */}
        </div>
        <div className="search-cont">
          <SearchIcon />
          <input
            onChange={handleQuery()}
            type="text"
            placeholder="Search users"
          />
        </div>
      </div>
      <div className="recent-chat">
        <p className="Recent">Recent</p>
        <div className="recent-user">
          {search && search_result.map((el) => <ChatUserComp {...el} />)}
        </div>
      </div>
    </div>
  );
};

export default function Notificationcomp() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <NotificationsIcon aria-describedby={id} onClick={handleClick} />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>No new messages.</Typography>
      </Popover>
    </div>
  );
}
const ChatUserComp = ({ email, name, pic, _id }) => {
  console.log(name);
  return (
    <div className="user">
      <div className="history-cont">
        <div>
          <Avatar src={pic} />
        </div>
        <div>
          <p className="name">{name}</p>
          <p className="chat">okay sure</p>
        </div>
      </div>
      <div>
        <p className="time">02:50</p>
        <p className="unseen-chat">5</p>
      </div>
    </div>
  );
};
