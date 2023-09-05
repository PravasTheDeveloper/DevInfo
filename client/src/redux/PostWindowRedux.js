import { createSlice } from '@reduxjs/toolkit'

const PostWindowSlice = createSlice({
    name: 'postWindow',
    initialState:{
        postWindowStatus : false,
        codeUploadStatus : false
    },
    reducers:{
        openPostWindow(state){
            state.postWindowStatus = true
        },

        closePostWindow(state){
            state.postWindowStatus = false
        },

        opencloseCodeUploadBar(state){
            state.codeUploadStatus = !state.codeUploadStatus
        },

        openCodeUploadBar(state){
            state.codeUploadStatus = true
        },

        closeCodeUploadBar(state){
            state.codeUploadStatus = false
        }
    }
})

export const {openPostWindow , closePostWindow , openCodeUploadBar , closeCodeUploadBar , opencloseCodeUploadBar} = PostWindowSlice.actions;

export default PostWindowSlice.reducer;