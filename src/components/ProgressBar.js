import React from "react";

function ProgressBar(props) {
    const { bgcolor, progress } = props;
  
    const containerStyles = {
        height: '0.5rem',
        width: '70%',
        backgroundColor: "#e0e0de",
        borderRadius: 5
    }
  
    const fillerStyles = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        transition: 'width 0.3s ease-in-out'
    }
  
    return (
        <div style={containerStyles}>
            <div style={fillerStyles}></div>
        </div>
    );
};
  
export default ProgressBar;