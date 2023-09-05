import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchNotificationData = createAsyncThunk('notification/fetchData',
    async () => {
        const res = await fetch("/notification", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();
        return data;
    }
)

export const markNotificationAsRead = createAsyncThunk(
    'notification/markAsRead',
    async (notificationId) => {
        const res = await fetch(`/notificationread`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                notificationId
            })
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        return notificationId; // Return the notification ID to update the local state
    }
);

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        data: [],
        loading: false,
        error: null,
        length: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotificationData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotificationData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
                state.length = action.payload.filter((notification) => notification.read === false).length;
            })
            .addCase(fetchNotificationData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(markNotificationAsRead.fulfilled, (state, action) => {
                const notificationId = action.payload;
                
                const notification = state.data.find((notification) => notification._id === notificationId);
                if (notification) {
                    notification.read = true;
                }
                state.length = state.data.filter((notification) => !notification.read).length;
            });
    },
});

export const { markAsRead } = notificationSlice.actions;

export default notificationSlice.reducer;