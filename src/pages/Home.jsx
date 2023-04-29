import React, { useState } from "react";
import Map from "../components/Map";

const Home = () => {
  const [info, setInfo] = useState("");

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-sm d-flex justify-content-center p-5 container"></div>
        <div className="col-sm d-flex justify-content-center p-5 container ">
          <Map info={info} />
        </div>
        <div className="col-sm  p-5 container">
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <p>
                <b>INFORMACION:</b>
              </p>
              <p className="text-white-50 mb-5">
                Detalle de su alerta para lo comunidad
              </p>
            </div>
            <input
              type="text"
              className="form-control w-100 rounded"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
