import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uploadImageAsync } from "@/modules/upload-image/action";

export interface ImageUploadState {
  loadingStatus: string;
  errorInfo: {
    message: string;
    error: string;
  };
  imageName: string | null;
}

const initialState: ImageUploadState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  imageName: null,
};

const imageUploadSlice = createSlice({
  name: "image-upload",
  initialState: initialState,
  reducers: {
    clearState(state) {
      state.errorInfo = null;
      state.imageName = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImageAsync.pending.type, (state) => {
        state.loadingStatus = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        uploadImageAsync.fulfilled.type,
        (state, action: PayloadAction<string>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.imageName = action?.payload;
        },
      )
      .addCase(
        uploadImageAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      );
  },
});

export default imageUploadSlice.reducer;

export const { clearState } = imageUploadSlice.actions;
