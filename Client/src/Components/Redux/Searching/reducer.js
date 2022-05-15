import { SEARCH_ERROR, SEARCH_LOADING, SEARCH_RESULT } from "./action";

const initState = {
  search_result: [],
  loading: false,
  error: false,
};
export const serachReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case SEARCH_RESULT:
      return {
        ...store,
        search_result: payload,
        loading: false,
        error: false,
      };
    case SEARCH_ERROR:
      return { ...store, error: payload };
    case SEARCH_LOADING:
      return { ...store, loading: payload };
    default:
      return store;
  }
};
