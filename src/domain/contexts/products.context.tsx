import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { ProductsService } from '../../infrastructure/services/products.service';
import { ProductsRepositoryImplementation } from '../../data/repositories/products.repository';
import { ProductsUseCase } from '../useCases/products.usecase';

interface ProductsContextProps {
    productsService: ProductsService;
    productsRepositoryImplementation: ProductsRepositoryImplementation;
    productsUseCase: ProductsUseCase;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const productsService = useMemo(() => new ProductsService(), []);
    const productsRepositoryImplementation = useMemo(() => new ProductsRepositoryImplementation(productsService), [productsService]);
    const productsUseCase = useMemo(() => new ProductsUseCase(productsRepositoryImplementation), [productsRepositoryImplementation]);

    return (
        <ProductsContext.Provider value={{ productsService, productsRepositoryImplementation, productsUseCase }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = (): ProductsContextProps => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useStorage must be used within a ProductsProvider');
    }
    return context;
};