import { Container } from '@mui/material'
import { useSignalR } from '../hooks/useSignalR';
function MainContainer({ children }) {


    return (

        <Container

            maxWidth='md'
            sx={{
                height: '100vh',
            }}
        >
            {children}
        </Container >
    )
}

export default MainContainer