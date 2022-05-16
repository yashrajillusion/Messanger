import { ADD_UNSEEN_MSG, REMOVE_SEEN_MSG } from "./action";

const initState = {
  notification: 0,
  unseenmsg: [],
};

export const notyficationReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case ADD_UNSEEN_MSG:
      return {
        ...store,
        unseenmsg: [payload, ...store.unseenmsg],
        notification: store.notification + 1,
      };
    case REMOVE_SEEN_MSG:
      return { ...store, notification: payload.length, unseenmsg: payload };
    default:
      return store;
  }
};
