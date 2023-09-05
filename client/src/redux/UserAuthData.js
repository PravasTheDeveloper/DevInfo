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

export const changeProfileData = createAsyncThunk("post/postUpdateData", async (UserAuthData) => {
    try {
        const res = await fetch("/changeprofiledata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                UserAuthData
            )
        });
        const status = res.status;

        const data = await res.json();
        return { data, status };
    } catch (err) {
        throw err;
    }
})

const UserAuthSlice = createSlice({
    name: "userAuthData",
    initialState: {
        loading: false,
        status: 0,
        userData: []
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
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

        builder.addCase(changeProfileData.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(changeProfileData.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
        });

        builder.addCase(changeProfileData.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
        });
    }
});

export const { setUserData } = UserAuthSlice.actions;
export default UserAuthSlice.reducer;
