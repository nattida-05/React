import { useExpenses } from '../context/ExpenseContext';

export default function ExpenseList() {
  const { filteredExpenses, deleteExpense, filter, setFilter, categories, cats } = useExpenses();

  return (
    <div>
      <div className="filter-label">Filter by category</div>
      <div className="filter-tabs">
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            className={`tab ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cats[cat] ? `${cats[cat].emoji} ` : '🌊 '}{cat}
          </button>
        ))}
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🐋</div>
          <p>No expenses yet!</p>
          <small>Add your first expense above 🌊</small>
        </div>
      ) : (
        filteredExpenses.map(exp => {
          const c = cats[exp.category] || { emoji: '🐚', color: '#29b6f6', bg: '#e1f5fe' };
          return (
            <div
              key={exp.id}
              className="expense-item"
              style={{ '--cat-color': c.color }}
            >
              <div className="cat-dot" style={{ background: c.bg }}>{c.emoji}</div>
              <div className="expense-info">
                <div className="expense-name">{exp.name}</div>
                <div className="expense-meta">{exp.category} · {exp.date}</div>
              </div>
              <div className="expense-amount">${exp.amount.toFixed(2)}</div>
              <button className="delete-btn" onClick={() => deleteExpense(exp.id)}>✕</button>
            </div>
          );
        })
      )}
    </div>
  );
}