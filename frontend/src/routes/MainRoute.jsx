import { Route, Routes, } from 'react-router'
import Home from '../pages/Home'
import Menu from '../pages/Menu'
import ProcessOptions from '../pages/ProcessOptions'
import CardRead from '../pages/CardRead'
import CreditLoad from '../pages/CreditLoad'
import CreditCardRead from '../pages/CreditCardRead'
import PaymentOptions from '../pages/PaymentOptions'
import BillPreference from '../pages/BillPreference'
import EnterSubscriberNumber from '../pages/EnterSubscriberNumber'

function MainRoute() {


    return (

        <Routes>

            <Route
                path='/'
                element={<Home></Home>}
            />

            <Route
                path='/menu'
                element={<Menu  ></Menu>}
            />

            <Route
                path='/process-options'
                element={<ProcessOptions  ></ProcessOptions>}
            />

            <Route
                path='/card-reader'
                element={<CardRead  ></CardRead>}
            />

            <Route
                path='/credit-loader'
                element={<CreditLoad  ></CreditLoad>}
            />

            <Route
                path='/credit-card-reader'
                element={<CreditCardRead  ></CreditCardRead>}
            />

            <Route
                path='/payment-options'
                element={<PaymentOptions  ></PaymentOptions>}
            />

            <Route
                path='/bill-preference'
                element={<BillPreference  ></BillPreference>}
            />

            <Route
                path='/enter-subscriber-number'
                element={<EnterSubscriberNumber  ></EnterSubscriberNumber>}
            />
        </Routes>


    )
}

export default MainRoute