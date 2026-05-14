import { setupServer } from 'msw/node';
import { studentsHandlers } from './handlers/students';

export const server = setupServer(...studentsHandlers);
