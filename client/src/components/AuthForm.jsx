import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  //delete this later
  const navigate = useNavigate();
  const handleLoginSuccess = () => {
    navigate("/share-recipe");
  };
// ends here, and also the button down 
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const validateForm = (form, isLogin) => {
    if (!form.email || !form.password) {
      return "Email and password are required";
    }
    if (!isLogin) {
      if (!form.username || !form.confirm_password) {
        return "All fields are required";
      }
      if (form.password !== form.confirm_password) {
        return "Passwords do not match";
      }
    }
    return null;
  };
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setForm({
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(form, isLogin);
    if (error) {
      alert(error);
      return;
    }
    const url = isLogin ? "/api/auth/login" : "/api/auth/register";
    const res = await fetch(url, {
      // this works without base_url, because we use proxy in vite config
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log(data)
    if (!res.ok) {
      console.error("Error:", res.status, res.statusText);
      return;
    }
    localStorage.setItem("user", JSON.stringify(data.data.user)); // save user info in the browser
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={form.username}
                className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={form.email}
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={form.password}
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                onChange={handleChange}
                value={form.confirm_password}
                className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
          <input
            type="submit"
            value={isLogin ? "Login" : "Register Now"}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl cursor-pointer transition"
          />
        </form>
        <button onClick={handleLoginSuccess}>Go to Share Recipe</button>
        <p className="text-sm mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-500 hover:underline font-medium"
          >
            {isLogin ? "Register" : "login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
