import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { ClientEntity } from '../../../../../data/entities/client.entity';
import { MembershipsService } from '../../../../../infrastructure/services/memberships.service';
import { MembershipsRepositoryImplementation } from '../../../../../data/repositories/memberships.repository';
import { MembershipsUseCase } from '../../../../../domain/useCases/memberships.usecase';
import { MembershipEntity } from '../../../../../data/entities/membership.entity';
import { SearchRequestDataType } from '../../../../../domain/models/types/searchApiData.type';

interface MembershipDialogProps {
    client: ClientEntity;
    onCloseDialog: () => void;
    onSaveMembership: (membership: MembershipEntity) => void;

}

const MembershipDialog: React.FC<MembershipDialogProps> = ({ onCloseDialog, onSaveMembership, client }) => {

    const today = new Date().toLocaleDateString('en-CA');

    const [membership, setMembership] = useState<MembershipEntity | null>(null);
    const [startDate, setStartDate] = useState<string>(today);
    const [endDate, setEndDate] = useState<string>(today);
    const [startDateError, setStartDateError] = useState<boolean>(false);
    const [endDateError, setEndDateError] = useState<boolean>(false);

    const membershipsService = new MembershipsService();
    const membershipsRepositoryImplementation = new MembershipsRepositoryImplementation(membershipsService);
    const membershipsUseCase = new MembershipsUseCase(membershipsRepositoryImplementation);

    const formatDate = (date: string) => {
        return date.split('T')[0];
    }

    const validateMembershipStatus = () => {
        const sDate = new Date(startDate);
        const eDate = new Date(endDate);
        const todayDate = new Date();
        return (eDate > sDate) && (eDate > todayDate);
    }

    useEffect(() => {
        const fetchData = async () => {
            const request: SearchRequestDataType = {
                column: 'client_id',
                value: `${client.id}`
            }
            const data = await membershipsUseCase.getMembership(request);
            if (!data.error && data.body) {
                setMembership(data.body);
                const formattedStartDate = formatDate(data.body.start_date);
                const formattedEndDate = formatDate(data.body.end_date);
                setStartDate(formattedStartDate);
                setEndDate(formattedEndDate);
            }
        }
        fetchData();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleSave = () => {
        startDate ? setStartDateError(false) : setStartDateError(true);
        endDate ? setEndDateError(false) : setEndDateError(true);
        if (startDate && endDate) {
            const newMembership = new MembershipEntity({
                id: membership ? membership.id : 0,
                client_id: client.id,
                start_date: startDate,
                end_date: endDate,
                state: validateMembershipStatus() ? 'active' : 'expired'
            });
            onSaveMembership(newMembership);
            handleClose();
        }
    };

    const handleClose = () => {
        onCloseDialog();
    }

    return (
        <Dialog open={true} onClose={onCloseDialog}>
            <DialogTitle>{client.name}</DialogTitle>
            <DialogContent>
                <TextField
                    error={startDateError}
                    margin="dense"
                    label="Inicio"
                    type="date"
                    fullWidth
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
                <TextField
                    error={endDateError}
                    margin="dense"
                    label="Fin"
                    type="date"
                    fullWidth
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
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
                <Button type="submit" color="primary" onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MembershipDialog;
