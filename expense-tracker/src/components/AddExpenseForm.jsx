import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';

export default function AddExpenseForm() {
  const { addExpense, categories, cats } = useExpenses();
  const [name, setName]         = useState('');
  const [amount, setAmount]     = useState('');
  const [category, setCategory] = useState('');
  const [error, setError]       = useState(false);

  function handleAdd() {
    const parsed = parseFloat(amount);
    if (!name.trim() || !category || isNaN(parsed) || parsed <= 0) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }
    addExpense(name.trim(), parsed, category);
    setName('');
    setAmount('');
    setCategory('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd();
  }

  return (
    <div className="form-card">
      <div className="form-title">🐋 Add New Expense</div>
      <div className="form-grid">
        <input
          type="text"
          placeholder="What did you buy? 🛒"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={40}
        />
        <input
          type="number"
          placeholder="Amount ($)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          onKeyDown={handleKeyDown}
          min="0.01"
          step="0.01"
        />
      </div>
      <div className="form-full">
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Choose category...</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cats[cat].emoji} {cat}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="error-msg">⚠️ Please fill in all fields with valid values.</p>
      )}
      <button className="add-btn" onClick={handleAdd}>
        + Add Expense 🌊
      </button>
    </div>
  );
}