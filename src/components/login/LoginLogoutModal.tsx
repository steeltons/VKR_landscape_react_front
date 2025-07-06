import { Box, Modal } from "@mui/material";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

enum Action {
    LOGIN,
    REGISTRATION
}

export type LoginLogoutProps = {
    open: boolean;
    onClose: () => void;
} 

const LoginLogoutModal: React.FC<LoginLogoutProps> = ({ open, onClose }) => {
    const [currentAction, setCurrentAction] = useState<Action>(Action.LOGIN);

    return(
        <Modal open={ open } onClose={ onClose }>
            <Box
                sx={{
                    outline: 'none',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {currentAction === Action.LOGIN &&
                    <LoginForm onClose={ onClose } onChangeAction={() => setCurrentAction(Action.REGISTRATION)} />
                }
                {currentAction === Action.REGISTRATION &&
                    <RegistrationForm onClose={ onClose } onChangeAction={() => setCurrentAction(Action.LOGIN)} />
                }
            </Box>
        </Modal>
    )
}

export default LoginLogoutModal;