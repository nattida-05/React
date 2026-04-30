import { ExpenseProvider } from './context/ExpenseContext';
import ExpenseSummary from './components/ExpenseSummary';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';

export default function App() {
  return (
    <ExpenseProvider>
      <div className="app">

        <header className="page-header">
          <div className="header-badge">🌊 My Ocean Budget</div>
          <h1>Expense <span>Tracker</span></h1>
          <p className="subtitle">Ride the wave of your spending 🐋</p>
        </header>

        <section className="total-card">
          <ExpenseSummary />
        </section>

        <AddExpenseForm />

        <ExpenseList />

      </div>
    </ExpenseProvider>
  );
}