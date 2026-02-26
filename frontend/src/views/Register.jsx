import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validasi basic client-side
    if (!validateEmail(form.email)) {
      setError("Format email tidak valid");
      return;
    }

    try {
      await API.post("/users/register", form);

      setSuccess("Registrasi berhasil! Mengarahkan ke login...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registrasi gagal. Username atau email mungkin sudah digunakan.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-96 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          REGISTRASI AKUN
        </h2>

        {error && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-2 text-sm text-green-600 bg-green-100 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            required
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Registrasi
          </button>
        </form>
      </div>
    </div>
  );
}
