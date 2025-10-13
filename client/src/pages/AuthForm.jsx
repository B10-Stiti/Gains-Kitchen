import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AuthForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const validateForm = (form, isLogin) => {
    if (!form.email || !form.password) return "Email and password are required";
    if (!isLogin) {
      if (!form.username || !form.confirm_password)
        return "All fields are required";
      if (form.password !== form.confirm_password)
        return "Passwords do not match";
    }
    return null;
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setForm({ username: "", email: "", password: "", confirm_password: "" });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm(form, isLogin);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const rep = await res.json();
      if (!res.ok) {
        setError(rep.message || "Something went wrong");
        return;
      }
      setError("");
      login(rep.data.userId);
      navigate("/");
    } catch (err) {
      setError("Server error, please try again.");
    }
  };

  return (
    <>
      <Header showSearch={false} />
      <div className="flex flex-col justify-between min-h-screen bg-gray-50 pt-32">
        {/* Centered form */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
              {isLogin ? "Login" : "Register"}
            </h2>
            {error && (
              <div className="mb-4 rounded-lg bg-red-100 border border-red-400 text-red-700 px-4 py-3">
                {error}
              </div>
            )}
            <form className="space-y-6 text-gray-900" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={form.username}
                    className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                  className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={form.password}
                  className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    onChange={handleChange}
                    value={form.confirm_password}
                    className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              )}

              <input
                type="submit"
                value={isLogin ? "Login" : "Register Now"}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg cursor-pointer transition"
              />
            </form>

            <p className="text-sm mt-6 text-center text-gray-700">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={toggleForm}
                className="text-green-500 hover:text-green-600 font-medium transition"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AuthForm;
