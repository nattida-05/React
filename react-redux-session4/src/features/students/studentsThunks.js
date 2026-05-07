// src/features/students/studentsThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://69da9b2226585bd92dd400ca.mockapi.io/api/v1/students';

// FETCH ALL
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, thunkAPI) => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch students');
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ADD
export const addStudentAsync = createAsyncThunk(
  'students/addStudentAsync',
  async (student, thunkAPI) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });
      if (!res.ok) throw new Error('Failed to add student');
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// UPDATE
export const updateStudentAsync = createAsyncThunk(
  'students/updateStudentAsync',
  async (student, thunkAPI) => {
    try {
      const res = await fetch(`${API_URL}/${student.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });
      if (!res.ok) throw new Error('Failed to update student');
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// DELETE
export const deleteStudentAsync = createAsyncThunk(
  'students/deleteStudentAsync',
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete student');
      return id; // return id so reducer can filter it out
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
