import {
  ADD_RECENT_CHAT,
  NEW_CREATED_CHAT,
  RECENT_ERROR,
  RECENT_LOADING,
} from "./action";

const initState = {
  recent_chat: [],
  loading: true,
  error: false,
};
export const recentChatReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case ADD_RECENT_CHAT:
      return {
        ...store,
        recent_chat: payload,
        loading: false,
        error: false,
      };
    case NEW_CREATED_CHAT:
      return {
        ...store,
        recent_chat: [payload, ...store.recent_chat],
        loading: false,
        error: false,
      };
    case RECENT_ERROR:
      return { ...store, error: payload };
    case RECENT_LOADING:
      return { ...store, loading: payload };
    default:
      return store;
  }
};
