import React, { useEffect, useState } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import BasicTextField from '../../components/basictextfield.component';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { AuthRepositoryImplementation } from '../../../data/repositories/auth.respository';
import { AuthUseCase } from '../../../domain/useCases/auth.usecase';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../../../domain/contexts/storage.context';
import { StorageType } from '../../../shared/enums/storagetype.enum';

const LoginPage: React.FC = () => {
    
    const authService = new AuthService();
    const authRepositoryImplementation = new AuthRepositoryImplementation(authService);
    const authUseCase = new AuthUseCase(authRepositoryImplementation);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const {storageUseCase} = useStorage();

    useEffect(() => {
        const verifyToken = async () => {
            const token = storageUseCase.getItem({ key: 'token', type: StorageType.LOCAL });
            if (token) {
                const response = await authUseCase.verifyToken(token);
                if (response.error) {
                    storageUseCase.removeItem({ key: 'token', type: StorageType.LOCAL });
                } else {
                    navigate('/homePage');
                }
            }
        }
        verifyToken();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await authUseCase.login({ user: userName, password: password });
        if (response.error) {
            alert('Error al iniciar sesión');
        } else {
            response.body && storageUseCase.setItem({ key: 'token', value: response.body, type: StorageType.LOCAL });
            navigate('/homePage');
        }
    };

    const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

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
                        onChange={handleUserChange}
                    />
                    <BasicTextField
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={password}
                        onChange={handlePasswordChange}
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