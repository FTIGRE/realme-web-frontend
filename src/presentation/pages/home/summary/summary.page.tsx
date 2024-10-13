import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useSales } from '../../../../domain/contexts/sales.context';
import { SaleEntity } from '../../../../data/entities/sale.entity';

const SummaryPage: React.FC = () => {
    const [sales, setSales] = useState<SaleEntity[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

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
        // Aquí puedes agregar lógica para filtrar las ventas por fecha
    };

    return (
        <Box>
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <TextField
                    label="Seleccionar Fecha"
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    InputLabelProps={{
                        shrink: true,
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
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SummaryPage;