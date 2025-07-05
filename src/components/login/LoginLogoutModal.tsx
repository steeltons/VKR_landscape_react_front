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
                    backdropFilter: 'blur(4xp)',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {currentAction === Action.LOGIN &&
                    <LoginForm onClose={ onClose } onChangeAction={() => setCurrentAction(Action.REGISTRATION)} />
                }
                {currentAction === Action.REGISTRATION &&
                    <RegistrationForm onClose={ onClose } onChangeAction={() => setCurrentAction} />
                }
            </Box>
        </Modal>
    )
}

export default LoginLogoutModal;