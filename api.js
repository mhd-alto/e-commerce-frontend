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


