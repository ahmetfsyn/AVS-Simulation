import { Box, Button, Divider, Grid2 } from '@mui/material'
import React, { useEffect } from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'
import HeaderOfProcess from '../components/HeaderOfProcess'
import { useNavigate } from 'react-router'

function CardRead() {



    const navigate = useNavigate();

    useEffect(() => {

        setTimeout(() => {
            console.log('Kart okundu');
            navigate("/credit-loader");

        }, 3000);

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
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <img
                        width={'100%'}
                        src="arrows.gif" alt=""
                        style={{
                            transform: 'rotate(90deg)',
                        }}
                    />
                </Box>
            </Grid2>

        </Grid2>

    )
}

export default CardRead