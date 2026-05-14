import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://69da9b2226585bd92dd400ca.mockapi.io/api/v1';

export const mockStudents = [
  { id: 1, name: 'Alice', studentId: 'S001', major: 'CS', gpa: 3.8 },
  { id: 2, name: 'Bob', studentId: 'S002', major: 'CS', gpa: 3.2 },
];

export const studentsHandlers = [
  http.get(`${BASE_URL}/students`, () => HttpResponse.json(mockStudents)),
];
