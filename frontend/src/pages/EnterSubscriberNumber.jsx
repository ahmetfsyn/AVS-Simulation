/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import { Box, Checkbox, Divider, FormControlLabel, FormGroup, Grid2, TextField, Typography } from '@mui/material';
import HeaderOfProcess from '../components/HeaderOfProcess';
import AmountCalculatorButton from '../components/AmountCalculatorButton'
import { useTimeout } from '../hooks/useTimeout';
import { useGetUser } from '../hooks/useGetUser';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { showMessage } from '../utils/showMessage';

const EnterSubscriberNumber = () => {

    const [subscriberInputValue, setSubscriberInputValue] = useState('');
    // const { startTimeout } = useTimeout(45000);
    const { isLoading, getUserBySubscriberNo } = useGetUser();
    const navigate = useNavigate();
    const user = useSelector(state => state.app.user);
    const kiosk = useSelector(state => state.app.kiosk)

    // useEffect(() => {
    //     startTimeout();
    // }, [])

    useEffect(() => {
        if (user) {
            console.log(user)
            navigate('/card-reader', {
                user,
                kiosk,
            })
        }

    }, [user])

    const onCancel = () => {

    }

    const onNext = async () => {

        if (subscriberInputValue.length == 0) {
            showMessage({
                title: "Geçersiz Abone Numarası",
                text: 'Lütfen geçerli bir abone numarası giriniz.',
                icon: 'error',
                timer: 3000,
                // showConfirmButton: true
            });
            setSubscriberInputValue('');
            return;
        }

        await getUserBySubscriberNo(subscriberInputValue)
    }

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
            <HeaderOfProcess headerTitle="Lütfen Abone Numaranızı Giriniz"></HeaderOfProcess>

            {/* Content */}
            <Grid2
                mt={2}
                flexGrow={1}
                display={'flex'}
            >
                <Box
                    display={'flex'}
                    p={2}
                    flexGrow={1}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'space-evenly'}
                >
                    <TextField
                        variant='outlined'
                        value={subscriberInputValue}
                        placeholder='Abone Numaranız'
                        inputMode='text'
                        focused
                        sx={{ '& .MuiInputBase-input': { color: 'white', fontSize: 24 } }}
                        maxLength={7}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },

                        }}
                        onChange={(e) => setSubscriberInputValue(e.target.value)}
                    />

                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(3, 1fr)"
                        gridTemplateRows="repeat(4, 80px)"
                        gap={2}
                        width="100%"
                    >
                        {new Array(9).fill(null).map((_, index) => (
                            <AmountCalculatorButton
                                key={index}
                                content={index + 1}
                                onClick={() => {
                                    setSubscriberInputValue(subscriberInputValue + (index + 1));
                                }}
                                color="primary"
                            />
                        ))}

                        <AmountCalculatorButton
                            content="Temizle"
                            onClick={() => {
                                setSubscriberInputValue('');
                            }}
                            color="error"
                        />

                        <AmountCalculatorButton
                            content="0"
                            onClick={() => {
                                setSubscriberInputValue(subscriberInputValue + '0');
                            }}
                            color="primary"
                        />

                        <AmountCalculatorButton
                            content="←"
                            onClick={() => {
                                setSubscriberInputValue((prev) => prev.slice(0, -1));
                            }}
                            color="warning"
                        />
                    </Box>


                </Box>
            </Grid2>

            {/* Footer */}
            <Footer
                canNext={true}
                onNext={onNext}
                onCancel={onCancel}
                isLoading={isLoading}
            />

        </Grid2>
    )
}

export default EnterSubscriberNumber
