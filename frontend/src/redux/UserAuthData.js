import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAuthData = createAsyncThunk("get/getuser", async () => {
    try {
        const res = await fetch("/about", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const status = res.status;
        
        const data = await res.json();
        return { data, status };
    } catch (err) {
        throw err;
    }
});

const UserAuthSlice = createSlice({
    name: "userAuthData",
    initialState: {
        loading: false,
        status: 0,
        userData: []
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchAuthData.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(fetchAuthData.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload.data;
            state.status = action.payload.status;
        });

        builder.addCase(fetchAuthData.rejected, (state, action) => {
            state.loading = false;
            state.status = 400; 
        });
    }
});

export default UserAuthSlice.reducer;
