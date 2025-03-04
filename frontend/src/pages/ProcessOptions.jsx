import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Grid2, Typography } from '@mui/material'
import HeaderOfProcess from '../components/HeaderOfProcess';
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import CompanyButton from '../components/CompanyButton';
import { CompanyEnum } from '../constants/const';

// const companies = [{
//     id: 1,
//     name: 'Baylan',
//     url: '/baylan',
// },
// {
//     id: 2,
//     name: 'Manas',
//     url: '/manas',
// },
// {
//     id: 3,
//     name: 'Metlab',
//     url: '/metlab',
// }]

function ProcessOptions() {

    const readCard = (companyName) => {
        console.log(companyName + " kart bekleniyor");

    }

    const navigate = useNavigate();

    const goToCardReaderPage = (companyName) => {
        navigate("/card-reader");
        readCard(companyName);
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

                    {Object.values(CompanyEnum).map((company) => (
                        <CompanyButton key={company.id} goToCardReaderPage={goToCardReaderPage} company={company} />
                    ))}

                </Box>

                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-around'}
                >

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