import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '../contexts/AuthContext';

export default function Authentication() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [formState, setFormState] = useState(0); // 0 for login, 1 for register
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      }
      if (formState === 1) {
        let result = await handleRegister(name, password, username);
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
        setName("");
        setUsername("");
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'An error occurred. Please try again.';
      setError(message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuth();
  };

  return (
  <>
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#eef1fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: "1100px",
          borderRadius: 4,
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: 550,
        }}
      >
        {/* LEFT PANEL */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "block" },
            background:
              "linear-gradient(135deg,#e0e7ff 0%,#e0f2fe 50%,#f3e8ff 100%)",
          }}
        >
          <Box
            component="img"
            src="https://media.istockphoto.com/id/1420742727/video/call-center-operator-female-character-animation-hotline-flat-cartoon-design-smiling-office.jpg?s=640x640&k=20&c=5O5WDqeNvIHfreLEU8llCXwZw6p4d-8vcIM1OteTqbE="
            alt="Support"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* RIGHT PANEL */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 3, sm: 6 },
            py: { xs: 4, sm: 6 },
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            {formState === 0
              ? "Welcome to Sync Spase"
              : "Create an Account"}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "#64748b",
            }}
          >
            {formState === 0 ? (
              <>
                Don't have an account?{" "}
                <Link
                  component="button"
                  underline="hover"
                  onClick={() => setFormState(1)}
                >
                  Register Now ↗
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  component="button"
                  underline="hover"
                  onClick={() => setFormState(0)}
                >
                  Sign In
                </Link>
              </>
            )}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 4,
            }}
          >
            {formState === 1 && (
              <TextField
                fullWidth
                label="Name"
                margin="normal"
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <Typography
              sx={{
                mt: formState === 1 ? 2 : 0,
                mb: .5,
                fontWeight: 500,
              }}
            >
              Email
            </Typography>

            <TextField
              fullWidth
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Typography
              sx={{
                mt: 2,
                mb: .5,
                fontWeight: 500,
              }}
            >
              Password
            </Typography>

            <TextField
              fullWidth
              size="small"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {formState === 0 && (
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                

              </Box>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {formState === 0
                ? "Sign In"
                : "Register"}
            </Button>

            {error && (
              <Typography
                color="error"
                align="center"
                sx={{ mt: 2 }}
              >
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity="success"
          onClose={() => setOpen(false)}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  </>
);
}