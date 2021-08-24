import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        signingUp(state, action) {},
        setCurrentUser(state, action) {
            state.currentUser = action.payload
        },
        signingIn() {},
        signOut(state, action) {
            console.log('signed out')
            try {
                localStorage.setItem('currentUser', null)
            }catch(err) {
                console.log('problem with localStorage')
            }
            state.currentUser = null
        },
        autoSigningIn() {}
    }
})

export const { signingUp, setCurrentUser, signingIn, signOut, autoSigningIn } = usersSlice.actions;
export default usersSlice.reducer;