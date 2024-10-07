import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid2, Paper, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useClients } from '../../../../domain/contexts/clients.context';
import { ClientEntity } from '../../../../data/entities/client.entity';
import { Add, CheckCircle } from '@mui/icons-material';
import CreateClientDialog from './components/createclient.component';
import MembershipDialog from './components/membership.component';
import { MembershipsService } from '../../../../infrastructure/services/memberships.service';
import { MembershipsRepositoryImplementation } from '../../../../data/repositories/memberships.repository';
import { MembershipsUseCase } from '../../../../domain/useCases/memberships.usecase';
import { MembershipEntity } from '../../../../data/entities/membership.entity';
import BasicSelect from '../../../components/basicselect.component';

const ClientsPage: React.FC = () => {

    const membershipsService = new MembershipsService();
    const membershipsRepositoryImplementation = new MembershipsRepositoryImplementation(membershipsService);
    const membershipsUseCase = new MembershipsUseCase(membershipsRepositoryImplementation);

    const {clientsUseCase} = useClients();
    const [clients, setClients] = useState<ClientEntity[]>([]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openMembershipDialog, setOpenMembershipDialog] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientEntity | null>(null);
    const [filter, setFilter] = useState<string>('0');

    const filterOptions = [
        { key: 'Todos', value: '0', name: 'Todos' },
        { key: 'Activos', value: '1', name: 'Activos' },
        { key: 'Vencidos', value: '2', name: 'Vencidos' }
    ];

    useEffect(() => {
        const fetchClientsData = async () => {
            const data = await clientsUseCase.GetClients();
            !data.error && data.body && setClients(data.body);
        };
        fetchClientsData();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleChangeCreateDialogStatus = () => setOpenCreateDialog(!openCreateDialog);

    const handleSaveClient = async (client: ClientEntity) => {
        const result = await clientsUseCase.CreateClient(client);
        result.error && alert('Error al resgistrar el cliente');
    };

    const handleOpenMembershipDialog = (client: ClientEntity) => {
        setSelectedClient(client);
        setOpenMembershipDialog(true);
    };

    const handleCloseMembershipDialog = () => {
        setSelectedClient(null);
        setOpenMembershipDialog(false);
    };

    const handleSaveMembership = async (membership: MembershipEntity) => {
        const result = await membershipsUseCase.createMembership(membership);
        result.error && alert('Error al resgistrar la membresía');
    };

    const validateMembershipStatus = async (clientId: number): Promise<boolean> => {
        const request = {
            column: 'client_id',
            value: `${clientId}`
        };
        const data = await membershipsUseCase.getMembership(request);
        const validator = !data.error && data.body && data.body.state === 'active';
        return validator ?? false;
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
                    <IconButton color="primary" onClick={handleChangeCreateDialogStatus}>
                        <Add />
                    </IconButton>
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
                            <Typography>{client.ic}</Typography>
                            <Box style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                                <IconButton color="primary">
                                    <EditIcon />
                                </IconButton>
                                    <IconButton color="success" onClick={() => handleOpenMembershipDialog(client)}>
                                        <CheckCircle />
                                    </IconButton>
                            </Box>
                        </Paper>
                    </Grid2>
                ))}
            </Grid2>
            {openCreateDialog && <CreateClientDialog onClose={handleChangeCreateDialogStatus} onSave={handleSaveClient} />
}
            {selectedClient && openMembershipDialog &&  (
                <MembershipDialog
                    client={selectedClient}
                    onCloseDialog={handleCloseMembershipDialog}
                    onSaveMembership={handleSaveMembership}
                />
            )}
        </Container>
    );
};

export default ClientsPage;