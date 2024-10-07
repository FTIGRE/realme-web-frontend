import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { ClientEntity } from '../../../../../data/entities/client.entity';

interface CreateClientDialogProps {
    onClose: () => void;
    onSave: (client: ClientEntity) => void;
}

const CreateClientDialog: React.FC<CreateClientDialogProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState<string | null>(null);
    const [idNumber, setIdNumber] = useState<number | null>(null);
    const [birthDate, setBirthDate] = useState<string | null>(null);
    const [nameError, setNameError] = useState<boolean>(false);
    const [idNumberError, setIdNumberError] = useState<boolean>(false);
    const [birthDateError, setBirthDateError] = useState<boolean>(false);

    const handleSave = () => {
        name ? setNameError(false) : setNameError(true);
        idNumber ? setIdNumberError(false) : setIdNumberError(true);
        birthDate ? setBirthDateError(false) : setBirthDateError(true);
        if (name && idNumber && birthDate) {
            const client = new ClientEntity({ id: 0, name, ic: idNumber, BDate: birthDate });
            onSave(client);
            handleClose();
        }
    };

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Create Client</DialogTitle>
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
                        error={idNumberError}
                        margin="dense"
                        label="ID Number"
                        type="number"
                        fullWidth
                        value={idNumber !== null ? idNumber.toString() : ''}
                        onChange={(e) => setIdNumber(parseInt(e.target.value, 10))}
                    />
                    <TextField
                        error={birthDateError}
                        margin="dense"
                        label="Birth Date"
                        type="date"
                        fullWidth
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateClientDialog;