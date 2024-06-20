import React, { useState } from "react";
import { client } from "../../../Client/Clientaxios";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProductTable from "./ProductTable";
import { toast } from "react-hot-toast";

const initial = {
  model: "",
  motor: "",
  battery: "",
  range: "",
  tyresize: "",
  brakes: "",
  ground: "",
  payload: "",
  charging: "",
  frame: "",
};

const Product = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("768px"));
  const [product, setProduct] = useState(initial);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    const fields = [
      "model",
      "motor",
      "battery",
      "range",
      "tyresize",
      "brakes",
      "ground",
      "payload",
      "charging",
      "frame",
    ];

    fields.forEach((field) => {
      if (!product[field]) {
        newErrors[field] = `Please fill the ${field}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("image", image);
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    try {
      const response = await client.post("/project/productadd", formData);
      if (response.status === 200) {
        toast.success("New Product Added Successfully");
        setProduct(initial);
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <Box
        component="form"
        sx={{
          width: "100%",
          maxWidth: "600px",
          margin: "10px auto",
          padding: "20px",
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
        onSubmit={submit}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", margin: "0px 0px 13px 0px" }}
        >
          Product Entry Form
        </Typography>
        <Stack spacing={2}>
          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              onChange={handleFileChange}
              name="image"
              type="file"
              accept="image/*"
            />
            <TextField
              fullWidth
              label="Model"
              variant="outlined"
              size="small"
              value={product.model}
              error={!!errors.model}
              onChange={handleChange}
              name="model"
              helperText={errors.model}
            />
            <TextField
              fullWidth
              label="Motor"
              variant="outlined"
              size="small"
              value={product.motor}
              error={!!errors.motor}
              onChange={handleChange}
              name="motor"
              helperText={errors.motor}
            />
          </Stack>
          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              label="Battery"
              variant="outlined"
              size="small"
              value={product.battery}
              onChange={handleChange}
              name="battery"
              helperText={errors.battery}
              error={!!errors.battery}
            />
            <TextField
              fullWidth
              label="Range"
              variant="outlined"
              size="small"
              value={product.range}
              onChange={handleChange}
              name="range"
              helperText={errors.range}
              error={!!errors.range}
            />
          </Stack>
          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              label="Tyre Size and Type"
              variant="outlined"
              size="small"
              value={product.tyresize}
              onChange={handleChange}
              name="tyresize"
              helperText={errors.tyresize}
              error={!!errors.tyresize}
            />
            <TextField
              fullWidth
              label="Brakes"
              variant="outlined"
              size="small"
              value={product.brakes}
              onChange={handleChange}
              name="brakes"
              helperText={errors.brakes}
              error={!!errors.brakes}
            />
          </Stack>
          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              label="Ground Clearance"
              variant="outlined"
              size="small"
              value={product.ground}
              onChange={handleChange}
              name="ground"
              helperText={errors.ground}
              error={!!errors.ground}
            />
            <TextField
              fullWidth
              label="Payload"
              variant="outlined"
              size="small"
              value={product.payload}
              onChange={handleChange}
              name="payload"
              helperText={errors.payload}
              error={!!errors.payload}
            />
          </Stack>
          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              label="Charging Time"
              variant="outlined"
              size="small"
              value={product.charging}
              onChange={handleChange}
              name="charging"
              helperText={errors.charging}
              error={!!errors.charging}
            />
            <TextField
              fullWidth
              label="Frame"
              variant="outlined"
              size="small"
              value={product.frame}
              onChange={handleChange}
              name="frame"
              helperText={errors.frame}
              error={!!errors.frame}
            />
          </Stack>
          <Stack direction={"row"} spacing={2} justifyContent={"center"}>
            <Button variant="contained" color="warning">
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ marginTop: "35px", marginBottom: "35px", padding: "15px" }}>
        <ProductTable product={product} setProduct={setProduct}/>
      </Box>
    </>
  );
};

export default Product;
