import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts";
import styles from '../styles/style.module.css';

interface SignUpState {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

const Register: React.FC = () => {
    const initialState: SignUpState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }
    const navigate = useNavigate();
    const { register, state } = useUser();

    const regex = RegExp(/^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/i);
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setErrors] = useState(initialState);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    useEffect(() => {
        const { loading, user } = state;
        if (user?._id && !loading) {
            navigate('/login')
        }
    }, [state])

    useEffect(() => {
        const errors = Object.values(formErrors).every(value => value === '');
        if (!errors) {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }, [formErrors])


    const handleChange = (event: any) => {
        event.preventDefault();

        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        switch (name) {
            case 'firstName':
                formErrors.firstName = !value.length ? 'Fist Name should not be empty!' : '';
                break;
            case 'lastName':
                formErrors.lastName = !value.length ? 'Last Name should not be empty!' : '';
                break;
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

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const allFieldsFilled = Object.values(formData).every(value => Boolean(value))
        if (allFieldsFilled) {
            register(formData);
        }
    }

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <Box className={styles.form} >
                <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">Sign Up</Typography>
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                error={formErrors.firstName.length > 0}
                                helperText={formErrors.firstName.length > 0 ? formErrors.firstName : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="lastName"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                error={formErrors.lastName.length > 0}
                                helperText={formErrors.lastName.length > 0 ? formErrors.lastName : ''}
                            />
                        </Grid>
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
                        onClick={handleSubmit}
                        disabled={buttonDisabled}
                    >
                        Register
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login">Already have an account? Login</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;