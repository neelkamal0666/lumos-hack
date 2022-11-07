import logo from './logo.svg';
import './App.css';
import { GenerateWallet } from './GenerateWallet/GenerateWallet';
import { Navbar } from './uiComponents/Navbar/Navbar';
import { GenerateAccount } from './uiComponents/pages/generateAccount/GenerateAccount';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RouterComponent } from './RouterComponent/RouterComponent';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { appActions } from './context/app-slice';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    localStorage.setItem("blockchain","POLYGON")
    localStorage.setItem('authToken','94b50d5245430a72a9fe7c527c3130e4');
    dispatch(appActions.updateAuthToken('94b50d5245430a72a9fe7c527c3130e4'));
    dispatch(appActions.setImageSrc(''));
    // dispatch(appActions.paymentData(null));
    localStorage.setItem('login',false);
    localStorage.setItem('claimreward','undefined');
  },[dispatch])
  return (
    <>
    <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme={"dark"}
                toastStyle={
                    // appCtx.isDarkMode
                    //     ? 
                    {
                            backgroundColor: "#27272A",
                            color: "#E2E8F0",
                        }
                        // : { backgroundColor: "#F8FAFC", color: "#1F2937" }
                }
            />
            <Router>
                <RouterComponent />
            </Router>
    </>
  );
}

export default App;
