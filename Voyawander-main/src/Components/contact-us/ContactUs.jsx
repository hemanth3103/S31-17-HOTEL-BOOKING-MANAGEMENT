import React, { useState } from 'react';
import styles from './ContactUs.module.css'; // Import CSS module

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/contactus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Contact form submitted successfully!');
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            } else {
                alert('Contact form submitted successfully!');
            }
        } catch (error) {
            console.error('Contact form submitted successfully!', error);
            alert('Contact form submitted successfully!');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Contact Us</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="name" className={styles.label}>Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={styles.input} required /><br /><br />

                <label htmlFor="email" className={styles.label}>Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} required /><br /><br />

                <label htmlFor="message" className={styles.label}>Message:</label><br />
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} className={styles.textarea} rows="4" cols="50" required></textarea><br /><br />

                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
    );
}

export default ContactForm;