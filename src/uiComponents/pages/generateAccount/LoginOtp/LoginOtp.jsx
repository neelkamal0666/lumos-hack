import { useState } from "react";
import { CircularProgress } from '@mui/material';
import React from 'react'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EastIcon from '@mui/icons-material/East';
import { useEffect } from "react";
import { Navbar } from "../../../Navbar/Navbar";
import { appActions } from "../../../../context/app-slice";
import WhiteCustomButton from "../../../../ui/WhiteCustomButton";
import useHttp from "../../../../hooks/use-http";

export const LoginOtp = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const appCtx = useSelector((state) => state.app);
    const dark = appCtx.isDarkMode;
    const [userData, setUserData] = React.useState({
        email: "",
        password: "",
    });
    const makeRequest = useHttp();
    const [otpLoginUserEmail, setOtpLoginUserEmail] = React.useState("");
    const [handleEnterOtp, setHandleEnterOtp] = React.useState(false);
    const [clickledOnLoginOtp, setClickledOnLoginOtp] = React.useState(false);
    const [otp1, setOtp1] = React.useState('');
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
    const [reSendOtp, setReSendOtp] = React.useState(false);
    const [isVerifiedOtp, setIsVerifiedOtp] = React.useState(false);
    const homePageMainLogo = window.localStorage.getItem('homePageMainLogo');

    let distance1 = 300, resendDistance = 300;
    if (reSendOtp === 0) {
        resendDistance = 300;
        distance1 = 300;
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevValue) => ({ ...prevValue, [name]: value }));
        setOtpLoginUserEmail(e.target.value);
    };

    const handleSendOtp = () => {
        if (userData.email?.trim().length !== 0) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email)) {
                setLoader(true)
                makeRequest(
                    {
                        url: `https://us-dev.api.onnftverse.com/v1/otp/send?type=login`,
                        data: { "email": otpLoginUserEmail },
                        method: "post",
                        headers: {
                            "X-App-Token": "123",
                            "Content-Type": "application/json",
                            // "Cookie": "JSESSIONID=088D82C8245D97194D38DC8C8A3BD8E2",
                        },
                    },
                    (data) => {
                        toast('OTP Send SuccesFully!')
                        console.log(data.message, data.status)
                        setClickledOnLoginOtp(true);
                        if (data.message === 'Success' && data.status === true) {
                            setHandleEnterOtp(true);
                            setLoader(false);
                            // var x = setInterval(function () {

                            //     setMinutes(Math.floor(distance1 / 60));
                            //     setSeconds(((distance1 % 60)));
                            //     distance1--;
                            //     console.log(distance1);
                                
                            //     if (isVerifiedOtp === true) {
                            //         distance1 = 0;
                            //         resendDistance = 0;
                            //         clearInterval(x);
                            //     }
                            //     // if (distance1 < 0) {
                            //     //     clearInterval(x);
                            //     //     navigate("/signup");
                            //     // }
                            //     else if (distance1 === 0) {
                                    
                            //         clearInterval(x);
                            //         navigate("/loginotp");
                                    
                            //     }


                            // }, 1000)
                        }
                    }, (error) => {
                        toast('Please try after sometime')
                        setLoader(false)
                    }
                )
            }
            else
                toast('Email ID is incorrect !')
        }
        else {
            toast('Email Id cannot be empty !')
        }

    }
    const handleCheckOtp = () => {
        setLoader(true)
        makeRequest(
            {
                url: `https://us-dev.api.onnftverse.com/v1/otp/verify?type=login`,
                data: { "email": otpLoginUserEmail, "otp": otp1 },
                method: "post",
                headers: {
                    "X-App-Token": "123",
                    "Content-Type": "application/json",
                    // "Cookie": "JSESSIONID=088D82C8245D97194D38DC8C8A3BD8E2",
                },
            },
            (data) => {
                console.log(data);
                setIsVerifiedOtp(true);
                dispatch(
                    appActions.updateUserDetails({
                        name: data.firstName + " " + data.lastName,
                        email: data.email,
                        userId: data.userId,
                    })
                );
                dispatch(appActions.updateAuthToken(data.authToken));
                window.localStorage.setItem("userId", data.userId);
                window.localStorage.setItem("authToken", data.authToken);
                dispatch(appActions.login(undefined));
                setLoader(false)
                dispatch(appActions.setClaimReward(true));
                
                navigate(`/claimreward/${appCtx.paymentData.ipfsUrl}`);
                // localStorage.setItem('claimreward',true);
                localStorage.setItem('login',true);
            }, (error) => {
                toast("OTP entered is incorrect !");
                setLoader(false)
                console.log(error);
            },
            () => { }
        )
    }
    const handleResendOtp = () => {
        makeRequest(
            {
                url: `https://us-dev.api.onnftverse.com/v1/otp/send?type=login&resend=true`,
                data: { "email": otpLoginUserEmail },
                method: "post",
                headers: {
                    "X-App-Token": "123",
                    "Content-Type": "application/json",
                    // "Cookie": "JSESSIONID=088D82C8245D97194D38DC8C8A3BD8E2",
                },
            },
            (data) => {
                toast('OTP Send SuccesFully!')
                setReSendOtp(true);
                distance1 = 0;
                setOtp1('');
                if (data.message === 'Success' && data.status === true) {
                    setHandleEnterOtp(true);
                    // var x = setInterval(function () {

                    //     setMinutes(Math.floor(resendDistance / 60));
                    //     setSeconds(((resendDistance % 60)));
                    //     resendDistance--;
                    //     if(isVerifiedOtp === true){
                    //         distance1=0;
                    //         resendDistance=0;
                    //     }
                    //     if (resendDistance < 0) {
                    //         clearInterval(x);
                    //         navigate("/signup");
                    //     }
                    //     else if (resendDistance===0) {
                    //         clearInterval(x);
                    //     }

                    // }, 1000)
                }
            },
            () => { }
        )
    }
    useEffect(() => {
        dispatch(appActions.selectPage('Login With Otp'));
    })
    return (
        <>
            <Navbar />
            <div className="flex flex-col lg:flex-row w-[100%] justify-center items-center" style={{ color:"black" }}>
            <div className="lg:w-[500px] w-[92%] h-[60%] lg:h-[500px]">
            {/* {(!true) ? */}
                <img src={'/images/loginimage.jpg'} alt='logo' className="w-[100%] h-[100%]" />
                {/* :
                <div className="flex justify-center items-center h-[70%]"><CircularProgress /></div>
            } */}
        </div>
                <div className="lg:ml-[142px] lg:w-[39%] w-[92%]">
                    <div className="font-bold text-[32px] mb-[12px]">Welcome</div>
                    <div style={{ marginTop: !clickledOnLoginOtp ? "" : "59px" }} className='flex justify-center'>
                        <div className="mb-[8px] w-[100%] ">

                            {!clickledOnLoginOtp ? (<>
                                <div className="font-bold mb-[8px]">Email ID</div>
                                <div><input placeholder="Enter your Email ID" onChange={handleChange} name="email" style={{ outline: "2px solid rgb(0 0 0 / 17%)", outlineOffset: "3px", width: "100%", padding: "6px" }} /></div>
                            </>) : (<>
                                <div>
                                    <OtpInput
                                        numInputs={6}
                                        isInputNum={true}
                                        inputStyle={{
                                            width: "3rem",
                                            height: "3rem",
                                            margin: "0 1rem",
                                            fontSize: "2rem",
                                            borderRadius: 4,
                                            border: "1px solid rgba(0,0,0,0.3)",
                                            color: "black",
                                            opacity: "1"
                                        }}
                                        value={otp1}
                                        onChange={(otp) => setOtp1(otp)}
                                    />
                                </div>
                            </>)}
                        </div>
                    </div>
                    <div className="text-[11px]" style={{ color: "#ffc0e0", display: "none" }}>oops! username and password seems invalid</div>
                    <div className='flex justify-between w-[97%] mb-[11px]' style={{ marginTop: !clickledOnLoginOtp ? "29px" : "59px" }}>
                        <div className='font-bold' style={{ visibility: !reSendOtp ? 'none' : 'hidden', display: !clickledOnLoginOtp ? "none" : "block" }} onClick={() => { handleResendOtp() }}>Resend OTP</div>
                        <div className='font-bold'>{!(minutes === 0 && seconds === 0) ? <>{minutes >= 0 && minutes <= 9 ? `0${minutes}` : minutes}:{seconds >= 0 && seconds <= 9 ? `0${seconds}` : seconds}</> : ''}</div>
                    </div>
                    <div className="flex justify-between mb-[74px]">
                        <WhiteCustomButton
                            style={{
                                background: "#0C0C0C 0% 0% no-repeat padding-box",
                                borderRadius: "35px",
                                opacity: "1",
                                color: "#BBFF00"
                            }}
                            // primary={true}
                            className="pl-[17px] pr-[17px] flex justify-center items-center"
                            onClick={() => !clickledOnLoginOtp ? handleSendOtp() : handleCheckOtp()}
                        >
                            <div>{!clickledOnLoginOtp ? `Send OTP` : "Verify OTP"}</div>
                            {loader ?
                                <CircularProgress sryle={{ color: "#BBFF00", fontSize: "10px" }} className='ml-[5px]' />
                                :
                                <EastIcon className='ml-[5px]' />
                            }
                        </WhiteCustomButton>
                        <div>
                            {/* <div className="text-[14px]">Do not have an account</div>
                            <div className="w-[100%] group">
                                <div className="font-bold cursor-pointer" onClick={() => navigate('/signup')}>Create a New Account</div>
                                <div className="h-[2px] w-[100%] group-hover:bg-borderGreen"></div>
                            </div> */}
                        </div>
                    </div>
                    {/* <ConnectWith /> */}
                </div>
            </div>
        </>
    )
}
