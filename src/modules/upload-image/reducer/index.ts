import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uploadImageAsync } from "@/modules/upload-image/action";
import { imagesGetAllAsync } from "@/modules/upload-image/action";
import { IMAGE_URL } from "@/modules/shared/constants/api-constants";
import { HYDRATE } from "next-redux-wrapper";

export interface ImageUploadState {
  loadingStatus: string;
  loadingStatusGetAll: string;
  errorInfo: {
    message: string;
    error: string;
  };
  imageName: string | null;
  images: string[];
}

const initialState: ImageUploadState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  loadingStatusGetAll: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  imageName: null,
  images: [],
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
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      )

      .addCase(imagesGetAllAsync.pending.type, (state) => {
        state.loadingStatusGetAll = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        imagesGetAllAsync.fulfilled.type,
        (state, action: PayloadAction<string[]>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.images = action?.payload?.map((x) => IMAGE_URL(x));
        },
      )
      .addCase(
        imagesGetAllAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      )
      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (action.payload?.upload_image_reducer?.errorInfo) {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.upload_image_reducer?.errorInfo?.message,
            error: action.payload?.upload_image_reducer?.errorInfo?.error,
          };
          state.images = [];
        } else {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.images = action.payload.upload_image_reducer?.images;
        }
      });
  },
});

export default imageUploadSlice.reducer;

export const { clearState } = imageUploadSlice.actions;
