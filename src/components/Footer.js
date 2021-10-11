import React from "react";
// import Clock from 'react-live-clock'
// npm install --save react react-live-clock

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="footer_contents">Since 2021. 9. 15</div>
        <div className="clockBox">
          <div className="clock">{/* <Clock /> */}</div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
