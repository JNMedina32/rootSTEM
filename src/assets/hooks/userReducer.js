export const ACTIONS = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_LOGIN_SUCCESS: "FETCH_LOGIN_SUCCESS",
  FETCH_LOGOUT_SUCCESS: "FETCH_LOGOUT_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
};

export function userReducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.FETCH_START:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        isError: false,
        isLoading: false,
      };
    case ACTIONS.FETCH_LOGIN_SUCCESS:
      return {
        ...payload,
        isLoading: false,
        isError: false,
      };
    case ACTIONS.FETCH_ERROR:
      return {
        ...state,
        ...payload,
        isLoading: false,
        isError: true,
      };
    case ACTIONS.FETCH_LOGOUT_SUCCESS:
      return {
        username: "Guest",
      };
    default:
      return state;
  }
}
