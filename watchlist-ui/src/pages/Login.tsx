import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useUser } from "../contexts";
import { useUserService } from "../services";
import axios from "axios";

interface SignInState {
    email: string,
    password: string,
}

const Login: React.FC = () => {
    const initialState: SignInState = {
        email: '',
        password: '',
    }
    const navigate = useNavigate();
    const { login, googleSignIn } = useUser();
    const { isLoggedIn } = useUserService();

    const [formData, setFormData] = useState(initialState);
    const [formErrors, setErrors] = useState(initialState);
    const [profile, setProfile] = useState<any>();
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    useEffect(() => {
        const errorsEmpty = Object.values(formErrors).every(value => value === '');
        if (!errorsEmpty) {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }, [formErrors])

    useEffect(() => {
        if (isLoggedIn || profile?.id) {
            navigate('/home')
        }
    }, [isLoggedIn, profile?.id])


    const handleChange = (event: any) => {
        event.preventDefault();
        const regex = RegExp(/^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/i);
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        switch (name) {
            case 'email':
                formErrors.email = regex.test(value) ? '' : 'Invalid email address!';
                break;
            case 'password':
                formErrors.password = value.length < 8 ? 'Password must be 8 characters long!' : '';
                break;
            default:
                break;
        }
        setErrors({ ...formErrors });
    }

    const handleLogin = () => {
        const filledFields = Object.values(formData).every(value => Boolean(value))
        if (filledFields) {
            login(formData);
        }
    };

    const signIn = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
                    headers: {
                        Authorization: `Bearer ${response?.access_token}`,
                    },
                });
                setProfile(res.data)
                googleSignIn(res.data);
            } catch (error) {
                console.log(error)
            }
        },
        onError: (error) => {
            console.error('Login Failed:', error);
        },
    });

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    mt: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">Sign In</Typography>
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={formErrors.email.length > 0}
                                helperText={formErrors.email.length > 0 ? formErrors.email : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={formErrors.password.length > 0}
                                helperText={formErrors.password.length > 0 ? formErrors.password : ''}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                        disabled={buttonDisabled}
                    >
                        Login
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item sm={12}>
                            <Link to="/register">Don't have an account? Register</Link>
                        </Grid>
                        <Grid item my={2}>
                            <Button onClick={() => signIn()}>Sign in with Google</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;