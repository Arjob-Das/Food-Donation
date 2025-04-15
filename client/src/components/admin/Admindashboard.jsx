import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/donations");
        setDonations(res.data);
      } catch (err) {
        setError("Failed to fetch donations");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/donations/${id}`);
      setDonations(donations.filter((donation) => donation._id !== id));
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Admin Dashboard</h1>

      {loading ? (
        <p>Loading donations...</p>
      ) : error ? (
        <p>{error}</p>
      ) : donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {donations.map((donation) => (
            <div
              key={donation._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                background: "#f9f9f9",
              }}
            >
              <h2>{donation.foodName}</h2>
              <p><strong>Tag:</strong> {donation.foodTag}</p>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
              <p><strong>Expires:</strong> {new Date(donation.expiryDate).toLocaleDateString()}</p>
              <p><strong>Address:</strong> {donation.address}</p>
              {donation.user && (
                <>
                  <p><strong>Donor Name:</strong> {donation.user.name}</p>
                  <p><strong>Email:</strong> {donation.user.email}</p>
                  <p><strong>Phone:</strong> {donation.user.number}</p>
                </>
              )}
              <button
                onClick={() => handleDelete(donation._id)}
                style={{
                  marginTop: "1rem",
                  background: "#e63946",
                  color: "white",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
