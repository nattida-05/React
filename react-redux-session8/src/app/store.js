// src/app/store.js
// The old studentsSlice/studentsThunks setup is gone — RTK Query replaces it.
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { studentsApi } from '../features/students/studentsApi';
import coursesReducer from '../features/courses/coursesSlice';
import gradesReducer from '../features/grades/gradesSlice';
import loggerMiddleware from '../middleware/logger';

export const store = configureStore({
  reducer: {
    // RTK Query keeps its cache under state[studentsApi.reducerPath]
    [studentsApi.reducerPath]: studentsApi.reducer,
    courses: coursesReducer,
    grades: gradesReducer,
  },
  // The API middleware powers caching, invalidation, polling, and other features.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentsApi.middleware).concat(loggerMiddleware),
});

// Enables refetchOnFocus / refetchOnReconnect behavior on the query hooks.
setupListeners(store.dispatch);
