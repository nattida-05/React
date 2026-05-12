// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../features/students/studentsSlice';
import coursesReducer  from '../features/courses/coursesSlice';
import gradesReducer   from '../features/grades/gradesSlice';

export const store = configureStore({
  reducer: {
    students: studentsReducer, // → state.students
    courses:  coursesReducer,  // → state.courses
    grades:   gradesReducer,   // → state.grades
  },
  // redux-thunk included automatically
  // Redux DevTools enabled in development
});
