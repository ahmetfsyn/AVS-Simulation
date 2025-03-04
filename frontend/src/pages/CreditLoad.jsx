import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid2, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import HeaderOfProcess from '../components/HeaderOfProcess'
import AmountCalculatorButton from '../components/AmountCalculatorButton';
import { isValidAmount } from '../utils/isValidAmount';
import { useNavigate } from 'react-router';
import { createNotification } from '../utils/createNotification';

function CreditLoad() {

    const navigate = useNavigate();

    const goTo = (path) => {
        navigate(path);
    }

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
        creditCard: true,
        cash: false,
        paypass: false,
    });

    const [amount, setAmount] = useState("");
    const [canNext, setCanNext] = useState(false);


    const onNext = () => {

        // ...Diğer işlemler
        // createNotification("Bir sonraki sayfaya geçildi!"); Bazen gerek olmayabilir bildirim vermeye.
        goTo("/credit-card-reader")
    }

    const onCancel = () => {

        // ...Diğer işlemler

    }

    const handleChange = (event) => {
        const { name } = event.target;
        setSelectedPaymentMethod({
            creditCard: false,
            paypass: false,
            cash: false,
            [name]: true, // Sadece seçilen ödeme yöntemini işaretli yapıyoruz
        });
    };

    const setAmountWithLengthCheck = (amount) => {
        if (isValidAmount(amount)) {
            setCanNext(true);
            setAmount(amount);
        }

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
            <HeaderOfProcess headerTitle="Lütfen Yüklemek İstediğiniz Tutarı Giriniz"></HeaderOfProcess>

            {/* Content */}
            <Grid2
                mt={2}
                size={12}
                flexGrow={1}
                display={'flex'}
                gap={2}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <Box>
                        <Typography
                            variant='h6'
                            color='white'
                        >

                            Ahmet Furkan Sayan
                        </Typography>
                        <Typography
                            variant='h6'
                            color='white'
                        >
                            Abone No : {'12312312'}
                        </Typography>
                    </Box>
                    <Divider
                        sx={{
                            backgroundColor: 'white',
                            my: 1,
                        }}
                    ></Divider>
                    <Box
                    >
                        <Typography
                            variant='h6'
                            color='white'
                        >
                            Mecvut Borç: {'56,25'}
                        </Typography>
                        <Typography
                            variant='h6'
                            color='white'
                        >
                            Mevcut Ton: {'23'}
                        </Typography>
                        <Typography
                            variant='h6'
                            color='white'
                        >
                            Yedek Kredi: {'0'}
                        </Typography>
                    </Box>
                    <Divider
                        sx={{
                            backgroundColor: 'white',
                            my: 1,
                        }}
                    ></Divider>
                    <Box
                        my={'auto'}
                        display={'flex'}
                        flexDirection={'column'}
                    >
                        <FormGroup
                            sx={{
                                my: 'auto',
                                height: '100%',
                                gap: 5,
                            }}
                        >
                            <FormControlLabel
                                control={<Checkbox checked={selectedPaymentMethod.creditCard} onChange={handleChange} name="creditCard" />}
                                label="Kredi Kartı"
                                slotProps={{
                                    typography: {
                                        fontSize: 24,
                                        color: 'white',
                                    },

                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={selectedPaymentMethod.paypass} onChange={handleChange} name="paypass" />}
                                label="Temassız"
                                slotProps={{
                                    typography: {
                                        fontSize: 24,
                                        color: 'white',
                                    },

                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={selectedPaymentMethod.cash} onChange={handleChange} name="cash" />}
                                label="Nakit"
                                slotProps={{
                                    typography: {
                                        fontSize: 24,
                                        color: 'white',
                                    },

                                }}
                            />
                        </FormGroup>
                    </Box>
                </Box>

                <Box
                    display={'flex'}
                    flex={1}
                    borderRadius={5}
                    p={2}
                    flexDirection={'column'}

                >
                    <TextField
                        fullWidth
                        variant='outlined'
                        placeholder='Yüklenecek Tutar'
                        value={amount}
                        inputMode='text'
                        focused
                        sx={{ '& .MuiInputBase-input': { color: 'white', fontSize: 24 } }}
                        maxLength={5}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },

                        }}
                        onChange={(event) => setAmountWithLengthCheck(event.target.value)}
                    ></TextField>
                    <Box
                        display={'grid'}
                        my={'auto'}
                        gridTemplateColumns="repeat(3, 1fr)"
                        gridTemplateRows={'repeat(4, 75px)'}
                        gap={2}
                    >
                        {new Array(9).fill(null).map((_, index) => (
                            <AmountCalculatorButton
                                onClick={() => setAmountWithLengthCheck(amount + (index + 1).toString())}
                                key={index + 1} content={(index + 1).toString()} />
                        ))}
                        <AmountCalculatorButton key={11} color={'error'}
                            onClick={() => { setAmount(""); setCanNext(false) }}
                            content={"SİL"} />
                        <AmountCalculatorButton key={0}
                            onClick={() => setAmountWithLengthCheck((amount + "0"))}
                            content={0} />
                        {/* <AmountCalculatorButton key={12} color="warning"
                            onClick={() => setAmount(amount + ",")}
                            content={","} /> */}
                    </Box>
                </Box>
            </Grid2>

            {/* Footer */}
            <Footer
                canNext={canNext}
                onNext={onNext}
                onCancel={onCancel}

            ></Footer>

        </Grid2>

    )
}

export default CreditLoad