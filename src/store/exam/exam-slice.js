import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteExams: [],
};
const examSlice = createSlice({
  name: "exam",
  initialState: initialState,
  reducers: {
    setFavoriteExams: (state) => {
      console.log("state", state);
      return {
        ...state,
      };
    },
    updateFavoriteExams: (state, action) => {
      return {
        ...state,
        favoriteExams: action.payload,
      };
    },
  },
});

export const { setFavoriteExams, updateFavoriteExams } = examSlice.actions;

export default examSlice.reducer;
