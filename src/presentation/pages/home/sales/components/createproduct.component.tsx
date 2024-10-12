import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { ProductEntity } from '../../../../../data/entities/product.entity';

interface CreateProductDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (product: ProductEntity) => void;
}

const CreateProductDialog: React.FC<CreateProductDialogProps> = ({ open, onClose, onSave }) => {
    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<string | null>(null);
    const [nameError, setNameError] = useState<boolean>(false);
    const [priceError, setPriceError] = useState<boolean>(false);

    const handleSave = () => {
        name ? setNameError(false) : setNameError(true)
        price ? setPriceError(false) : setPriceError(true)
        if (name && price) {
            const product = new ProductEntity({ id: 0, name, description, price: parseFloat(price) });
            onSave(product);
            handleClose();
        }
        
    };

    const handleClose = () => {
        setName(null); setDescription(''); setPrice(null);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Product</DialogTitle>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <DialogContent>
                    <TextField
                        error={nameError}
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        error={priceError}
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <Button type="submit" color="primary" disabled={!name || !description || !price}></Button>
                    </Button>
                    <Button type="submit" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateProductDialog;