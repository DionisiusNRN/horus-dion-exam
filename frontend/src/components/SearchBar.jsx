import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search user by name..."
      value={keyword}
      onChange={handleChange}
      style={styles.input}
    />
  );
}

const styles = {
  input: {
    width: "300px",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
  },
};
