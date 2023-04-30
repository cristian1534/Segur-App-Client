import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login_Form = () => {
  const [user, setUser] = useState({
    name: null,
    password: null,
  });

  const navigate = useNavigate();

  const handle_change = (e) => {
    const { name, value } = e.target;
    setUser((prev_user) => ({
      ...prev_user,
      [name]: value,
    }));
  };

  const notify_login = () => {
    toast.success("LOGIN EXITOSO!");
  };

  const handle_submit = async (e) => {
    try {
      e.preventDefault();
      await axios
        .post("https://segur-app-backend-service.onrender.com/login", user)
        .then((data) => {
          localStorage.setItem(
            "segurapp-token",
            data.data.user.stsTokenManager.accessToken
          );
        })
        .then(() => {
          setTimeout(() => {
            navigate("/home");
            window.location.reload();
          }, 4000);
          notify_login();
        });
    } catch (error) {
      return toast.error("Error en Email o Contraseña.");
    }
  };

  return (
    <section className="vh-80 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-transparent text-white border-0">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Ingresar</h2>
                  <p className="text-white-50 mb-5">
                    No tiene cuenta? <a href="/">REGISTRO</a>
                  </p>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      required
                      name="email"
                      onChange={handle_change}
                      id="typeEmailX"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="typeEmailX">
                      Email
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      required
                      name="password"
                      onChange={handle_change}
                      id="typePasswordX"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="typePasswordX">
                      Contraseña
                    </label>
                  </div>

                  <button
                    className="btn btn-outline-light btn-sm px-5"
                    type="submit"
                    onClick={handle_submit}
                  >
                    <span className="alarm-btn">Enviar</span>
                  </button>
                  <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    pauseOnHover={false}
                    transition={Slide}
                    hideProgressBar={false}
                    closeOnClick={true}
                    limit={5}
                    theme="dark"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login_Form;
