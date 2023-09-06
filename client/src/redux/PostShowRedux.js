import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    const res = await fetch("/feed", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.json();

    return data;

});

export const postLikeHandle = createAsyncThunk("post/postlike",
    async ({ id, userId }) => {
        const res = await fetch("/likePost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });

        const response = res.status
        return { id, userId, response }
    }
)

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        status: null,
        data: [],
        error: null,
        loading: false
    },

    reducers: {
        likeAndUnlikeButton(state, action) {
            const { id, userId, response } = action.payload;

            // Find the data item with the matching id
            const foundItem = state.data.find(item => item._id === id);

            if (foundItem) {
                // Clone the found item to avoid mutating the original state
                const updatedItem = { ...foundItem };

                // Find the index of the userId in the likes array
                const userIdIndex = updatedItem.likes.findIndex(like => like.user === userId);

                // If userId is present, remove it; otherwise, add it
                if (userIdIndex !== -1) {
                    updatedItem.likes.splice(userIdIndex, 1); // Remove userId
                } else {
                    updatedItem.likes.push({ user: userId }); // Add userId
                }

                // Update the state.data array with the modified item
                const itemIndex = state.data.findIndex(item => item._id === id);
                state.data[itemIndex] = updatedItem;
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 200;
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })



            .addCase(postLikeHandle.pending, (state) => {
                state.error = null
            })

            .addCase(postLikeHandle.fulfilled, (state, action) => {
                // const { id, userId, response } = action.payload;

                // // Find the data item with the matching id
                // const foundItem = state.data.find(item => item._id === id);

                // if (foundItem) {
                //     // Clone the found item to avoid mutating the original state
                //     const updatedItem = { ...foundItem };

                //     // Find the index of the userId in the likes array
                //     const userIdIndex = updatedItem.likes.findIndex(like => like.user === userId);

                //     // If userId is present, remove it; otherwise, add it
                //     if (userIdIndex !== -1) {
                //         updatedItem.likes.splice(userIdIndex, 1); // Remove userId
                //     } else {
                //         updatedItem.likes.push({ user: userId }); // Add userId
                //     }

                //     // Update the state.data array with the modified item
                //     const itemIndex = state.data.findIndex(item => item._id === id);
                //     state.data[itemIndex] = updatedItem;
                // }
            })

            .addCase(postLikeHandle.rejected, (state) => {
                state.error = 400
            })
    },
});

export default dataSlice.reducer;

export const { likeAndUnlikeButton } = dataSlice.actions
