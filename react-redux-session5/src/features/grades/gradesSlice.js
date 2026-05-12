// src/features/grades/gradesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const gradesSlice = createSlice({
  name: 'grades',
  initialState: { list: [] },
  reducers: {
    addGrade: (state, { payload }) => {
      state.list.push({ id: Date.now(), ...payload });
      // payload: { studentId, courseId, grade, semester }
    },
    updateGrade: (state, { payload }) => {
      const i = state.list.findIndex(g => g.id === payload.id);
      if (i !== -1) state.list[i] = payload;
    },
    deleteGrade: (state, { payload }) => {
      state.list = state.list.filter(g => g.id !== payload);
    },
  },
});

export const { addGrade, updateGrade, deleteGrade } = gradesSlice.actions;
export default gradesSlice.reducer;
