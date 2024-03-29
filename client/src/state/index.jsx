import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    profileToFind: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogOut: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user){
                state.user.friends = action.payload.friends;
            } else {
                console.log("error, user friends non-existent");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setProfileToFind: (state, action) => {
            state.profileToFind = action.payload.id;
        }
    }
})

export const {setMode, setLogin, setLogOut, setFriends, setPosts, setPost, setProfileToFind} = authSlice.actions;
export default authSlice.reducer;