import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apifunction from "../../utils/apiCall";
import { Apitype, ActivityCardentity, Response ,Activityslice} from "../../type";



export const fetchactivity = createAsyncThunk(
  "fetchactivity",
  async (obj: Apitype) => {
    const data = await apifunction(obj).then((res) => {
      return res as Response;
    });
    
    return data.data?.data===null?[]:data.data?.data as ActivityCardentity[];
  }
);

const initialState: Activityslice = {
  isLoading: false,
  data: [],
};

const userActivityslice = createSlice({
  name: "fetchactivity",
  initialState,
  reducers: {
    updateMeeting: (state, action: PayloadAction<ActivityCardentity[]>) => {
      state.data=action.payload;
    },
    cleanMeeting:(state)=>{
      state.data=[];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchactivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchactivity.fulfilled, (state, action) => {
      
        state.isLoading = false;
        state.data = action.payload as ActivityCardentity[];
      })
      .addCase(fetchactivity.rejected, (state, action) => {
        state.isLoading = true;
        state.data = [];
      });
  },
});
export const { updateMeeting,cleanMeeting } = userActivityslice.actions;
export default userActivityslice.reducer;
