import logo from './logo.svg';
import './App.css';
import { GenerateWallet } from './GenerateWallet/GenerateWallet';
import { Navbar } from './uiComponents/Navbar/Navbar';
import { GenerateAccount } from './uiComponents/pages/generateAccount/GenerateAccount';
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import { RouterComponent } from './RouterComponent/RouterComponent';

function App() {
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
                // theme={appCtx.isDarkMode ? "dark" : "light"}
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
