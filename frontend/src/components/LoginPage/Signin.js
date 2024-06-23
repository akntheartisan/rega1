import React, { useState, useContext } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, InputAdornment } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PasswordIcon from "@mui/icons-material/Password";
import { client } from "../Client/Client";
import { UserContext } from "../../App";

const Signin = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  async function verify() {
    const credential = { username, password };
    try {
      const response = await client.post("/user/signin", credential, {
        withCredentials: true,
      });
      console.log(response.status);
     

      if (response.status === 200) {
        toast.success("Logged In");
        setUserName("");
        setPassword("");
        getUserData();
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  }

  const getUserData = async (req, res, next) => {
    try {
      const response = await client.get("/user/protect", {
        withCredentials: true,
      });
      const user = response.data.user;
      if (response.status === 200) {
        setUserData(user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <>
        <Stack direction="column" spacing={4} sx={{ color: "white" }}>
          <TextField
            label="Username"
            name="username"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color when focused
                },
              },
            }}
            // helperText={errors.name}
            // error={!!errors.name}
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircleIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />

          <TextField
            label="Password"
            name="password"
            size="small"
            type={checked ? "text" : "password"}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color when focused
                },
              },
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PasswordIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />
        </Stack>

        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              size="small"
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
          }
          label="Show Password"
          sx={{ color: "white", marginTop: "20px" }}
        />

        <Stack>
          <button
            type="button"
            class="btn"
            onClick={verify}
            style={{ color: "white", backgroundColor: "#f28123" }}
          >
            LogIn
          </button>
        </Stack>
        <Stack>
          <Button
            sx={{
              margin: "20px 0 0px 0",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            Forget Password?
          </Button>
        </Stack>
      </>
    </div>
  );
};

export default Signin;
