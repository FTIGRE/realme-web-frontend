import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { Storageservice } from '../../infrastructure/services/storage.service';
import { StorageRepositoryImplementation } from '../../data/repositories/storage.repository';
import { StorageUserCase } from '../../domain/userCases/storage.usercase';

interface StorageContextProps {
    storageUserCase: StorageUserCase;
}

const StorageContext = createContext<StorageContextProps | undefined>(undefined);

export const StorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const storageService = useMemo(() => new Storageservice(), []);
    const storageRepositoryImplementation = useMemo(() => new StorageRepositoryImplementation(storageService), [storageService]);
    const storageUserCase = useMemo(() => new StorageUserCase(storageRepositoryImplementation), [storageRepositoryImplementation]);

    return (
        <StorageContext.Provider value={{ storageUserCase }}>
            {children}
        </StorageContext.Provider>
    );
};

export const useStorage = (): StorageUserCase => {
    const context = useContext(StorageContext);
    if (!context) {
        throw new Error('useStorage must be used within a StorageProvider');
    }
    return context.storageUserCase;
};