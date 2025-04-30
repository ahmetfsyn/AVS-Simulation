import { Grid2 } from '@mui/material'
import HeaderOfProcess from '../components/HeaderOfProcess'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

function CreditCardRead() {

    return (

        <Grid2
            container
            direction={'column'}
            sx={{
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