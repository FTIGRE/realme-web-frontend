import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { SellsService } from '../../infrastructure/services/sells.service';
import { SellsRepositoryImplementation } from '../../data/repositories/sells.repository';
import { SellsUseCase } from '../useCases/sell.usecase';

interface SellsContextProps {
    sellsService: SellsService;
    sellsRepositoryImplementation: SellsRepositoryImplementation;
    sellsUseCase: SellsUseCase;
}

const SellsContext = createContext<SellsContextProps | undefined>(undefined);

export const SellsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const sellsService = useMemo(() => new SellsService(), []);
    const sellsRepositoryImplementation = useMemo(() => new SellsRepositoryImplementation(sellsService), [sellsService]);
    const sellsUseCase = useMemo(() => new SellsUseCase(sellsRepositoryImplementation), [sellsRepositoryImplementation]);

    return (
        <SellsContext.Provider value={{ sellsService, sellsRepositoryImplementation, sellsUseCase }}>
            {children}
        </SellsContext.Provider>
    );
};

export const useSells = (): SellsContextProps => {
    const context = useContext(SellsContext);
    if (!context) {
        throw new Error('useSells must be used within a SellsProvider');
    }
    return context;
};