import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { client } from "../../Client/Client";
import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../../Cart/Cart";
import "./product.css";

const Product = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  console.log(product.productData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get("/project/getproduct");
        console.log(response.data.data);
        const productData = response.data.data;
        if (product) {
          setProduct((prev) => ({ ...prev, productData }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(product.productData);

  return (
    <>
      <div className="container" style={{ padding: "20px" }}>
        <div className="row">
          <div className="section-title col-md-12">
            <h3 style={{ textAlign: "center" }}>
              <span className="orange-text">Our</span> Products
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
              fuga quas itaque eveniet beatae option.
            </p>
          </div>

          {product.productData &&
            product.productData.map((each) => {
              console.log(each.SubModel);
              return (
                <div
                  className="col-md-4 productshow"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  key={each._id}
                  onClick={() => navigate(`/productview`, { state: each })}
                >
                  <Box
                    sx={{
                      "& > :not(style)": {
                        m: 1,
                        width: 300,
                        height: 425,
                      },
                    }}
                  >
                    <Paper
                      elevation={5}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0 0px 30px 0px",
                        // border:"1px outset orange"
                      }}
                    >
                      <div style={{ backgroundColor: "#f0f0f0" }}>
                        <img
                          src={each.image.url}
                          style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            marginTop: "-25px",
                          }}
                        />
                      </div>

                      <div style={{ padding: "10px" }}>
                        <p
                          style={{
                            fontSize: "17px",
                            color: "#cccccc",
                            margin: "0px 0px 0px 0px",
                          }}
                        >
                          {each.model}
                        </p>
                        <p
                          style={{
                            fontSize: "19px",
                            color: "#3c3c3c",
                            fontWeight: "550",
                            margin: "0px 0px 0px 0px",
                          }}
                        >
                          {each.model}
                        </p>
                        <span style={{ color: "#616161" }}>
                          {each.SubModel[0].battery}
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <span style={{ color: "#616161" }}>
                          {each.SubModel[0].motor}
                        </span>
                        <br />
                        <span style={{ color: "#616161" }}>
                          {each.SubModel[0].range}
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <span style={{ color: "#616161" }}>
                          {each.SubModel[0].payload}
                        </span>
                        <hr />
                        <span
                          style={{
                            fontSize: "18px",
                            color: "#fbb72c",
                            fontWeight: "600",
                          }}
                        >
                          ₹ {each.SubModel[0].price}
                        </span>
                        {/* <div style={{ display: "flex" }}>
                          <button
                            onClick={() =>
                              navigate(`/productview`, { state: each })
                            }
                            style={{
                              backgroundColor: "#f28123",
                              borderColor: "#f28123",
                              width: "100%",
                              borderRadius: "8px",
                              color: "white",
                              padding: "10px",
                              fontSize: "15px",
                            }}
                          >
                            View Product
                          </button>
                        </div> */}
                      </div>
                    </Paper>
                  </Box>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Product;
