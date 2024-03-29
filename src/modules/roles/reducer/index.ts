import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rolesGetAllAsync } from "@/modules/roles/action";
import { RoleType } from "@/modules/roles/types/role-type";

export interface RolesState {
  loadingStatus: string;
  errorInfo: {
    message: string;
    error: string;
  };
  roles: RoleType[];
}

const initialState: RolesState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  roles: [],
};

const rolesSlice = createSlice({
  name: "roles",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(rolesGetAllAsync.pending.type, (state) => {
        state.loadingStatus = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        rolesGetAllAsync.fulfilled.type,
        (state, action: PayloadAction<RoleType[]>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.roles = action?.payload;
        },
      )
      .addCase(
        rolesGetAllAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      );
  },
});

export default rolesSlice.reducer;
