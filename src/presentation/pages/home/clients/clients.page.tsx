import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid2, Paper, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useClients } from '../../../../domain/contexts/clients.context';
import { ClientEntity } from '../../../../data/entities/client.entity';
import { Add, CheckCircle } from '@mui/icons-material';
import CreateClientDialog from './components/createclient.component';

const ClientsPage: React.FC = () => {

    const {clientsUseCase} = useClients();
    const [clients, setClients] = useState<ClientEntity[]>([]);

    const [open, setOpen] = useState(false);

useEffect(() => {
    const fetchClientsData = async () => {
        const data = await clientsUseCase.GetClients();
        !data.error && data.body && setClients(data.body);
    };
    fetchClientsData();
}, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleChangeDialogStatus = () => setOpen(!open)

    const handleSaveClient = async (client: ClientEntity) => {
        const result = await clientsUseCase.CreateClient(client);
        result.error && alert('Error al resgistrar el cliente');
    }

    return (
        <Container>
            <Grid2 container spacing={2} style={{ marginBottom: '16px' }} justifyContent="space-between">
                <Grid2>
                    <Typography variant="h4" gutterBottom>
                        Clientes
                    </Typography>
                </Grid2>
                <Grid2>
                    <IconButton color="primary" onClick={handleChangeDialogStatus}>
                        <Add />
                    </IconButton>
                </Grid2>
            </Grid2>
            <Grid2 container spacing={3}>
                {clients.map(client => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={client.id}>
                        <Paper elevation={3} style={{ padding: '16px' }}>
                            <Typography variant="h6">{client.name}</Typography>
                            <Typography>{client.ic}</Typography>
                            <Box style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                                <IconButton color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="success">
                                    <CheckCircle />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Grid2>
                ))}
            </Grid2>
            <CreateClientDialog open={open} onClose={handleChangeDialogStatus}
            onSave={handleSaveClient} />
        </Container>
    );
};

export default ClientsPage;