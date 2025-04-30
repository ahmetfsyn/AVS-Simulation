/* eslint-disable no-unused-vars */
import { BrowserRouter, } from 'react-router-dom'
import './css/App.css'
import MainContainer from './components/MainContainer'
import MainRoute from './routes/MainRoute'
import { useGetCityHall } from './hooks/useGetCityHall';

function App() {

  const { data, error, isLoading, refetch } = useGetCityHall();

  return (
    <>
      <BrowserRouter>
        <MainContainer>
          <MainRoute />
        </MainContainer>
      </BrowserRouter>
    </>
  )
}

export default App
