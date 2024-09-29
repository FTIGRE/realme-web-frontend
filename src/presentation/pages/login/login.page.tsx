import React, { useState } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import BasicTextField from '../../components/basictextfield.component';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { AuthRepositoryImplementation } from '../../../data/repositories/auth.respository';
import { AuthUserCase } from '../../../domain/userCases/auth.usercase';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    
    const authService = new AuthService();
    const authRepositoryImplementation = new AuthRepositoryImplementation(authService);
    const authUserCase = new AuthUserCase(authRepositoryImplementation);
    
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await authUserCase.login({ user: userName, password: password });
        if (response.error) {
            alert('Error al iniciar sesión');
        } else {
            navigate('/homePage');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Ingreso
                </Typography>
                <Box component="form" onSubmit={handleLogin} width="100%">
                    <BasicTextField
                        label="Usuario"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <BasicTextField
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        sx={{ mt: 2 }}
                    >
                        Ingresar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;