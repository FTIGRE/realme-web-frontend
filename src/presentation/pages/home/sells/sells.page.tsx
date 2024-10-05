import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, Box, Button, Grid2 } from '@mui/material';
import { useProducts } from '../../../../domain/contexts/products.context';
import { ProductEntity } from '../../../../data/entities/product.entity';
import { PaymentMethod } from '../../../../shared/enums/paymentmethod.enum';
import { useClients } from '../../../../domain/contexts/clients.context';
import { ClientEntity } from '../../../../data/entities/client.entity';
import BasicSelect from '../../../components/basicselect.component';
import CreateProductDialog from './components/createproduct.component';

const SellsPage: React.FC = () => {

    const { productsUseCase } = useProducts();
    const { clientsUseCase } = useClients();

    const [products, setProducts] = useState<ProductEntity[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string>('');

    const [clients, setClients] = useState<ClientEntity[]>([]);
    const [selectedClient, setSelectedClient] = useState<ClientEntity | null>(null);

    const [quantity, setQuantity] = useState<string>('');

    const [selectedMethod, setSelectedMethod] = useState<string>('');

    const [debt, setDebt] = useState<string>('');

    const [open, setOpen] = useState(false);

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

    const handleChangeDialogStatus = () => setOpen(!open)

    const handleSaveProduct = async (product: ProductEntity) => {
        const result = await productsUseCase.CreateProduct(product);
        result.error && alert('Error al guardar el producto');
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
            <Grid2 container alignItems="center">
                <Grid2 size={8}>
                    <BasicSelect
                        items={products.map(product => ({ key: product.id, value: product.id, name: product.name }))}
                        value={selectedProduct}
                        onItemChange={setSelectedProduct}
                        label="Producto"
                    />
                </Grid2>
                <Grid2 size={2}>
                    <Button onClick={handleChangeDialogStatus}>
                        Crear
                    </Button>
                </Grid2>

            </Grid2>
            <TextField
                label="Cantidad"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <BasicSelect
                items={[
                    { key: PaymentMethod.CASH, value: PaymentMethod.CASH, name: PaymentMethod.CASH },
                    { key: PaymentMethod.CREDIT, value: PaymentMethod.CREDIT, name: PaymentMethod.CREDIT },
                    { key: PaymentMethod.TRANSFER, value: PaymentMethod.TRANSFER, name: PaymentMethod.TRANSFER }
                ]}
                value={selectedMethod}
                onItemChange={setSelectedMethod}
                label="Metodo de pago"
            />
            <TextField
                label="Deuda"
                type="number"
                value={debt}
                onChange={(e) => setDebt(e.target.value)}
            />

            <Button variant="contained" color="primary" onClick={handleSave}>
                Guardar
            </Button>
            <CreateProductDialog open={open} onClose={handleChangeDialogStatus} onSave={handleSaveProduct} />
        </Box>
    );
};

export default SellsPage;