import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface BasicSelectProps {
    items: any[];
    value: string;
    onItemChange: (value: string) => void;
    label: string;
}

const BasicSelect: React.FC<BasicSelectProps> = ({ items, value, onItemChange, label }) => {
    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id={label}>{label}</InputLabel>
            <Select
                labelId={label}
                value={value}
                onChange={(e) => onItemChange(e.target.value)}
                label={label}
            >
                {items.map((item) => (
                    <MenuItem key={item.key} value={item.value}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default BasicSelect;
