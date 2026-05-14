import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { renderWithProviders } from '../test/utils';
import { server } from '../test/server';
import StudentTable from './StudentTable.jsx';

const STUDENTS_URL =
  'https://69da9b2226585bd92dd400ca.mockapi.io/api/v1/students';

describe('StudentTable', () => {
  it('shows loading state', () => {
    renderWithProviders(<StudentTable />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders student rows', async () => {
    renderWithProviders(<StudentTable />);
    await waitFor(() => {
      expect(screen.getByText(/alice/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/bob/i)).toBeInTheDocument();
  });

  it('shows error on 403', async () => {
    server.use(
      http.get(STUDENTS_URL, () =>
        HttpResponse.json({ error: 'Forbidden' }, { status: 403 }),
      ),
    );
    renderWithProviders(<StudentTable />);
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
