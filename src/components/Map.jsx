import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-icon.png";
import Button from "../components/Button";
import axios from "axios";

let icon_location = new L.icon({
  iconUrl: icon,
  iconShadow: iconShadow,
  iconSize: [60, 50],
  iconAnchor: [22, 94],
  shadowAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

const Map = ({ info }) => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [address, setAddress] = useState(null);

  const success = async (Geolocation_position) => {
    let lt = Geolocation_position.coords.latitude;
    let lg = Geolocation_position.coords.longitude;
    setLat(Geolocation_position.coords.latitude);
    setLong(Geolocation_position.coords.longitude);
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lt},${lg}&key=AIzaSyD02nQSO6XXgB5zaPbKE-SATjBxIfLsX7k`
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          const address_alerted = response.data.results[0].formatted_address;
          setAddress(address_alerted);
        } else {
          return "No se encontró dirección";
        }
      })
      .catch((error) => console.error(error));
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const send_alarm = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    }
  };

  const update_alarm = async () => {
    await axios.post("https://segur-app-backend-service.onrender.com/alert", { address, info });
  };

  useEffect(() => {
    if (address) {
      update_alarm();
    }
  });

  return (
    <div>
      {lat == null || long == null ? (
        <Button props={send_alarm} info={info} />
      ) : (
        <div>
          <h3>COMUNIDAD NOTIFICADA DE TU ALERTA</h3>
          <MapContainer
            center={[lat, long]}
            zoom={50}
            scrollWheelZoom={false}
            className="map rounded"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, long]} icon={icon_location}>
              <Popup>
                Aqui se activo <br /> un ALERTA.
              </Popup>
            </Marker>
          </MapContainer>
          <span className="mt-2 mb-3">{address}</span>
          <br />
        </div>
      )}
    </div>
  );
};

export default Map;
