import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { LightTooltip } from "./SideNavbar";
import { ColorButton } from "./Auth/Login";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { makeSearchApi } from "./Redux/Searching/action";
import { SearchUserComp } from "./MyChat";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { makeNewGroup } from "./Redux/RecentChat/action";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [open, setOpen] = useState(false);
  const { search_result, loading, error } = useSelector(
    (store) => store.search
  );
  const { user, token } = useSelector((store) => store.user);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userError, setuserError] = useState({
    error: false,
    message: "",
    type: "",
  });
  const [search, setSearch] = useState(false);
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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setuserError({
      error: false,
      message: "",
      type: "",
    });
  };
  const handleSubmit = () => {
    //   setOpen(false);
    if (groupChatName === "") {
      setuserError({
        error: true,
        message: "Select a Group Name",
        type: "warning",
      });
    }
    if (selectedUsers.length <= 2) {
      setuserError({
        error: true,
        message: "More than 2 users are required to form a group chat",
        type: "error",
      });
    }
    dispatch(
      makeNewGroup(
        {
          name: groupChatName,
          users: selectedUsers.map((u) => u._id),
        },
        token
      )
    );
  };
  const handleaddingofUser = (user) => {
    if (selectedUsers.includes(user)) {
      setuserError({
        error: true,
        message: "User already added",
        type: "warning",
      });
      return;
    }
    setuserError({ error: false, message: "", type: "" });
    setSelectedUsers([...selectedUsers, user]);
  };
  const handleremove = (deluser) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id != deluser._id));
  };

  return (
    <div>
      <LightTooltip title="New Groups" placement="top">
        <GroupOutlinedIcon onClick={handleClickOpen} />
      </LightTooltip>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create New Group
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {userError.error ? <CustomizedSnackbars {...userError} /> : ""}
          <Typography gutterBottom>Group Name</Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            margin="dense"
            variant="outlined"
            onChange={(e) => {
              setGroupChatName(e.target.value);
            }}
          />
          <Typography mt={2} gutterBottom>
            Group Members
          </Typography>
          <TextField
            fullWidth
            onChange={handleQuery()}
            id="outlined-basic"
            margin="dense"
            variant="outlined"
            placeholder="Add users eg. Jon"
          />
          <div className="group-people-cont">
            {selectedUsers.map((el) => (
              <div key={el._id} className="group-people">
                <p>{el.name}</p>{" "}
                <CloseIcon
                  onClick={() => {
                    handleremove(el);
                  }}
                />
              </div>
            ))}
          </div>
          <div>
            {search &&
              search_result.map((el) => (
                <div
                  key={el._id}
                  onClick={() => {
                    handleaddingofUser(el);
                  }}
                >
                  <SearchUserComp {...el} />
                </div>
              ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <ColorButton onClick={handleSubmit}>Create Group</ColorButton>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomizedSnackbars({ message, type }) {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
