import { combineReducers } from "@reduxjs/toolkit";
import authorize_reducer from "@/modules/authorize/reducer";

export const rootReducer = combineReducers({
  authorize_reducer,
});
