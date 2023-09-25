import React from "react";
import {Button, Modal, Box} from '@mui/material';

interface PopupProps {
    open: boolean;
    setPopup: (popupState: { open: boolean }) => void;
    message: string;
    title: string;
    callback?: () => void;
}

const Popup: React.FC<PopupProps> = ({open, setPopup, message, title, callback}) => {
    const handleClose = () => {
        setPopup({open: false});
        if (callback) {
            callback();
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4
            }}>
                <h2>{title}</h2>
                <p>{message}</p>
                <Button variant="contained" onClick={handleClose}>OK</Button>
            </Box>
        </Modal>
    );
};

export default Popup;