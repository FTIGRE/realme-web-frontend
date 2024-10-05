import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { Storageservice } from '../../infrastructure/services/storage.service';
import { StorageRepositoryImplementation } from '../../data/repositories/storage.repository';
import { StorageUseCase } from '../useCases/storage.usecase';

interface StorageContextProps {
    storageService: Storageservice;
    storageRepositoryImplementation: StorageRepositoryImplementation;
    storageUseCase: StorageUseCase;
}

const StorageContext = createContext<StorageContextProps | undefined>(undefined);

export const StorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const storageService = useMemo(() => new Storageservice(), []);
    const storageRepositoryImplementation = useMemo(() => new StorageRepositoryImplementation(storageService), [storageService]);
    const storageUseCase = useMemo(() => new StorageUseCase(storageRepositoryImplementation), [storageRepositoryImplementation]);

    return (
        <StorageContext.Provider value={{ storageService, storageRepositoryImplementation, storageUseCase }}>
            {children}
        </StorageContext.Provider>
    );
};

export const useStorage = (): StorageContextProps => {
    const context = useContext(StorageContext);
    if (!context) {
        throw new Error('useStorage must be used within a StorageProvider');
    }
    return context;
};