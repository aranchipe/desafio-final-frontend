import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/Signup';
import Main from './pages/Main';
import Customers from './pages/Customers'
import CustomerDetail from './pages/CustomerDetail';
import Billing from './pages/Billing';
import { ToastContainer } from 'react-toastify';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useLoading } from './hooks/useLoading';

import { getItem } from './utils/storage';

function ProtectedRoutes({ redirectTo }) {
    const authentication = getItem('token');

    return authentication ? <Outlet /> : < Navigate to={redirectTo} />
}

function MainRoutes() {
    const { openLoading } = useLoading();

    return (
        <>
            <ToastContainer />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoading}
            >
                <CircularProgress sx={{ color: '#DA0175' }} />
            </Backdrop>

            <Routes>
                <Route path="/sign-up" element={<SignUp />} />

                <Route path="/">
                    <Route path="/" element={<SignIn />} />
                    <Route path="/sign-in" element={<SignIn />} />
                </Route>

                <Route element={<ProtectedRoutes redirectTo='/sign-in' />}>
                    <Route path='/main' element={<Main />} />
                    <Route path='/customers' element={<Customers />} />
                    <Route path='/customer/:id' element={<CustomerDetail />} />
                    <Route path='/billing' element={<Billing />} />
                </Route>

            </Routes>
        </>
    )
}

export default MainRoutes;