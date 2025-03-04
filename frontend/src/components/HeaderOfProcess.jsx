import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Grid2, Typography } from '@mui/material'

function HeaderOfProcess({ headerTitle }) {

    return (

        <>

            <Grid2
                size={12}>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={2}
                >
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Avatar
                            src='img/tarsusLogo.png'
                            sx={{
                                width: 64,
                                height: 64,
                            }}
                        ></Avatar>
                    </Box>
                    <Box
                    >
                        <Typography
                            variant='h4'
                            color='white'
                            textAlign={'center'}
                        >
                            {headerTitle}
                        </Typography>
                    </Box>

                </Box>
            </Grid2>

            <Divider
                sx={{
                    mt: 1,
                    bgcolor: 'white',
                }}
            ></Divider>
        </>

    )
}

export default HeaderOfProcess