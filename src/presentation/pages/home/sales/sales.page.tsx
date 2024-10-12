import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, Box, Button, Grid2, CircularProgress } from '@mui/material';
import { useProducts } from '../../../../domain/contexts/products.context';
import { ProductEntity } from '../../../../data/entities/product.entity';
import { PaymentMethod } from '../../../../shared/enums/paymentmethod.enum';
import { useClients } from '../../../../domain/contexts/clients.context';
import { ClientEntity } from '../../../../data/entities/client.entity';
import BasicSelect from '../../../components/basicselect.component';
import CreateProductDialog from './components/createproduct.component';
import { useSales } from '../../../../domain/contexts/sales.context';
import { PostSaleRequestDataType } from '../../../../domain/models/types/saleApiData.type';

const SalesPage: React.FC = () => {

    const { productsUseCase } = useProducts();
    const { clientsUseCase } = useClients();

    const [products, setProducts] = useState<ProductEntity[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

    const [clients, setClients] = useState<ClientEntity[]>([]);
    const [selectedClient, setSelectedClient] = useState<ClientEntity | null>(null);

    const [quantity, setQuantity] = useState<string>('');

    const [selectedMethod, setSelectedMethod] = useState<string>('');

    const [debt, setDebt] = useState<string>('0');

    const [open, setOpen] = useState(false);

    const {salesUseCase} = useSales();

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!selectedClient || !selectedProduct || !quantity || !selectedMethod || !debt) {
            alert('Todos los campos son obligatorios');
            return;
        }
        setLoading(true);
        const sale: PostSaleRequestDataType = {
            id: 0,
            p_date: new Date().toISOString().split('T')[0],
            client_id: selectedClient.id,
            product_id: parseInt(selectedProduct),
            quantity: parseInt(quantity),
            method: selectedMethod,
            debt: parseFloat(debt)
        };
        const response = await salesUseCase.PostSale(sale);
        setLoading(false);
        response.error ? alert('Error al guardar la venta') : restoreState();

    };

    const restoreState = () => {
        setSelectedClient(null);
        setSelectedProduct(null);
        setQuantity('');
        setSelectedMethod('');
        setDebt('0');
    }

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
                            type='search'
                        />}
                    />
            <Grid2 container alignItems="center">
                <Grid2 size={8}>
                    <BasicSelect
                        items={products.map(product => ({ key: product.id, value: product.id, name: product.name }))}
                        value={selectedProduct ?? ''}
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
                    { key: PaymentMethod.CASH, value: PaymentMethod.CASH, name: 'Efectivo' },
                    { key: PaymentMethod.CREDIT, value: PaymentMethod.CREDIT, name: 'Fiado' },
                    { key: PaymentMethod.TRANSFER, value: PaymentMethod.TRANSFER, name: 'App-Transferencia' }
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

           {loading ? <CircularProgress/> : <Button variant="contained" color="primary" onClick={handleSave}>
                Guardar
            </Button>}
            <CreateProductDialog open={open} onClose={handleChangeDialogStatus} onSave={handleSaveProduct} />
        </Box>
    );
};

export default SalesPage;