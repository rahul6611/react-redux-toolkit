import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";

const initialStates = {
    test: [],
    userData: [],
    status: null,
    process: null,
    reload: [],
    isSuccess: false,
    userProfiles: {},
    totalCount: 0,
};


// ** Clubs List
export const userListApi = createAsyncThunk(
    "userListApi",
    async ( _ , { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(`user`);
            return response.data.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);



// ** Add Club
export const addClub = createAsyncThunk(
    "addClub",
    async ({ data }, { rejectWithValue }) => {
        const config = {
            headers: { "content-type": "multipart/form-data" }
        };
        try {
            const response = await axiosApi.post("/club/createClub", data, config);
            return response.data.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

// ** Delete Club
export const deleteClub = createAsyncThunk(
    "deleteClub",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosApi.delete(`/club/deleteclubprofile/${id}`);
            toast.success(response.data.msg);
            return response.data.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

// ** Update Club
export const updateClubApi = createAsyncThunk(
    "updateClubApi",
    async ({ data, id }, { rejectWithValue }) => {
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        try {
            const response = await axiosApi.put(`/club/updateclubprofile/${id}`, data, config);
            return response.data.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

// ** Club Profile
export const clubProfileApi = createAsyncThunk(
    "clubProfileApi",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(`/club/getclubprofile/${id}`);
            return response.data.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: initialStates,
    extraReducers: {
        [userListApi.pending]: (state) => {
            state.status = "loading";
            state.process = 'loading';
        },
        [userListApi.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.process = 'succeeded';
            state.userData = action.payload;
            state.isSuccess = false;
            state.reload = null;
            state.totalCount = action.payload.totalResults;
        },
        [userListApi.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [addClub.pending]: (state) => {
            state.status = "loading";
        },
        [addClub.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.userData = action.payload;
            state.isSuccess = true;
        },
        [addClub.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [deleteClub.pending]: (state) => {
            state.status = "loading";
        },
        [deleteClub.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.reload = action.payload;
        },
        [deleteClub.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [updateClubApi.pending]: (state) => {
            state.status = "loading";
        },
        [updateClubApi.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.reload = action.payload;
        },
        [updateClubApi.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [clubProfileApi.pending]: (state) => {
            state.status = "loading";
        },
        [clubProfileApi.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.userProfiles = action.payload;
        },
        [clubProfileApi.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
  
    },
    reducers: {
        clearUserProfile(state) {
            state.userProfiles = []
        },
        clearUserList(state) {
            state.userData = []
        }
    }
});

export const { clearUserProfile, clearUserList } = userSlice.actions

const { reducer } = userSlice;

export default reducer;