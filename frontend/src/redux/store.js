import { configureStore } from "@reduxjs/toolkit";
import postWindowReducer from "./PostWindowRedux";
import UserAuthData from "./UserAuthData";

const middleware = [];

if (process.env.NODE_ENV === 'development') {
  const { composeWithDevTools } = require('redux-devtools-extension');
  middleware.push(composeWithDevTools());
}
const store = configureStore({
  reducer: {
    postwindow: postWindowReducer,
    userauth: UserAuthData,
    middleware
  }
})

export default store;