import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    username: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      setForm({
        nama: res.data.nama,
        email: res.data.email,
        username: res.data.username,
      });
      setLoading(false);
    } catch (err) {
      alert("User not found");
      navigate("/dashboard");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/users/${id}`, form);
      alert("User updated successfully");
      navigate("/dashboard");
    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: "20px" }}>Update User</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.group}>
            <label>Nama Lengkap</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.group}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.group}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.actions}>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>

            <button type="submit" style={styles.saveBtn}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#f4f6f9",
    minHeight: "100vh",
    padding: "40px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    maxWidth: "500px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "18px",
  },
  input: {
    marginTop: "6px",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "10px",
  },
  cancelBtn: {
    background: "#9ca3af",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  saveBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
