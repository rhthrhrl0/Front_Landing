import React from "react";
import {FormControlLabel} from "@mui/material";
import MuiRadio from '@mui/material/Radio';

export interface RadioProps {
    value?: string;
    control?: React.ReactElement;
    label?: string;
}

const Radio = ({value, control, label}: RadioProps) => {
    return <FormControlLabel value={value}
                             control={control !== undefined ? control : <MuiRadio/>}
                             label={label}/>
}

Radio.defaultProps = {
    value: '',
    control: <MuiRadio/>,
    label: '',
}

export default Radio;