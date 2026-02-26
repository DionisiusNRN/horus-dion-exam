import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      alert("Unauthorized. Please login.");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (keyword) => {
    const lower = keyword.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.nama.toLowerCase().includes(lower) ||
        user.email.toLowerCase().includes(lower) ||
        user.username.toLowerCase().includes(lower),
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await API.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>User Management</h2>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/register")}
          >
            + Add User
          </button>
        </div>

        <SearchBar onSearch={handleSearch} />
        <UserTable users={filteredUsers} onDelete={handleDelete} />
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
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
