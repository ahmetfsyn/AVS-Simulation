import { Box, Button, Divider, Grid2 } from '@mui/material'
import HeaderOfProcess from '../components/HeaderOfProcess'

function PaymentOptions() {
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
            <HeaderOfProcess headerTitle="Lütfen Ödeme Yöntemi Seçiniz"></HeaderOfProcess>

            {/* Content */}
            <Grid2
                mt={2}
                size={12}
                flexGrow={1}
                display={'flex'}
            >
                <Box
                    p={2}
                    display={'flex'}
                    flexGrow={1}
                    flexDirection={'column'}
                    justifyContent={'space-around'}
                >
                    <Button
                        fullWidth
                        variant='contained'
                        sx={{
                            height: 100,
                        }}
                    >
                        Temassız
                    </Button>
                    <Button
                        fullWidth
                        variant='contained'
                        sx={{
                            height: 100,
                        }}
                    >
                        Kredi Kartı
                    </Button>
                    <Button
                        fullWidth
                        variant='contained'
                        sx={{
                            height: 100,
                        }}
                    >
                        Nakit
                    </Button>
                </Box>
            </Grid2>

        </Grid2>
    )
}

export default PaymentOptions