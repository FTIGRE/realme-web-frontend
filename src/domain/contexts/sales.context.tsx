import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { SalesService } from '../../infrastructure/services/sales.service';
import { SalesRepositoryImplementation } from '../../data/repositories/sales.repository';
import { SalesUseCase } from '../useCases/sale.usecase';

interface SalesContextProps {
    salesService: SalesService;
    salesRepositoryImplementation: SalesRepositoryImplementation;
    salesUseCase: SalesUseCase;
}

const SalesContext = createContext<SalesContextProps | undefined>(undefined);

export const SalesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const salesService = useMemo(() => new SalesService(), []);
    const salesRepositoryImplementation = useMemo(() => new SalesRepositoryImplementation(salesService), [salesService]);
    const salesUseCase = useMemo(() => new SalesUseCase(salesRepositoryImplementation), [salesRepositoryImplementation]);

    return (
        <SalesContext.Provider value={{ salesService, salesRepositoryImplementation, salesUseCase }}>
            {children}
        </SalesContext.Provider>
    );
};

export const useSales = (): SalesContextProps => {
    const context = useContext(SalesContext);
    if (!context) {
        throw new Error('useSales must be used within a SalesProvider');
    }
    return context;
};