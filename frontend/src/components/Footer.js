import React from "react";
import '../styles/Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer className="footer">
            <button className="footer-button">
            <FontAwesomeIcon icon={faCircleDown} size='3x' style={{color: "#32e17e",}} />
            </button>
        </footer>
    );
};

export default Footer;