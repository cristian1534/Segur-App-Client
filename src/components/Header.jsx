import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const access_token = localStorage.getItem("segurapp-token");
    if (access_token) {
      setToken(access_token);
    }
  }, []);


  const logout = () => {
    localStorage.removeItem("segurapp-token");
    window.location.reload();
    setTimeout(() => { navigate("/")}, 1000)
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center">
        <a className="navbar-brand text-dark" href="/">
          <h1 className="p-3">SEGUR-APP</h1>
        </a>
        {token && (
          <h3
            className="text-dark m-3 rounded px-2 logout-btn"
            onClick={() => logout()}
          >
            SALIR
          </h3>
        )}
      </nav>
    </div>
  );
};

export default Header;
