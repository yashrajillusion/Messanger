export const SELECT_CHAT = "SELECT_CHAT";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const MESSAGE_LOADING = "MESSAGE_LOADING";
export const MESSAGE_ERROR = "MESSAGE_ERROR";
export const SEND_MESSAGE = "SEND_MESSAGE";

export const selectChat = (payload) => ({ type: SELECT_CHAT, payload });
export const addMessage = (payload) => ({ type: ADD_MESSAGE, payload });
export const messageLoading = (payload) => ({ type: MESSAGE_LOADING, payload });
export const messageError = (payload) => ({ type: MESSAGE_ERROR, payload });
export const sendMessage = (payload) => ({ type: SEND_MESSAGE, payload });

export const fetchCurrentMessages = (id, token, socket) => async (dispatch) => {
  dispatch(messageLoading(true));
  const url = `https://messenger-clo.herokuapp.com/message/${id}`;
  try {
    let res = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await res.json();
    socket.emit("join chat", id);
    dispatch(addMessage(data));
  } catch (err) {
    console.log(err);
    dispatch(messageError(true));
  }
};

export const sendMessageApi = (msg, token, socket) => async (dispatch) => {
  const url = `https://messenger-clo.herokuapp.com/message/`;
  try {
    let res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(msg),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await res.json();
    socket.emit("new message", data);
    dispatch(sendMessage(data));
  } catch (err) {
    console.log(err.message);
  }
};
