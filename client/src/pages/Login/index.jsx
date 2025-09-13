import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  TextField, 
  Button, 
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import workImage from '../../assets/images/work.png';
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      navigate('/dashboard')
    } else {
      setErrors(newErrors);
    }
  };

  return(
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: 'background.default',
      p: 3,
    }}>
      <Card sx={{ 
        display: 'flex', 
        maxWidth: 900, 
        width: '100%',
        minHeight: '500px',
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          flex: 1,
          p: { xs: 3, md: 5 },
          justifyContent: 'center'
        }}>
          <Box sx={{ mb: 5, textAlign: 'left', maxWidth: 400 }}>
            <Typography variant="h3" component="h1" sx={{ 
              fontWeight: 600, 
              mb: 1,
              color: 'text.primary',
              letterSpacing: '-0.02em',
              fontStyle: 'bold'
            }}>
              Welcome back
            </Typography>
            <Typography variant="body1" sx={{ 
              color: 'text.secondary',
              fontSize: '0.85rem',
            }}>
              Please sign in to your account
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 3 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mb: 4 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mb: 4, 
                py: 2,
                fontSize: '1rem',
                fontWeight: 500,
                borderRadius: 2
              }}
            >
              Sign in
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                
                <Button variant="text" size="small" sx={{ p: 0, minWidth: 'auto' }}>
                 Forgot your password?{' '}
                </Button>
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ 
          width: { md: 400 }, 
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.50',
          position: 'relative'
        }}>
          <CardMedia
            component="img"
            sx={{ 
              width: 'auto',
              height: '50%',
              objectFit: 'contain',
              opacity: 0.8
            }}
            image={workImage}
            alt="Login illustration"
          />
        </Box>
      </Card>
    </Box>
   );
};

export default Login;