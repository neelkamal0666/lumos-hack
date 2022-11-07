import React, { useState } from 'react'
import './GenerateAccount.css'
import GenerateAccountModal from './GenerateAccountModal';
import { Tooltip } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { useEffect } from 'react';
import CreateItem from '../../Mint-NFTs\'/CreateItem';
import CustomButton from '../../../ui/CustomButton';
import { useSelector } from 'react-redux';
import Mint from '../../Mint-NFTs\'/Mint';
import { toast } from 'react-toastify';
import Web3 from 'web3';
import WhiteCustomButton from '../../../ui/WhiteCustomButton';
import { useNavigate } from 'react-router-dom';
import { Steps } from '../../Steps/Steps';

export const GenerateAccount = () => {
    const [openModal, setOpenModal] = useState(false);
    const [copyId, setCopyId] = useState(false);
    const [accountAddress, setAccountAddress] = useState(null);
    const [option, setOption] = useState('mint');
    const [csvfile, setCsvFile] = useState();
    const navigate = useNavigate();
    const copyToClipboard = () => {
        setCopyId(true);
        navigator.clipboard.writeText(accountAddress);
    }
    const [file, setFile] = useState();
    const fileReader = new FileReader();
    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleOnSubmit = (e) => {
        let csvOutput;
        e.preventDefault(); if (file) {
            fileReader.onload = function (event) {
                csvOutput = event.target.result;
                setCsvFile(csvOutput);
            };
            fileReader.readAsText(file);
        }
        console.log(csvfile);
    };
    const appCtx = useSelector((state) => state.app);
    useEffect(() => {
        if (localStorage.getItem('accountAddress') !== "undefined") {
            setAccountAddress(localStorage.getItem('accountAddress'))
        }
    })
    async function getCurrentAccount() {
        const accounts = await window.web3.eth.getAccounts();
        return accounts[0];
    }
    const connectWallet = async () => {
        if (window.ethereum !== undefined) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log(accounts[0]);
            setAccountAddress(accounts[0]);
            localStorage.setItem('accountAddress', accounts[0]);
        }
        else {
            toast('Etherium extension not found !!');
        }
    }
    return (
        <>
            <div 
            style={{backgroundImage:`url(/images/banner.jpg)`,backgroundRepeat: "no-repeat",backgroundSize: "cover"}}
            className='flex flex-col h-[400px] py-[10px] sm:flex-row justify-center sm:justify-around'>
                <div>
                    {/* <div style={{ height: "400px" }} className='flex justify-center'>
                        <img src="/images/coverimage.svg" alt='' className='h-[100%]' />
                    </div> */}
                </div>
                <div className=' flex flex-col justify-center items-center px-[20px] sm:px-[0px] text-white'>
                    {!accountAddress ?
                        <div className='w-[100%] mt-[30px] sm:mt-[0px]'>
                            <CustomButton primary={false} onClick={() => { connectWallet() }}
                                // disabled={!accountAddress ? false : true}
                                className='cursor-pointer w-[100%] bg-black'
                            >
                                Connect to wallet
                            </CustomButton>
                            <p className='w-[100%] my-[10px] text-center'>OR</p>
                            {/* {!appCtx.claimReward ? */}
                            <CustomButton primary={false} onClick={() => { setOpenModal(true) }}
                                disabled={!accountAddress ? false : true}
                                className='cursor-pointer w-[100%] bg-black'
                            >
                                Create your Account
                            </CustomButton>

                            {/* :
                            
                        } */}
                        </div>
                        :
                        ''
                    }
                    {appCtx.paymentData.ipfsHash ?
                        <CustomButton primary={false} onClick={() => { window.open(`/claimreward/QmSWGcs56vx99yHQZNSzjQRAxFPJG9mHeNmdyexNBTCwYz`,'_blank') }}
                            className='cursor-pointer mt-[30px] w-[100%]'
                        >
                            Go to reward page
                        </CustomButton>
                        :
                        ''
                    }
                    {/* <div className="h-[36.27px] w-[36.27px] rounded-full bg-green-300"><img src="/images/algorand.png" alt=""/></div> */}
                    {accountAddress !== null ?
                        <>
                            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "30px" }}>
                                <div className='address'>
                                    <div className="mx-[10px]">{!accountAddress ? 'loading.....' : `${accountAddress.substring(0, 13)}.....`}</div>
                                    <div className="flex items-center h-[100%] cursor-pointer">
                                        <div className="mb-[6px] transition-all ease-out duration-500" onClick={() => { copyToClipboard() }}>
                                            {!copyId ?
                                                <Tooltip title="Copy Id"><ContentCopyIcon style={{}} /></Tooltip> : <Tooltip title="Copied"><DoneIcon style={{}} /></Tooltip>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                        :
                        ''
                    }
                </div>
            </div>

            {accountAddress ? <>
                <div className='my-[20px] flex justify-around'>
                    <WhiteCustomButton onClick={() => { setOption('mint') }} primary={option === 'mint' ? true : false}>Mint Your NFT</WhiteCustomButton>
                    <WhiteCustomButton onClick={() => { setOption('upload') }} primary={option === 'upload' ? true : false}>Upload</WhiteCustomButton>
                </div>
                {option === 'mint' ? <>
                    {/* <p className='pl-[100px] pb-[30px]'>Mint</p> */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <CreateItem />
                    </div>
                </>
                    :
                    option === 'upload' ?
                        <>
                            {/* <p classN///ame='pl-[100px] pb-[30px]'>Upload</p> */}
                            <div className='flex justify-center mb-[30px]'>
                                <form
                                    className="w-[90%] border-2 border-dashed rounded h-[200px] items-center justify-center flex flex-col dark:bg-zinc-700/70 bg-gray-100/70 dark:hover:bg-sky-700/50 hover:bg-sky-100/50 transition-all ease-out duration-300"
                                >
                                    <input
                                        type={"file"}
                                        id={"csvFileInput"}
                                        accept={".csv"}
                                        className=""
                                        onChange={handleOnChange}
                                    />
                                    <button
                                        className='mt-[20px]'
                                        onClick={(e) => {
                                            handleOnSubmit(e);
                                        }}
                                    >
                                        IMPORT CSV
                                    </button>
                                </form>
                            </div>
                        </>
                        :
                        ''
                }
            </>
                :
                ''
            }
            {
                !accountAddress ?
                    <Steps />
                    :
                    ''
            }
            {
                appCtx.mintNft ?
                    <div>
                        <Mint />
                    </div>
                    :
                    ''
            }

            <GenerateAccountModal openModal={openModal} setOpenModal={setOpenModal} setAccountAddress={setAccountAddress} />
        </>
    )
}
