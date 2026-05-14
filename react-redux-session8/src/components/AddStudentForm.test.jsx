import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { renderWithProviders } from '../test/utils';
import { server } from '../test/server';
import AddStudentForm from './AddStudentForm.jsx';
import StudentTable from './StudentTable.jsx';

const STUDENTS_URL =
  'https://69da9b2226585bd92dd400ca.mockapi.io/api/v1/students';

describe('AddStudentForm', () => {
  it('adds a new student', async () => {
    // Step 1: setup userEvent
    const user = userEvent.setup();

    // Step 2: override handlers — GET starts empty, POST appends Charlie
    let students = [];
    server.use(
      http.get(STUDENTS_URL, () => HttpResponse.json(students)),
      http.post(STUDENTS_URL, async ({ request }) => {
        const body = await request.json();
        const created = { id: 3, ...body };
        students = [...students, created];
        return HttpResponse.json(created);
      }),
    );

    renderWithProviders(
      <>
        <AddStudentForm />
        <StudentTable />
      </>,
    );

    // Step 3: type & click
    await user.type(screen.getByLabelText('NAME'), 'Charlie');
    await user.type(screen.getByLabelText('ID'), 'S003');
    await user.type(screen.getByLabelText('MAJOR'), 'CS');
    await user.type(screen.getByLabelText('GPA'), '3.7');
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Step 4: assert with waitFor — RTK Query refetches after invalidation
    await waitFor(() => {
      expect(screen.getByText(/charlie/i)).toBeInTheDocument();
    });
  });
});
