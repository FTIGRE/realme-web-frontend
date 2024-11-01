import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid2, Paper, Box, IconButton } from '@mui/material';
import { useClients } from '../../../../domain/contexts/clients.context';
import { ClientEntity } from '../../../../data/entities/client.entity';
import BasicSelect from '../../../components/basicselect.component';

const DebtorsPage: React.FC = () => {
    const { clientsUseCase } = useClients();
    const [clients, setClients] = useState<any[]>([]);
    const [filter, setFilter] = useState<string>('0');

    const filterOptions = [
        { key: 'Todos', value: '0', name: 'Todos' },
        { key: 'Con Deuda', value: '1', name: 'Con Deuda' },
        { key: 'Sin Deuda', value: '2', name: 'Sin Deuda' }
    ];

    useEffect(() => {
        const fetchClientsData = async () => {
        };
        fetchClientsData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            <Grid2 container spacing={2} style={{ marginBottom: '16px' }} justifyContent="space-between">
                <Grid2>
                    <Typography variant="h4" gutterBottom>
                        Deudores
                    </Typography>
                </Grid2>
                <Grid2>
                    <BasicSelect
                        items={filterOptions}
                        value={filter}
                        onItemChange={setFilter}
                        label={'Filtro'}
                    />
                </Grid2>
            </Grid2>
            <Grid2 container spacing={3}>
                {clients.map(client => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={client.id}>
                        <Paper elevation={3} style={{ padding: '16px' }}>
                            <Typography variant="h6">{client.name}</Typography>
                            <Typography>Deuda: {client.debt}</Typography>
                        </Paper>
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
};

export default DebtorsPage;