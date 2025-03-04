import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './css/App.css'
import MainContainer from './components/MainContainer'
import MainRoute from './routes/MainRoute'
import { TimeoutProvider } from "./contexts/TimeoutContext";

function App() {

  return (
    <>
      <BrowserRouter>
        <TimeoutProvider timeoutDuration={5000}>
          <MainContainer>
            <MainRoute />
          </MainContainer>
        </TimeoutProvider>
      </BrowserRouter>
    </>
  )
}

export default App
