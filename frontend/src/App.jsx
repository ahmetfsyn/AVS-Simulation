/* eslint-disable no-unused-vars */
import { BrowserRouter, } from 'react-router-dom'
import './css/App.css'
import MainContainer from './components/MainContainer'
import MainRoute from './routes/MainRoute'
import { useGetCityHall } from './hooks/useGetCityHall';
import { useGetKiosk } from './hooks/useGetKiosk';
import { useSignalR } from './hooks/useSignalR';
import { Box, CircularProgress, Typography } from '@mui/material';
// import SplashScreen from './components/SplashScreen'
function App() {

  const signalR = useSignalR();
  // console.log(signalR.connection)

  return (
    <>
      <BrowserRouter>
        <MainContainer>
          {signalR.connection ? (
            <MainRoute />
          ) : (
            // <SplashScreen></SplashScreen>
            <>
              <Box sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
                <Typography variant='h4' color='white' >
                  Kiosk Hazırlanıyor
                </Typography>
                <CircularProgress color='info' size={32}></CircularProgress>
              </Box>
            </>
          )}
        </MainContainer>
      </BrowserRouter>
    </>

  )
}

export default App
