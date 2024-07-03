import React from "react";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import "./ProductView.css";
import motor from "./car-engine (2).png";
import accumulator from "./accumulator.png";
import battery from "./battery.png";
import tyre from "./tyre.png";
import frame from "./frame.png";
import hand from "./hand.png";
import mobilesurf from "./mobilesurf.png";
import bikereceive from "./bikereceive.png";
import CallIcon from "@mui/icons-material/Call";
import Footer from "../Footer/Footer";

const ProductView = () => {
  const location = useLocation();
  const product = location.state;

  return (
    <>
      <Header />
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <h1>Product View</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-4"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <img
              src={product.image.url}
              style={{ objectFit: "cover", marginTop: "-160px" }}
            />
            <div
              style={{
                marginTop: "-100px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "#f28123",
                  borderColor: "#f28123",
                  width: "50%",
                  borderRadius: "12px",
                  color: "white",
                  padding: "10px",
                  fontSize: "15px",
                }}
              >
                View Product
              </button>{" "}
              &nbsp;
              <button
                style={{
                  backgroundColor: "#f28123",
                  borderColor: "#f28123",
                  width: "50%",
                  borderRadius: "12px",
                  color: "white",
                  padding: "10px",
                  fontSize: "15px",
                }}
              >
                View Product
              </button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                border: "1px solid rgba(54, 53, 53, 0.2)",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "15px",
              }}
            >
              <div>
                <p style={{ margin: "0px",fontWeight:'600' }}>
                  Any Questions regarding the bike?
                </p>
                <p style={{ margin: "0px" }}>Let us help you</p>
              </div>
              <div
                style={{
                  border: "1px solid rgba(54, 53, 53, 0.2)",
                  borderRadius: "35px",
                  padding: "10px",
                }}
              >
                <CallIcon />
                &nbsp;
                <span style={{ fontSize: "15px", fontWeight: "570" }}>
                  Talk to us
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-8 mt-5">
            <h4>{product.model}</h4>
            <h6>₹ {product.price}</h6>
            <div className="spec">
              <h6
                style={{
                  margin: "15px 0 0 15px",
                }}
              >
                Bike Specifications
              </h6>
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "20px",
                  padding: "15px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Motor</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.motor}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={accumulator} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Battery</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.battery}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Range</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.range}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={tyre} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Tyre</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.tyresize}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={hand} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Brakes</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.brakes}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>
                      Ground Clearance
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.ground}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Payload</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.payload}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={battery} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>
                      Charging Time
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.motor}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={frame} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Frame</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.frame}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="payingmethod mt-4 mb-5">
              <h6
                style={{
                  margin: "15px 0 0 15px",
                }}
              >
                Buy bike in 2 simple steps
              </h6>
              <hr />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    padding: "15px",
                  }}
                >
                  <img
                    src={mobilesurf}
                    style={{ width: "80px", height: "103px", margin: "auto" }}
                  />
                  <p style={{ fontSize: "14px", fontWeight: "600" }}>
                    Find your perfect ride
                  </p>
                  <p style={{ fontSize: "13px" }}>
                    Explore our diverse collection and select the
                    <br /> bike that best matches your needs
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    padding: "15px",
                  }}
                >
                  <img
                    src={bikereceive}
                    style={{ width: "80px", height: "103px", margin: "auto" }}
                  />
                  <p style={{ fontSize: "14px", fontWeight: "600" }}>
                    Complete purchase & get riding
                  </p>
                  <p style={{ fontSize: "13px" }}>
                    3-day money back guarantee & hassle free RC transfer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductView;
