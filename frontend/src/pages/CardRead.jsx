import { Box, Button, Divider, Grid2 } from '@mui/material'
import HeaderOfProcess from '../components/HeaderOfProcess'
import { useNavigate } from 'react-router'
import { useSignalR } from '../hooks/useSignalR';
import { useEffect } from 'react';

function CardRead() {

    const navigate = useNavigate();

    const { connection } = useSignalR();

    useEffect(() => {

        if (connection) {

            connection?.on("ReceiveMessage", (user, message) => {
                console.log(`Mesaj alındı: ${user} - ${message}`);
            });

            connection?.invoke("SendMessage", "Kullanıcı", "Merhaba, bu bir test mesajıdır.");
        }

    }, [connection])


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
            <HeaderOfProcess headerTitle="Lütfen Su Kartınızı Okutunuz"></HeaderOfProcess>

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