import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useSales } from '../../../../domain/contexts/sales.context';
import { SaleEntity } from '../../../../data/entities/sale.entity';

const SummaryPage: React.FC = () => {
    const [sales, setSales] = useState<SaleEntity[]>([]);

    const {salesUseCase} = useSales();

    useEffect(() => {
        const fetchSales = async () => {
            const response = await salesUseCase.GetSales();
            response.body ? setSales(response.body) : setSales([]);
        };

        fetchSales();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
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
    );
};

export default SummaryPage;