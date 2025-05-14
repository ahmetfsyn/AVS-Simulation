/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Grid2, Typography } from '@mui/material'
import HeaderOfProcess from '../components/HeaderOfProcess';
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useTimeout } from '../hooks/useTimeout';

function ProcessOptions() {
    const navigate = useNavigate();
    const { startTimeout } = useTimeout(45000);

    useEffect(() => {
        startTimeout();
    }, [])

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
            <HeaderOfProcess headerTitle="Lütfen Bir İşlem Seçiniz"></HeaderOfProcess>

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
                    flexDirection={'column'}
                    justifyContent={'space-around'}
                >
                    <Button
                        variant='contained'
                        color='warning'
                        size='large'
                        onClick={() => navigate('/enter-subscriber-number')}
                        sx={{
                            width: 250,
                            height: 75,
                        }}
                    >
                        Su Yükleme
                    </Button>

                    <Button
                        variant='contained'
                        color='warning'
                        size='large'
                        sx={{
                            width: 250,
                            height: 75,
                        }}
                    >
                        Vergi & Diğer Borçlar
                    </Button>
                    <Button
                        variant='contained'
                        color='warning'
                        size='large'
                        sx={{
                            width: 250,
                            height: 75,
                        }}
                    >
                        Su Faturası Öde
                    </Button>

                    <Button
                        variant='contained'
                        color='warning'
                        size='large'
                        sx={{
                            width: 250,
                            height: 75,
                        }}
                    >
                        Taksitli Borçlar
                    </Button>
                </Box>

            </Grid2>

            {/* Footer */}
            <Footer
                onNext={() => { }}
                onCancel={() => { }}
                canNext={false}></Footer>

        </Grid2>



    )
}



export default ProcessOptions