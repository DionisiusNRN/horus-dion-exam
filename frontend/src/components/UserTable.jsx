import { useNavigate } from "react-router-dom";

export default function UserTable({ users, onDelete }) {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "20px" }}>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Nama Lengkap</th>
            <th style={styles.th}>Email</th>
            <th style={{ ...styles.th, textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} style={styles.tr}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.username}</td>
                <td style={styles.td}>{user.nama}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={{ ...styles.td, textAlign: "center" }}>
                  <button
                    style={styles.editBtn}
                    onClick={() => navigate(`/update/${user.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={styles.empty}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  thead: {
    background: "#f9fafb",
  },
  th: {
    textAlign: "left",
    padding: "14px",
    fontWeight: "600",
    borderBottom: "1px solid #e5e7eb",
  },
  tr: {
    borderBottom: "1px solid #f1f1f1",
  },
  td: {
    padding: "14px",
  },
  empty: {
    textAlign: "center",
    padding: "30px",
    color: "#9ca3af",
  },
  editBtn: {
    background: "#10b981",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    marginRight: "8px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
