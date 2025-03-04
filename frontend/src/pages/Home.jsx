import { Avatar, Box, Container, Grid2, Typography } from '@mui/material'
import Header from '../components/Header'
import TouchForProcessBox from '../components/TouchForProcessBox'
import { useNavigate } from 'react-router-dom'
function Home() {

    const navigation = useNavigate()

    return (

        <>

            <Grid2
                container
                sx={{
                    backgroundImage: 'url(img/tarsusBackground.jpg)',
                    backgroundSize: 'cover',
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

                    <Header></Header>
                    <Box
                        display={'flex'}
                        height={'100%'}
                        alignItems={'center'}
                        onClick={() => navigation('/process-options')}
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        <TouchForProcessBox></TouchForProcessBox>
                    </Box>
                </Grid2>
            </Grid2>

        </>


    )
}

export default Home