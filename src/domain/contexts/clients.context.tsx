import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { ClientsService } from '../../infrastructure/services/clients.service';
import { ClientsRepositoryImplementation } from '../../data/repositories/clients.repository';
import { ClientsUseCase } from '../useCases/clients.usecase';

interface ClientsContextProps {
    clientsService: ClientsService;
    clientsRepositoryImplementation: ClientsRepositoryImplementation;
    clientsUseCase: ClientsUseCase;
}

const ClientsContext = createContext<ClientsContextProps | undefined>(undefined);

export const ClientsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const clientsService = useMemo(() => new ClientsService(), []);
    const clientsRepositoryImplementation = useMemo(() => new ClientsRepositoryImplementation(clientsService), [clientsService]);
    const clientsUseCase = useMemo(() => new ClientsUseCase(clientsRepositoryImplementation), [clientsRepositoryImplementation]);

    return (
        <ClientsContext.Provider value={{ clientsService, clientsRepositoryImplementation, clientsUseCase }}>
            {children}
        </ClientsContext.Provider>
    );
};

export const useClients = (): ClientsContextProps => {
    const context = useContext(ClientsContext);
    if (!context) {
        throw new Error('useStorage must be used within a ClientsProvider');
    }
    return context;
};