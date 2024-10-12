import React, { useState } from 'react';
import { Box, Button, Drawer, List, ListItem } from '@mui/material';
import { Pages } from '../../../../shared/enums/pages.enum';
import RoutinesPage from '../routines/routines.page';
import ClientsPage from '../clients/clients.page';
import SalesPage from '../sales/sales.page';
import SummaryPage from '../summary/summary.page';
import './layout.scss';
import { useStorage } from '../../../../domain/contexts/storage.context';
import { StorageType } from '../../../../shared/enums/storagetype.enum';
import { useNavigate } from 'react-router-dom';

const Layout: React.FC = () => {

    const navigate = useNavigate();

    const [actualPage, setActualPage] = useState<Pages>(Pages.ROUTINES);

    const { storageUseCase } = useStorage();

    const handleChangePage = (page: Pages) => setActualPage(page);

    const handleLogout = () => {
        storageUseCase.removeItem({ key: 'token', type: StorageType.LOCAL });
        navigate('/login');
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                className='drawer-styled'
            >
                <List>
                    <ListItem>
                        <Button onClick={() => handleChangePage(Pages.ROUTINES)}>Rutinas</Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={() => handleChangePage(Pages.CLIENTS)}>Clientes</Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={() => handleChangePage(Pages.SELL)}>Vender</Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={() => handleChangePage(Pages.SUMMARY)}>Resumen</Button>
                    </ListItem>
                </List>
                <ListItem sx={{ marginTop: 'auto' }}>
                    <Button onClick={handleLogout}>Salir</Button>
                </ListItem>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {(() => {
                    switch (actualPage) {
                        case Pages.ROUTINES:
                            return <RoutinesPage />;
                        case Pages.CLIENTS:
                            return <ClientsPage />;
                        case Pages.SELL:
                            return <SalesPage />;
                        case Pages.SUMMARY:
                            return <SummaryPage />;
                        default:
                            return <RoutinesPage />;
                    }
                })()}
            </Box>
        </Box>
    );
};

export default Layout;
