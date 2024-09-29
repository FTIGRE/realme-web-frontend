import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/login');
    };

    return (
        <Container>
            <Typography variant="h1" component="h2" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" component="h3" gutterBottom>
                Page Not Found
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoHome}>
                Go to login
            </Button>
        </Container>
    );
};

export default NotFoundPage;