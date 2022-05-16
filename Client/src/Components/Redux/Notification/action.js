export const ADD_UNSEEN_MSG = "ADD_UNSEEN_MSG";
export const REMOVE_SEEN_MSG = "REMOVE_SEEN_MSG";

export const addUnseenmsg = (payload) => ({ type: ADD_UNSEEN_MSG, payload });
export const removeSeenMsg = (payload) => ({ type: REMOVE_SEEN_MSG, payload });
