import React, { useState, useEffect } from "react";
import styles from "../HomePage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Filter() {
  const [locations, setLocations] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    location: "",
    people: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    makeRequest(filter.category);
  }, [filter.category]);

  const makeRequest = async (value) => {
    try {
      const res = await axios.get(
        `https://voyawander-json-szvk.onrender.com/${value}Place`
      );
      setLocations(res.data);
    } catch (error) {
      console.error(error);
      // Default locations in case of error
      setLocations([
        "Mumbai",
        "Hyderabad",
        "Bangalore",
        "Leh",
        "Srinagar",
        "Pangong",
        "Maldives",
        "Male",
        "Mauritius",
        "Dubai",
        "Manali",
        "Kargil",
        "Munnar",
        "Kochi",
        "Mahabalipuram",
        "Calicut",
      ]);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleSearchClick = () => {
    const { category, location, people } = filter;
    if (category && location && people) {
      navigate(`/${category}?location=${location}&people=${people}`);
    } else {
      alert("Please select a category, location, and number of people.");
    }
  };

  return (
    <div className={styles.filter_outer}>
      <h3 className={styles.filter_heading}>Filter Your Travel Search</h3>
      <div className={styles.filter_row}>
        <select
          name="category"
          value={filter.category}
          onChange={handleFilterChange}
          className={styles.filter_select}
        >
          <option value="">Select Category</option>
          <option value="hotel">Hotels</option>
          <option value="holidays">Holiday Packages</option>
        </select>
        <select
          name="location"
          value={filter.location}
          onChange={handleFilterChange}
          className={styles.filter_select}
        >
          <option value="">Select Location</option>
          {locations.map((single, i) => (
            <option key={i} value={single.toLowerCase()}>
              {single}
            </option>
          ))}
        </select>
        <select
          name="people"
          value={filter.people}
          onChange={handleFilterChange}
          className={styles.filter_select}
        >
          <option value="">Number of People</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <button className={styles.search_button} onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
}

export default Filter;
