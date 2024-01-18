import React from "react";
import buildVersion from "../buildVersion.json";
import "../Assets/components/Footer.css";

// Function to format a date as 'yyyymmdd'
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}${month}${day}`;
};

const Footer = () => {
    const buildDate = new Date(buildVersion.buildDate);
    const formattedDate = formatDate(buildDate);

    return (
        <footer className="footer-container">
            &copy; {new Date().getFullYear()} Exalent ™ Inc. All Rights Reserved. |{" "}
            {formattedDate}
            {buildVersion.version}
        </footer>
    );
};

export default Footer;
