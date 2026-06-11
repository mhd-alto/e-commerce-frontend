const BASE_URL = "http://localhost:5000";
// Auth (register + login)
// Connect Sign Up form to backend /auth/register
// Login wiring can be added similarly if/when needed.
const apiRegister = async ({ fullName, email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, password }),
  });
  // backend returns JSON on both success and some errors
  let data;
  try {
    data = await res.json();
  } catch {
    data = { message: await res.text() };
  }
  if (!res.ok) {
    const msg = data?.message || "Registration failed";
    throw new Error(msg);
  }
  return data;
};



const apiLogin = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  let data;
  try {
    data = await res.json();
  } catch {
    data = { message: await res.text() };
  }
  if (!res.ok) {
    const msg = data?.message || "Login failed";
    throw new Error(msg);
  }
  return data;
};
// NEW: Admin Register API
const apiAdminRegister = async ({ fullName, email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/admin/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, password }),
  });
  let data;
  try {
    data = await res.json();
  } catch {
    data = { message: await res.text() };
  }
  if (!res.ok) {
    const msg = data?.message || "Admin registration failed";
    throw new Error(msg);
  }
  return data;
};




// Add these functions to your api.js file

/**
 * Fetch all products from the backend API
 */
const apiGetProducts = async () => {
  const token = localStorage.getItem("authToken");
  
  const headers = { 
    "Content-Type": "application/json"
  };

  // If a token exists, format it with the Bearer prefix expected by your middleware
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}/products`, {
    method: "GET",
    headers: headers,
  });

  if (!res.ok) {
    throw new Error("Failed to load products");
  }
  return await res.json();
};

/**
 * Submit an order item to the backend API
 */
const apiCreateOrder = async ({ customerName, productId, quantity }) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerName, productId, quantity }),
  });
  
  let data;
  try {
    data = await res.json();
  } catch {
    data = { message: await res.text() };
  }
  
  if (!res.ok) {
    const msg = data?.message || "Order submission failed";
    throw new Error(msg);
  }
  return data;
};