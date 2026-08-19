function ProductList() {
  return (
    <div className="product-list-page">
      <div className="section-header">
        <h2>Product List</h2>
        <p>All furniture products currently listed</p>
      </div>

      <div className="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p>No products listed yet</p>
        <span>Add your first product from the Add Product page</span>
      </div>
    </div>
  )
}

export default ProductList
