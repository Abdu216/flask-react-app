import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App container mt-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Product Management
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                Category Management
              </Link>
            </li>
          </ul>
        </nav>

        <h1 className="text-center mt-4">Product and Category Management</h1>

        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/categories" element={<CategoryList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
