import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CustomButton from '../../ui/CustomButton'
import { Navbar } from '../Navbar/Navbar'
import { Contract, ethers } from "ethers";
// import Web3 from 'web3';
import useHttp from '../../hooks/use-http';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import NotesIcon from "@mui/icons-material/Notes";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { EastOutlined } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ClaimYourRewar = ({ claimReward, setClaimedReward, ipfsUrl, nftData }) => {
    const makeRequest = useHttp();
    const [showDescription, setShowDescription] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [isloading, setLoading] = useState(false);
    const { ethereum } = window;
    const appCtx = useSelector((state) => state.app);
    const [once, setOnce] = useState(true);
    if (once)
        setClaimedReward(localStorage.getItem('claimreward') === 'undefined' ? true : localStorage.getItem('claimreward') === 'true' ? true : false)
    else
        setClaimedReward(false)
    console.log(claimReward);
    // localStorage.getItem('claimreward')==='undefined'?'false':localStorage.getItem('claimreward')==='true'?true:
    const web3 = new Web3();
    const navigate = useNavigate();
    // useEffect(() => {
    //     makeRequest(
    //         {
    //             url: `https://bs-dev.api.onnftverse.com/v1/external/metadata/ipfs/upload`,
    //             data: {
    //                 "name": "myfirstnft",
    //                 "description": "Never give up",
    //                 "imageUrl": appCtx.paymentData.ipfsHash
    //             },
    //             method: "POST",
    //             headers: {
    //                 "X-App-Token": " ccd61510f1e5778750896149cf764218",
    //                 "Content-Type": "application/json",
    //                 'Cookie': 'JSESSIONID=82C8A8EA2075DC3DBB416A677FCBCBC4'
    //             },
    //         },
    //         (data) => {
    //             console.log(data);
    //             setIpfsUrl(data.ipfsUrl);
    //             makeRequest(
    //                 {
    //                     url: `https://nftverse.mypinata.cloud/ipfs${data.ipfsUrl.substring(6, data.ipfsUrl.length)}`,
    //                     method: "GET",
    //                 },
    //                 (datas) => {

    //                     console.log(datas);
    //                     setNftData(datas);
    //                 }
    //             )
    //         }
    //     )
    // }, [appCtx.paymentData, makeRequest])
    // async function getCurrentAccount() {
    //   const accounts = await window.web3.eth.getAccounts();
    //   return accounts[0];
    // }
    async function loadContract() {
        return await new window.web3.eth.Contract([
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "approved",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "ApprovalForAll",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "getApproved",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    }
                ],
                "name": "isApprovedForAll",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "tokenURI",
                        "type": "string"
                    }
                ],
                "name": "mintNFT",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "ownerOf",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes4",
                        "name": "interfaceId",
                        "type": "bytes4"
                    }
                ],
                "name": "supportsInterface",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "tokenURI",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "transferNFT",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ], '0xA21AA0E56Db4CB930d624466E6Be387d6cB25298'
        );
    }
    async function getCurrentAccount() {
        const accounts = await window.web3.eth.getAccounts();
        return accounts;
    }

    async function load() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
        }
    }
    async function loading() {
        await load();
        window.contract = await loadContract();
        // mintnft();
        // updateStatus('Ready!');
    }
    loading();
    const loadWeb3 = async () => {
        if (window.ethereum !== undefined) {
            console.log("started");
            setLoading(true);
            toast("Should wait for few seconds after claimimg your reward !!!");
            setClaimedReward(false);

            const accounts = await getCurrentAccount();

            const mint = await window.contract.methods.mintNFT(accounts[0], `${appCtx.paymentData.ipfsUrl}`).send({ from: accounts[0] })
                .catch(() => {
                    setLoading(false);
                    toast("unable to claim your reward !!");
                })
            setClaimedReward(false)
            setLoading(false);
            setOnce(false)
            window.localStorage.setItem("claimReward", false);


        }
        else {
            toast('metamask chrome extension not found !!')
        }

    }
    return (
        <div>
            <Navbar />
            <div className='w-[100%] px-[30px] flex justify-around items-center my-[20px]'>
                <div className='w-[30%]'>
                    {appCtx.nftData.image ?
                        <img src={`https://nftverse-dev.mypinata.cloud/ipfs/${appCtx.paymentData.ipfsHash}`} alt="logo" />
                        :
                        <CircularProgress />
                    }
                </div>
                <div className='w-[30%]'>
                    <div className="flex flex-col gap-5">
                        <span className="text-lg">
                            <div className='gap-5'>
                                <div className='mb-5'>
                                    <spam className="font-semibold mr-[10px]">Name</spam>

                                    {appCtx.nftData.name}
                                </div>
                                <div className='mb-5'>
                                    <spam className="font-semibold mr-[10px]">Description</spam>

                                    {appCtx.nftData.description}
                                </div>
                            </div>
                        </span>
                    </div>
                    {claimReward ?
                        <CustomButton primary={false}
                            onClick={() => { localStorage.getItem('login') !== 'false' ? loadWeb3() : navigate('/loginotp') }}
                            // disabled={!accountAddress ? false : true}
                            className='cursor-pointer w-[80%] flex justify-center items-center'
                        >
                            {localStorage.getItem('login') !== 'false' ? <>
                                Claim NFT {isloading ? < CircularProgress className='ml-[10px]' /> : ''}
                            </>
                                :
                                'Login'
                            }
                        </CustomButton>
                        :
                        <div>Successfully claimed your reward</div>
                    }
                </div>
            </div>
            <div className='w-[100%] flex flex-col gap-5 justify-center items-center mb-[20px]'>
                <div

                    className={
                        "flex flex-col gap-0 w-[90%] rounded-2xl overflow-hidden border-none shadow-[0_15px_40px_#0C0C0C0D] "
                    }
                >
                    <button onClick={() => setShowDescription(!showDescription)} className="p-3 w-full   flex gap-3 items-center bg-details-heading-bg justify-between text-xl font-bold border-b">
                        <div className="flex gap-3">
                            <div>
                                <NotesIcon />
                            </div>
                            <div className={"text-xl flex-grow"}>NFT Certificate Description</div>
                        </div>
                        <div>
                            <button>
                                {!showDescription ? <KeyboardArrowDownIcon className="arrowdown" /> : <KeyboardArrowUpIcon />}
                            </button>
                        </div>
                    </button>
                    {/* {metaData?.tier && <div className="desc_value w-full">{metaData.tier}</div>} */}
                    {showDescription && (
                        <div className={` prop_container flex gap-4 p-4 flex-wrap leading-[10px] transition-all`}>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg">About this item</span>
                                <span className="text-lg">
                                    <div>
                                        <div>
                                            <spam className="font-semibold">ipfsHash</spam>
                                            <EastOutlined />
                                            {appCtx.paymentData.ipfsHash}
                                        </div>
                                        <div>
                                            <spam className="font-semibold">assetId</spam>
                                            <EastOutlined />
                                            {appCtx.paymentData.assetId}
                                        </div>
                                        <div>
                                            <spam className="font-semibold">s3url</spam>
                                            <EastOutlined />
                                            {appCtx.paymentData.s3url}
                                        </div>
                                        <div>
                                            <spam className="font-semibold text-[]">ipfsUrl</spam>
                                            <EastOutlined />
                                            {ipfsUrl}
                                        </div>
                                        <div>
                                            <spam className="font-semibold">assetType</spam>
                                            <EastOutlined />
                                            {appCtx.paymentData.assetType}
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <div

                    className={
                        "flex flex-col gap-0 w-[90%] rounded-2xl overflow-hidden border-none shadow-[0_15px_40px_#0C0C0C0D] "
                    }
                >
                    <button onClick={() => setShowDetails(!showDetails)} className="p-3 w-full   flex gap-3 items-center bg-details-heading-bg justify-between text-xl font-bold border-b">
                        <div className="flex gap-3">
                            <div>
                                <NotesIcon />
                            </div>
                            <div className={"text-xl flex-grow"}>NFT Details</div>
                        </div>
                        <div>
                            <button>
                                {!showDetails ? <KeyboardArrowDownIcon className="arrowdown" /> : <KeyboardArrowUpIcon />}
                            </button>
                        </div>
                    </button>
                    {/* {metaData?.tier && <div className="desc_value w-full">{metaData.tier}</div>} */}
                    {showDetails && (
                        <div className={` prop_container flex gap-4 p-4 flex-wrap leading-[10px] transition-all`}>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg">About this item</span>
                                <span className="text-lg">
                                    <div>
                                        <div>
                                            <spam className="font-semibold">Name</spam>
                                            <EastOutlined />
                                            {appCtx.nftData.name}
                                        </div>
                                        <div>
                                            <spam className="font-semibold">Description</spam>
                                            <EastOutlined />
                                            {appCtx.nftData.description}
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
