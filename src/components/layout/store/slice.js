import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/**
 * 初始化数据
 */
const initialState = {
    token: '',
    routers: JSON.parse(localStorage.getItem('Router')) || []//路由
}

/**
 * reducers
 */
const reducers = {
    changeTokenAction: (state, action) => {
        state.token = action.payload
    },
    /**
     * 修改routers
     */
    changeRoutersAction: (state, action) => {
        state.routers = action.payload
    }
}

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers
})


export const actions = {
    ...layoutSlice.actions
};
export default layoutSlice.reducer;