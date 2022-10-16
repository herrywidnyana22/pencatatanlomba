import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const loginUser = createAsyncThunk('user/loginUser', async(user, thunkAPI) => {
    try {
        const Q_login = await axios.post('http://localhost:5001/login',{
            username: user.username,
            password: user.password
        } )
        return Q_login.data

    } catch (error) {
        if(error.response){
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const aboutMe = createAsyncThunk('user/aboutme', async(_, thunkAPI) => {
    try {
        const Q_me = await axios.get('http://localhost:5001/aboutme')
        return Q_me.data

    } catch (error) {
        if(error.response){
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})


export const logOut = createAsyncThunk('user/logOut', async() => {
    await axios.delete('http://localhost:5001/logout')
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
         reset: (state) => initialState
    },
    extraReducers:(builder) =>{
        builder.addCase(loginUser.pending, (state) =>{
            state.isLoading = true
        })

        builder.addCase(loginUser.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })

        builder.addCase(loginUser.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        //about user login
        builder.addCase(aboutMe.pending, (state) =>{
            state.isLoading = true
        })

        builder.addCase(aboutMe.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })

        builder.addCase(aboutMe.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer