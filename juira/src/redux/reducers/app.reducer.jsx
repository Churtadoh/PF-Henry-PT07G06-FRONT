import axios from "axios";
import {
  REFRESH_DATA,
  SIGN_IN,
  SIGN_OUT,
  TURN_OFF_SPINNER,
  TURN_ON_SPINNER,
  UPDATE_FILTER_STATE,
  USER_PROFILE,
} from "../actions/app.actions";

const initialState = {
  user: {},
  isSpinner: 0,
  filterState: { categories: "Todos", sort: "A-Z", condition: "Todos" },
  token: {
    token: "",
    role: "",
  },
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        token: {
          token: "",
          role: "",
        },
        user: {},
      };
    }

    case REFRESH_DATA:
      const localStorageToken = localStorage.getItem("token");
      const localStorageRole = localStorage.getItem("role");

      if (!localStorageToken && !localStorageRole) return state;
      axios.defaults.headers.common["Authorization"] = localStorageToken;
      return {
        ...state,
        token: { token: localStorageToken, role: localStorageRole },
      };

    case TURN_ON_SPINNER: {
      return {
        ...state,
        isSpinner: ++state.isSpinner,
      };
    }
    case TURN_OFF_SPINNER: {
      return {
        ...state,
        isSpinner: --state.isSpinner,
      };
    }
    case UPDATE_FILTER_STATE: {
      return {
        ...state,
        filterState: {
          ...state.filterState,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case USER_PROFILE: {
      return { ...state, user: { ...state.user, ...action.payload } };
    }

    default:
      return state;
  }
}
