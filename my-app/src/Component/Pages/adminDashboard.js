import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use `useNavigate` instead of `useHistory`


const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Using `useNavigate` for navigation

  // Fetch both products and orders when the component mounts
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // Fetch all products from the API
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Redirecting to login...");
      return navigate("/login"); // Redirect to login if token is missing
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/admin/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      } else {
        setError("Failed to fetch products. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("An error occurred while fetching products.");
    }
  };

  // Fetch all orders from the API
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Redirecting to login...");
      return navigate("/login");
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/admin/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      } else {
        setError("Failed to fetch orders. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("An error occurred while fetching orders.");
    }
  };

  // Add a new product to the API
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Redirecting to login...");
      return navigate("/login");
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        fetchProducts(); // Refresh the product list
        setNewProduct({ name: "", price: "", stock: "", image: "" });
        setError("");
      } else {
        setError("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setError("An error occurred while adding the product.");
    }
  };

  // Approve an order
  const handleApproveOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Redirecting to login...");
      return navigate("/login");
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/admin/orders/${orderId}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchOrders(); // Refresh the order list after approval
      } else {
        setError("Failed to approve order. Please try again.");
      }
    } catch (error) {
      console.error("Error approving order:", error);
      setError("An error occurred while approving the order.");
    }
  };

  // Handle form input changes for adding products
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect after logout
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      {error && <div className="error-message">{error}</div>}

      {/* Orders and Products sections (kept unchanged for now) */}
    </div>
  );
};

export default AdminDashboard;AddProduct,AllOrders,AllProducts,Carousel,DeleteProduct,EditProduct;
