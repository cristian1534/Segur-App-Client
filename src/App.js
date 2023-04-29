import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./middleware/PrivateRoute";

//components
const Layout = lazy(() => import("./components/Layout"));
const Loader = lazy(() => import("./components/Loader"));

//pages
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/home" element={<PrivateRoute />}>
              <Route exact path="/home" element={<Home />} />
            </Route>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
