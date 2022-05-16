import {
  AUTH_ERROR,
  AUTH_LOADING,
  AUTH_USER,
  LOGOUT,
  UPLOAD_PIC,
} from "./action";

const user = JSON.parse(localStorage.getItem("userInfo")) || {
  user: {},
  token: "",
};
const initState = {
  user: user.user,
  loading: false,
  error: false,
  token: user.token,
};

export const authReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case AUTH_USER:
      return {
        ...store,
        user: payload.user,
        loading: false,
        error: false,
        token: payload.token,
      };
    case UPLOAD_PIC:
      return {
        ...store,
        user: { ...store.user, pic: payload },
        loading: false,
        error: false,
      };
    case AUTH_ERROR:
      return { ...store, error: payload };
    case AUTH_LOADING:
      return { ...store, loading: payload };
    case LOGOUT:
      return logoutState;
    default:
      return store;
  }
};
