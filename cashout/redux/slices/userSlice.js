const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name: "user",
    initialState: { id: null },
    reducers: {
        setUserId: (state, action) => {
            state.user = action.payload;
        },
    },
})

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;