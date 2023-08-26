import React, { useState, useEffect, memo } from "react";
import "./PopUpCharacter.css"; // You can create a CSS file for styling

const PopUpCharacter = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the character on mount
    setIsVisible(true);

    // Hide the character after 5 seconds

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={`pop-up-character ${isVisible ? "visible" : "hidden"}`}>
      <div className="character">
        <svg
          width="200"
          height="400"
          viewBox="0 0 200 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M90 60 C85 20,315 20,110 40"
            fill="#8b572a"
            stroke="black"
            stroke-width="6"
          />

          <circle cx="100" cy="150" r="60" fill="#ffe0bd" />

          <rect x="70" y="200" width="60" height="120" fill="#f0e9d8" />

          <rect x="80" y="320" width="20" height="100" fill="#f0e9d8" />
          <rect x="100" y="320" width="20" height="100" fill="#f0e9d8" />

          <path
            d="M60,240 Q40,220 60,200"
            fill="#f0e9d8"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M140,240 Q160,220 140,200"
            fill="#f0e9d8"
            stroke="black"
            stroke-width="2"
          />

          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -10; 0 0"
            dur="1s"
            repeatCount="indefinite"
          />
        </svg>
        {isVisible && (
          <div style={{ color: "orange" }} className="text-box">
            Hi! Lets code and grow{" "}
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(PopUpCharacter);
