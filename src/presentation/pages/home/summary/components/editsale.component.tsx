import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useSales } from '../../../../../domain/contexts/sales.context';
import { SaleType } from '../../../../../domain/models/types/saleEntity.type';

interface EditSaleDialogProps {
    onClose: () => void;
    saleId: number;
}

const EditSaleDialog: React.FC<EditSaleDialogProps> = ({ onClose, saleId }) => {
    const [sale, setSale] = useState<SaleType | null>(null);
    const [quantity, setQuantity] = useState<string>('0');
    const [debt, setDebt] = useState<string>('0');

    const { salesUseCase } = useSales();

    useEffect(() => {
        const fetchSale = async () => {
            const response = await salesUseCase.GetSale(saleId);
            if (response.body && !response.error) {
                const sale = response.body[0];
                setSale(sale);
                setQuantity(String(sale.quantity));
                setDebt(String(sale.debt));
            }
        }
        fetchSale();
    }, []);

    const handleSave = async () => {
        if (!sale) return;
        const updatedSale: SaleType = {
            id: sale.id,
            quantity: Number(quantity),
            debt: Number(debt),
            p_date: sale.p_date.split('T')[0],
            client_id: sale.client_id,
            product_id: sale.product_id,
            method: sale.method,
        }
        const response = await salesUseCase.UpdateSale(updatedSale);
        !response.error ? onClose() : alert('Error actualizando la venta');
        
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Edit Sale</DialogTitle>
            <DialogContent>
                <TextField
                    label="Cantidad"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Deuda"
                    type="number"
                    value={debt}
                    onChange={(e) => setDebt(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditSaleDialog;