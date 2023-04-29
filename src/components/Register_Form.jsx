import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register_Form = () => {
  const [user, setUser] = useState({
    telephone: null,
    name: null,
    email: null,
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

  const notify_register = () => {
    toast.success("REGISTRO EXITOSO!");
  };

  const handle_submit = async (e) => {
    try {
      e.preventDefault();
      await axios
        .post("https://segur-app-backend-service.onrender.com/register", user)
        .then((data) => {})
        .then(() => {
          setTimeout(() => {
            navigate("/login");
          }, 4000);
          notify_register();
        });
    } catch (error) {
      return toast.error("NO SE PUDO REGISTRAR");
    }
  };

  return (
    <section className="vh-80 gradient-custom">
      <div className="container  h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-transparent text-white border-0">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Registro</h2>
                  <p>Todos los datos son obligatorios</p>
                  <p className="text-white-50 mb-5">
                    * Telefono donde recibir ALERTA
                    <br />
                    Ya tiene cuenta? <a href="/login">INGRESAR</a>
                  </p>
                  <div className="form-outline form-white ">
                    <input
                      type="text"
                      required="required"
                      name="telephone"
                      id="typeTelephoneX"
                      className="form-control form-control-lg"
                      onChange={handle_change}
                      placeholder="+05491511112222"
                    />
                    <label className="form-label" htmlFor="typeTelephoneX">
                      Telefono
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      required="required"
                      placeholder="Juan Perez"
                      name="Contraseñaname"
                      id="typeNameX"
                      className="form-control form-control-lg"
                      onChange={handle_change}
                    />
                    <label className="form-label" htmlFor="typeNameX">
                      Nombre
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      required="required"
                      type="email"
                      placeholder="example@gmail.com"
                      name="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      onChange={handle_change}
                    />
                    <label className="form-label" htmlFor="typeEmailX">
                      Email
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      aria-required="required"
                      placeholder="min 6 caracteres"
                      name="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      onChange={handle_change}
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

export default Register_Form;
