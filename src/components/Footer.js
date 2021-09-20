import React from 'react'
import Clock from 'react-live-clock'
// npm install --save react react-live-clock
const Footer = () => {
    return (
        <div>
            <footer>
                <div className="footer_contents">
                    Since 2021-09-15
                </div>
                <div className="clockBox">
                    <div className="clock">
                        <Clock format={'dddd Do MMM HH:mm:ss'} ticking='true' timezone={'KST'} />
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
