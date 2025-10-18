import React, { useRef,useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';      // Import SplitText
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaRegHandshake } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import '../styles/contact.css';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const iconRef = useRef(null);
  const emailBtnRef = useRef(null);
  const whatsappBtnRef = useRef(null);

  // Replace with your actual email and WhatsApp number
  const emailAddress = "your.email@example.com";
  const whatsappNumber = "+1234567890";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;

  useGSAP(() => {
    // Split the title for animation
    const titleSplit = new SplitText(titleRef.current, { type: 'chars' });

    // Timeline for entrance animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%', // Start animation when section is 70% in view
        toggleActions: 'play none none reverse',
      }
    });

    // Animate the icon, title, and buttons
    tl.from(iconRef.current, { opacity: 0, scale: 0.5, duration: 0.8, ease: 'back.out(1.7)' })
      .from(titleSplit.chars, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.05,
        duration: 1,
        ease: 'expo.out'
      }, "-=0.5") // Overlap slightly with icon
      .from([emailBtnRef.current, whatsappBtnRef.current], {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: 'expo.out'
      }, "-=0.8"); // Overlap with title

    // Pulsing Glow Animation for Buttons
    gsap.to([emailBtnRef.current, whatsappBtnRef.current], {
      boxShadow: "0 0 20px rgba(86, 165, 241, 0.6), 0 0 30px rgba(86, 165, 241, 0.4)",
      repeat: -1, // Repeat infinitely
      yoyo: true,   // Animate back and forth (glow on, glow off)
      duration: 1, // Half cycle duration (total pulse = 2 seconds)
      ease: "power1.inOut",
      delay: 1 // Start the glow after the entrance animation
    });

  }, { scope: sectionRef });
  useEffect(() => {
    // Ensure the elements exist before animating
    if (emailBtnRef.current && whatsappBtnRef.current) {
      // Pulsing Glow for Email Button (Grey)
      gsap.to(emailBtnRef.current, {
        boxShadow: "0 0 20px rgba(150, 150, 150, 0.6), 0 0 30px rgba(150, 150, 150, 0.4)",
        repeat: -1,
        yoyo: true,
        duration: 1, // Glow on/off cycle takes 2 seconds total
        ease: "power1.inOut"
      });
  
      // Pulsing Glow for WhatsApp Button (Green)
      gsap.to(whatsappBtnRef.current, {
        boxShadow: "0 0 20px rgba(37, 211, 102, 0.6), 0 0 30px rgba(37, 211, 102, 0.4)",
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut"
      });
    }
    return () => {
      gsap.killTweensOf([emailBtnRef.current, whatsappBtnRef.current]);
    }
  }, []);

  return (
    <section id='contact' ref={sectionRef} className="contact-section scroll-section">
      {/* Handshake Icon */}
      <div ref={iconRef}>
        <FaRegHandshake size="5rem" className="contact-icon" />
      </div>

      {/* Heading */}
      <h1 ref={titleRef} className="contact-title main-title">
        Tell me about your next project or idea!
      </h1>

      {/* Action Buttons */}
      <div className="contact-buttons">
        {/* Email Button */}
        <a ref={emailBtnRef} href={`mailto:${emailAddress}`} className="contact-button email">
          <MdOutlineEmail size="1.5rem" />
          Send Email
        </a>

        {/* WhatsApp Button */}
        <a ref={whatsappBtnRef} href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-button whatsapp">
          <FaWhatsapp size="1.5rem" />
          WhatsApp Me
        </a>
      </div>
    </section>
  );
}

export default Contact;