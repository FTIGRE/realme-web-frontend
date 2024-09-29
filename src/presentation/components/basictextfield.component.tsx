import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';


const BasicTextField: React.FC<TextFieldProps> = (props) => {

    return (
        <TextField
            {...props}
            variant="outlined"
            margin="normal"
            fullWidth
        />
    );
};

export default BasicTextField;