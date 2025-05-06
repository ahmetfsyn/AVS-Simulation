import { Avatar, Box, CircularProgress, Container, Grid2, Typography } from '@mui/material'
import { useGetCityHall } from '../hooks/useGetCityHall';
import { useGetKiosk } from '../hooks/useGetKiosk';
function SplashScreen() {


    useGetCityHall();
    useGetKiosk();


    return (
        <>
            <Grid2
                container
                sx={{
                    height: '100vh'
                }}
            >
                <Grid2
                    size={12}
                    p={2}
                    display={'flex'}
                    justifyContent={'space-between'}
                    flexDirection={'column'}
                >

                    <Box
                        display={'flex'}
                        height={'100%'}
                        alignItems={'center'}
                    >
                        <Typography variant='h3'> Lütfen Bekleyiniz...</Typography>
                        <CircularProgress color='primary' size={32}></CircularProgress>
                    </Box>
                </Grid2>
            </Grid2>

        </>


    )
}

export default SplashScreen