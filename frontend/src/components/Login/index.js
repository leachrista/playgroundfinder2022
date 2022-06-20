import { Container, TextField, Paper, Button, Alert } from '@mui/material';
import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    username: yup
        .string('Username eingeben')
        .required('Username wird benötigt'),
    password: yup
        .string('Passwort eingeben')
        .required('Password wird benötigt')
});

export default () => {
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setError('');
            fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(values)
            }).then(response => {
                const jsonResponse = response.json();
                sessionStorage.setItem('token', jsonResponse.token);
                navigate('/');
            })
            .catch(err => {
                setError(err.message);
            });
        },
    });

    return (
        <Container maxWidth="sm">
            <Paper>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Passwort"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button color="primary" variant="contained" type="submit">
                        Anmelden
                    </Button>
                    {error && <Alert severity="error">{error}</Alert>}
                </form>
            </Paper>
        </Container>
    );
};