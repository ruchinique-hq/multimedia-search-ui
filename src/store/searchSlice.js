import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedFile: null,
  searchQuery: '',
  history: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addToHistory: (state, action) => {
      state.history.push(action.payload);
    }
  },
});

export const { setSelectedFile, setSearchQuery, addToHistory } = searchSlice.actions;
export default searchSlice.reducer; 