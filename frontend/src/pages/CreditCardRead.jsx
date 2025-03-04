import { Box, Button, Divider, Grid2 } from '@mui/material'
import HeaderOfProcess from '../components/HeaderOfProcess'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

function CreditCardRead() {



    const navigate = useNavigate();
    const goTo = () => {
        navigate("/bill-preference");
    }

    useEffect(() => {

        setTimeout(() => {
            goTo();
        }, 2000);

    }, [])


    return (

        <Grid2
            container
            direction={'column'}
            sx={{
                // backgroundImage: 'url(img/tarsusBackground.jpg)',
                // backgroundSize: 'cover',
                height: '100vh',
                bgcolor: 'rgba(0,0,0,0.6)',
            }}
            p={2}
        >

            {/* Header */}
            <HeaderOfProcess headerTitle="Lütfen Kartınızı Takınız"></HeaderOfProcess>

            {/* Content */}
            <Grid2
                mt={2}
                size={12}
                flexGrow={1}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-around'}
            >

            </Grid2>

        </Grid2>
    )
}

export default CreditCardRead