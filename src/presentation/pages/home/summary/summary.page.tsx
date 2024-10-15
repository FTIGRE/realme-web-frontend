import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useSales } from '../../../../domain/contexts/sales.context';
import { SaleEntity } from '../../../../data/entities/sale.entity';
import EditSaleDialog from './components/editsale.component';
import { SaleType } from '../../../../domain/models/types/saleEntity.type';

const SummaryPage: React.FC = () => {
    const [sales, setSales] = useState<SaleEntity[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [selectedSale, setSelectedSale] = useState<SaleEntity | null>(null);

    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

    const handleOpenEditDialog = (sale: SaleEntity) => {
        setSelectedSale(sale);
        setOpenEditDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenEditDialog(false);
        setSelectedSale(null);
    }

    const {salesUseCase} = useSales();

    useEffect(() => {
        const fetchSales = async () => {
            const response = await salesUseCase.GetSales(selectedDate);
            response.body && !response.error ? setSales(response.body) : setSales([]);
        };

        fetchSales();
    }, [selectedDate]);// eslint-disable-line react-hooks/exhaustive-deps

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    return (
        <Box>
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <TextField
                    label="Seleccionar Fecha"
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre del Cliente</TableCell>
                            <TableCell>Nombre del Producto</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Método de Pago</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Deuda</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sales.map((sale, index) => (
                            <TableRow key={index}>
                                <TableCell>{sale.client_name}</TableCell>
                                <TableCell>{sale.product_name}</TableCell>
                                <TableCell>{sale.quantity}</TableCell>
                                <TableCell>{sale.method}</TableCell>
                                <TableCell>{sale.total}</TableCell>
                                <TableCell>{sale.debt}</TableCell>
                                <TableCell>
                                    <IconButton onClick={()=>handleOpenEditDialog({
                                        id: sale.id,
                                        client_name: sale.client_name,
                                        product_name: sale.product_name,
                                        quantity: sale.quantity,
                                        method: sale.method,
                                        total: sale.total,
                                        debt: sale.debt
                                    })} >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openEditDialog && selectedSale && <EditSaleDialog onClose={handleCloseDialog} saleId={selectedSale.id} />}
        </Box>
    );
};

export default SummaryPage;