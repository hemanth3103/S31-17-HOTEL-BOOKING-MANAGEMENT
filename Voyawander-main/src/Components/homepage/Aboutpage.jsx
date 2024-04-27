import React from "react";
import styles from "./AboutPage.module.css";

function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <h1>About Us</h1>
      <img src="https://miro.medium.com/v2/resize:fit:1200/1*XUrSasLtkB0VoXcLEMfJKg.jpeg" />
      <p>
        Welcome to our hotel management system! We are committed to providing
        efficient and innovative solutions for hoteliers and hospitality
        professionals.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to simplify hotel management processes, enhance guest
        experiences, and empower hoteliers with the tools they need to excel in
        the hospitality industry.
      </p>

      <h2>Why Choose Us</h2>
      <ul>
        <li>Seamless reservation management</li>
        <li>Efficient front desk operations</li>
        <li>Comprehensive housekeeping management</li>
        <li>Inventory and billing management</li>
        <li>Advanced reporting and analytics</li>
      </ul>

      <h2>Contact Us</h2>
      <p>
        We'd love to hear from you! For inquiries and support, please contact
        us at:
      </p>
      <p>Email: info@royalrespitesystem.com</p>
      <p>Phone:9059442845</p>
      <p>Phone:9063265598</p>
      <p>Phone:7032469945</p>
    </div>
  );
}

export default AboutPage;