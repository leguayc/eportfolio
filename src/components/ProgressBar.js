import React from "react";

function ProgressBar(props) {
    const { bgcolor, completed } = props;
  
    const containerStyles = {
        height: '0.5rem',
        width: '70%',
        backgroundColor: "#e0e0de",
        borderRadius: 5
    }
  
    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit'
    }
  
    return (
        <div style={containerStyles}>
            <div style={fillerStyles}></div>
        </div>
    );
};
  
export default ProgressBar;