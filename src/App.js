import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [products, setProducts] = useState([]);

  const addProduct = () => {
    if (!productId || !productName || !sellingPrice) {
      alert('Please fill all fields');
      return;
    }
    const newProduct = {
      id: productId,
      name: productName,
      price: Number(sellingPrice),
    };
    setProducts([...products, newProduct]);
    setProductId('');
    setProductName('');
    setSellingPrice('');
    localStorage.setItem(productId, JSON.stringify(newProduct));
  };

  const removeProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.removeItem(productId);
  };

  useEffect(() => {
    const storedProducts = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)));
    setProducts(storedProducts);
  }, []);

  const cartTotal = products.reduce((total, product) => total + product.price, 0);

  return (
    <>
      <h1>Seller Admin Page</h1>
      <form onSubmit={(e) => { e.preventDefault(); addProduct(); }}>
        <label htmlFor="productId">Product ID:</label>
        <input type="text" id="productId" name="productId" value={productId} onChange={(e) => setProductId(e.target.value)} />
        <br />
        <label htmlFor="productName">Product Name:</label>
        <input type="text" id="productName" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <br />
        <label htmlFor="sellingPrice">Selling Price:</label>
        <input type="number" id="sellingPrice" name="sellingPrice" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
        <br />
        <button type="submit">Add Product</button>
      </form>
      <br />
      <div>
        <h2>Products</h2>
        {products.length === 0 ? <p>No products added yet.</p> :
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.name} - {product.price}
                <button onClick={() => removeProduct(product.id)}>Delete</button>
              </li>
            ))}
          </ul>
        }
        <h3>Cart Total: {cartTotal}</h3>
      </div>
    </>
  );
}

export default App;
