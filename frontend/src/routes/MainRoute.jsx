import { Route, Routes, useLocation } from 'react-router'
import Home from '../pages/Home'
import Menu from '../pages/Menu'
import ProcessOptions from '../pages/ProcessOptions'
import CardRead from '../pages/CardRead'
import CreditLoad from '../pages/CreditLoad'
import CreditCardRead from '../pages/CreditCardRead'
import PaymentOptions from '../pages/PaymentOptions'
import BillPreference from '../pages/BillPreference'

function MainRoute() {


    return (

        <Routes>

            <Route
                path='/'
                element={<Home  ></Home>}
            >
            </Route>
            <Route
                path='/menu'
                element={<Menu  ></Menu>}
            >
            </Route>
            <Route
                path='/process-options'
                element={<ProcessOptions  ></ProcessOptions>}
            >
            </Route>
            <Route
                path='/card-reader'
                element={<CardRead  ></CardRead>}
            >
            </Route>
            <Route
                path='/credit-loader'
                element={<CreditLoad  ></CreditLoad>}
            >
            </Route>
            <Route
                path='/credit-card-reader'
                element={<CreditCardRead  ></CreditCardRead>}
            >
            </Route>
            <Route
                path='/payment-options'
                element={<PaymentOptions  ></PaymentOptions>}
            >
            </Route>
            <Route
                path='/bill-preference'
                element={<BillPreference  ></BillPreference>}
            >
            </Route>
        </Routes>


    )
}

export default MainRoute