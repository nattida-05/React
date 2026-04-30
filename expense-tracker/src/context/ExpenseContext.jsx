import { createContext, useContext, useReducer, useEffect, useRef } from 'react';

const ExpenseContext = createContext();

const CATEGORIES = ['Food', 'Shopping', 'Beauty', 'Health', 'Transport', 'Entertainment', 'Other'];

const CATS = {
  Food:          { emoji: '🍱', color: '#29b6f6', bg: '#e1f5fe' },
  Shopping:      { emoji: '🛍️', color: '#0288d1', bg: '#e3f2fd' },
  Beauty:        { emoji: '🪸', color: '#f48fb1', bg: '#fce4ec' },
  Health:        { emoji: '💊', color: '#7c4dff', bg: '#ede7f6' },
  Transport:     { emoji: '⛵', color: '#26c6da', bg: '#e0f7fa' },
  Entertainment: { emoji: '🎣', color: '#00897b', bg: '#e0f2f1' },
  Other:         { emoji: '🐚', color: '#039be5', bg: '#e1f5fe' },
};

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':    return { ...state, expenses: [action.payload, ...state.expenses] };
    case 'LOAD':   return { ...state, expenses: action.payload };
    case 'DELETE': return { ...state, expenses: state.expenses.filter(e => e.id !== action.payload) };
    case 'FILTER': return { ...state, filter: action.payload };
    default:       return state;
  }
}

const initialState = { expenses: [], filter: 'All' };

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // ✅ This flag prevents saving before loading is done
  const hasLoaded = useRef(false);

  // LOAD — runs once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('whale_expenses');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: 'LOAD', payload: parsed });
        }
      }
    } catch (e) {
      console.error('Load failed', e);
    } finally {
      // Allow saving only after load attempt is done
      hasLoaded.current = true;
    }
  }, []);

  // SAVE — only runs after hasLoaded is true
  useEffect(() => {
    if (!hasLoaded.current) return;
    try {
      localStorage.setItem('whale_expenses', JSON.stringify(state.expenses));
    } catch (e) {
      console.error('Save failed', e);
    }
  }, [state.expenses]);

  const totalAmount = state.expenses.reduce((sum, e) => sum + e.amount, 0);

  const filteredExpenses = state.filter === 'All'
    ? state.expenses
    : state.expenses.filter(e => e.category === state.filter);

  function addExpense(name, amount, category) {
    dispatch({
      type: 'ADD',
      payload: {
        id: Date.now(),
        name,
        amount: parseFloat(amount),
        category,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      }
    });
  }

  function deleteExpense(id) { dispatch({ type: 'DELETE', payload: id }); }
  function setFilter(cat)    { dispatch({ type: 'FILTER', payload: cat }); }

  return (
    <ExpenseContext.Provider value={{
      expenses: state.expenses,
      filteredExpenses,
      totalAmount,
      filter: state.filter,
      categories: CATEGORIES,
      cats: CATS,
      addExpense,
      deleteExpense,
      setFilter,
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() { return useContext(ExpenseContext); }