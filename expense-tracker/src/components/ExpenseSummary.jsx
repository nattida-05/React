import { useExpenses } from '../context/ExpenseContext';

export default function ExpenseSummary() {
  const { expenses, totalAmount, cats } = useExpenses();

  const byCategory = Object.keys(cats).reduce((acc, cat) => {
    const total = expenses
      .filter(e => e.category === cat)
      .reduce((s, e) => s + e.amount, 0);
    if (total > 0) acc[cat] = total;
    return acc;
  }, {});

  return (
    <>
      <div className="total-label">🌊 Total Spent</div>
      <div className="total-amount">${totalAmount.toFixed(2)}</div>
      <div className="total-count">
        🐠 {expenses.length} transaction{expenses.length !== 1 ? 's' : ''} this month
      </div>
      <div className="cat-pills">
        {Object.entries(byCategory)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([cat, amt]) => (
            <div key={cat} className="cat-pill">
              {cats[cat].emoji} {cat}: ${amt.toFixed(2)}
            </div>
          ))}
      </div>
    </>
  );
}