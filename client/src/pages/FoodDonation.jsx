import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "./FoodDonation.css";

function FoodDonation() {
  const [foodName, setFoodName] = useState("");
  const [foodTag, setFoodTag] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [address, setAddress] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [tokenNumber, setTokenNumber] = useState("");

  const email = localStorage.getItem("email");

  const generateToken = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `DTM-${timestamp}-${random}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = generateToken();

    const formData = {
      foodName,
      foodTag,
      quantity,
      expiryDate,
      address,
      email,
      tokenNumber: token,
    };

    try {
      const response = await axios.post("http://localhost:3000/fooddonation", { formData });
      console.log(response.data);
      setSubmittedData(formData);
      setTokenNumber(token);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Food Donation Report", 20, 20);
    doc.setFontSize(12);

    const lineSpacing = 10;
    let y = 40;

    Object.entries(submittedData).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 20, y);
      y += lineSpacing;
    });

    doc.save(`donation-report-${tokenNumber}.pdf`);
  };

  return (
    <div className="foodDonation_container">
      <div className="foodDonation_heading">
        <h1 className="heading-foodd">FOOD DONATION FORM</h1>
      </div>

      {!submittedData ? (
        <div className="foodDonation_wrapper">
          <form className="food-donation_form" onSubmit={handleSubmit}>
            <div className="form_element">
              <label htmlFor="foodName">Food name</label>
              <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
            </div>
            <div className="form_element">
              <label htmlFor="quantity">Quantity</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div className="form_element">
              <label htmlFor="foodTag">Food type or tag</label>
              <select value={foodTag} onChange={(e) => setFoodTag(e.target.value)}>
                <option value="" disabled>
                  Choose type
                </option>
                <option value="veg">Veg</option>
                <option value="nonveg">Non Veg</option>
              </select>
            </div>
            <div className="form_element">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
            </div>
            <div className="form_element">
              <label htmlFor="address">Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <button id="foodDonation_submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="report-container">
          <h2>Donation Submitted Successfully!</h2>
          <p><strong>Token Number:</strong> {tokenNumber}</p>
          <p><strong>Food Name:</strong> {submittedData.foodName}</p>
          <p><strong>Quantity:</strong> {submittedData.quantity}</p>
          <p><strong>Food Type:</strong> {submittedData.foodTag}</p>
          <p><strong>Expiry Date:</strong> {submittedData.expiryDate}</p>
          <p><strong>Address:</strong> {submittedData.address}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>

          <button onClick={downloadPDF}>Download Report</button>
        </div>
      )}
    </div>
  );
}

export default FoodDonation;
