import "./App.css"
import products from "./data/products"
import ProductCard from "./components/ProductCard"

function App() {
  const availableCount = products.filter((p) => p.inStock).length
  const discountsById = {
    1: 15,
    2: 20,
    3: 10,
    4: 25,
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Nong aum</h1>
        <p>
          {products.length} products | {availableCount} available
        </p>
      </header>

      <div className="gallery-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            discount={discountsById[product.id]}
          />
        ))}
      </div>
    </main>
  )
}

export default App
