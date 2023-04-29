import React from "react";

const Button = ({ props }) => {
  return (
    <div className="container mb-3">
      <button
        className="btn btn-outline-light btn-lg px-5"
        onClick={() => props()}
      >
        <span className="alarm-btn">ALARM</span>
      </button>
    </div>
  );
};

export default Button;
