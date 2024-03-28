import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Apitype, Meetingentity, Tokenentity, Userslice } from "../../type";
import apifunction from "../../utils/apiCall";

export const fetchuser = createAsyncThunk("fetchuser", async (obj: Apitype) => {
  const data = apifunction(obj);
  return data;
});
//unloaded || loading || completed ||
const initialState: Userslice = {
  httpStatus: "",
  message: "",
  status: "unloaded",
  isLogin: false,
  data: {
    email: "",
    name: "",
    admin: false,
    accessToken: "",
    refreshToken: "",
    meeting: {},
  },
};

const userSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    addmeeting: (state, action: PayloadAction<Meetingentity>) => {
      state.data.meeting = action.payload.meeting;
    },
    cleanData: (state) => {
      state.httpStatus = "";
      state.message = "";
      state.status = "unloaded";
      state.isLogin = false;
      state.data = {
        email: "",
        name: "",
        admin: false,
        accessToken: "",
        refreshToken: "",
        meeting: {},
      };
    },
    updateToken: (state, action: PayloadAction<Tokenentity>) => {
      state.data.accessToken = action.payload.accessToken;
      state.data.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchuser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchuser.fulfilled, (state, action) => {
        if (action.payload.status === 500) {
          //Api failure
          state.message = action.payload.statusText as string;
        } else {
          const { httpStatus, data, message } = action.payload
            .data as Userslice;
          if (httpStatus === "Unauthorized") {
            //unautherzied access
            state.message = message as string;
            state.status = "failed";
            state.isLogin = false;
          }
          if (httpStatus === "OK") {
            //pass the api for admin and user

            state.data = data;
            state.httpStatus = httpStatus;
            state.message = message;
            state.status = "completed";
            state.isLogin = true;
          }
        }
      })
      .addCase(fetchuser.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { cleanData, updateToken } = userSlice.actions;
export default userSlice.reducer;
