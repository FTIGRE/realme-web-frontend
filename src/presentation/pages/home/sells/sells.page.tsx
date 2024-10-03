import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, Select, MenuItem, FormControl, InputLabel, Box, Button } from '@mui/material';
import { useProducts } from '../../../../domain/contexts/products.context';
import { ProductEntity } from '../../../../data/entities/product.entity';
import { PaymentMethod } from '../../../../shared/enums/paymentmethod.enum';
import { useClients } from '../../../../domain/contexts/clients.context';
import { ClientEntity } from '../../../../data/entities/client.entity';

const SellsPage: React.FC = () => {

    const { productsUseCase } = useProducts();
    const { clientsUseCase } = useClients();

    const [products, setProducts] = useState<ProductEntity[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string>('');

    const [clients, setClients] = useState<ClientEntity[]>([]);
    const [selectedClient, setSelectedClient] = useState<ClientEntity | null>(null);

    const [quantity, setQuantity] = useState<number | string>('');

    const [selectedMethod, setSelectedMethod] = useState<string>('');

    const [debt, setDebt] = useState<number | string>('');

    const handleSave = () => {
        console.log({
            selectedProduct,
            selectedClient,
            quantity,
            selectedMethod,
            debt
        });
    };

    const handleSelectClient = (event: React.SyntheticEvent<Element, Event>, value: ClientEntity | null) => {
        setSelectedClient(value);
    }

    const handleSearchClient = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        const value = (event.target as HTMLInputElement).value;
        const data = await clientsUseCase.SearchClients({ column: 'name', value: value });
        !data.error && data.body && setClients(data.body);
    }

    useEffect(() => {
        const fetchProductsData = async () => {
            const data = await productsUseCase.GetProducts();
            !data.error && data.body && setProducts(data.body);
        };

        fetchProductsData();

    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Autocomplete
                value={selectedClient}
                onChange={handleSelectClient}
                getOptionLabel={(option) => option.name}
                options={clients}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                )}
                renderInput={(params) => <TextField
                    {...params}
                    onKeyDown={handleSearchClient}
                    label="Cliente"
                />}
            />
            <FormControl variant="outlined" >
                <InputLabel id="select-label">Producto</InputLabel>
                <Select
                    labelId="select-label"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    label="Producto"
                >
                    {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                            {product.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Cantidad"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <FormControl variant='outlined'>
                <InputLabel id="select-label">Metodo de pago</InputLabel>
                <Select
                    labelId="select-label"
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    label="Metodo de pago"
                >
                    <MenuItem value={PaymentMethod.CASH}>{PaymentMethod.CASH}</MenuItem>
                    <MenuItem value={PaymentMethod.CREDIT}>{PaymentMethod.CREDIT}</MenuItem>
                    <MenuItem value={PaymentMethod.TRANSFER}>{PaymentMethod.TRANSFER}</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Deuda"
                type="number"
                value={debt}
                onChange={(e) => setDebt(e.target.value)}
            />

            <Button variant="contained" color="primary" onClick={handleSave}>
                Guardar
            </Button>
        </Box>
    );
};

export default SellsPage;