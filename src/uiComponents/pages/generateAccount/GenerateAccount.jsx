import React, { useState } from 'react'
import './GenerateAccount.css'
import GenerateAccountModal from './GenerateAccountModal';
import { Tooltip } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { useEffect } from 'react';
import CreateItem from '../../Mint-NFTs\'/CreateItem';

export const GenerateAccount = () => {
    const [openModal, setOpenModal] = useState(false);
    const [copyId, setCopyId] = useState(false);
    const [accountAddress, setAccountAddress] = useState(null);
    const copyToClipboard = () => {
        setCopyId(true);
        navigator.clipboard.writeText(accountAddress);
    }
    useEffect(() => {
        if (localStorage.getItem('accountAddress') !== "undefined") {
            setAccountAddress(localStorage.getItem('accountAddress'))
        }
    })
    console.log(accountAddress);
    return (
        <>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ height: "300px", width: "95%", backgroundColor: "orange" }}>
                </div>
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <button
                    onClick={() => { setOpenModal(true) }}
                    disabled={!accountAddress ? false : true}
                    className='buttonAccount' >Create your Account</button>
            </div>

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
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <CreateItem />
                    </div>
                </>
                :
                ''
            }

            <GenerateAccountModal openModal={openModal} setOpenModal={setOpenModal} setAccountAddress={setAccountAddress} />
        </>
    )
}
