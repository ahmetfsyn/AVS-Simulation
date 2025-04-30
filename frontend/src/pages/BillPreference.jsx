import { Box, Button, Grid2 } from '@mui/material'
import React, { useState } from 'react'
import HeaderOfProcess from '../components/HeaderOfProcess'
import { showMessage } from '../utils/showMessage'
import { useNavigate } from 'react-router'
function BillPreference() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const goTo = () => {
        navigate("/");
    }

    const resetRedux = () => {
        // Reset Redux state here
        // For example:
        // dispatch(resetState());
        console.log('redux resetlendi.');
    }

    const giveBill = async () => {
        setLoading(true);
        setTimeout(async () => {
            resetRedux();
            await showMessage({
                title: "Bilgilendirme",
                text: "Lütfen Makbuzunuzu Alınız. İyi Günler Dileriz.",
                icon: 'info',
                showCancelButton: false,
                showConfirmButton: false,
            });
            setLoading(false);
            goTo();
        }, 2000);

    }

    const dontGiveBill = async () => {
        resetRedux();
        await showMessage({
            title: "Bilgilendirme",
            text: "Makbuz Verilmeyecektir. İyi Günler Dileriz.",
            icon: 'info',
            showCancelButton: false,
            showConfirmButton: false,

        });
        goTo();

    }

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
            <HeaderOfProcess headerTitle="Makbuz İster Misiniz ?"></HeaderOfProcess>

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
                    sx={{
                        backgroundImage: 'url(/saveGreen.png)',
                        width: '100%',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: 2,
                        backgroundSize: 'cover'
                    }}
                >
                    <Box
                        display={'flex'}
                        justifyContent={'space-evenly'}
                        alignItems={'center'}
                        gap={3}
                        height={'100%'}
                        px={2}
                    >

                        <Button
                            variant='contained'
                            color='warning'
                            fullWidth
                            sx={{
                                height: 100
                            }}
                            onClick={giveBill}
                            loading={loading}
                            disabled={loading}
                        >
                            Makbuzu Al
                        </Button>
                        <Button
                            variant='contained'
                            color='success'
                            fullWidth
                            sx={{
                                height: 100
                            }}
                            onClick={dontGiveBill}
                            disabled={loading}

                        >
                            Makbuzu Alma
                        </Button>
                    </Box>
                </Box>

            </Grid2>

        </Grid2>

    )
}

export default BillPreference