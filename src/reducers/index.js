import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import postReducer from "./PostReducer";
import chatReducer from "./ChatUserReducer";
import commentReducer from "./CommentReducer";

export const reducers = combineReducers({authReducer,postReducer, commentReducer ,chatReducer})