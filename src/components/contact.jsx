import React from 'react';
import '../styles/contact.css'; // Import the new CSS

function Contact() {
  return (
    <section id='contact' className="contact-section scroll-section">
      <h2 className="contact-title">Contact Me</h2>
      <form 
        action="https://formspree.io/f/YOUR_FORM_ID" 
        method="POST" 
        className="contact-form"
      >
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;