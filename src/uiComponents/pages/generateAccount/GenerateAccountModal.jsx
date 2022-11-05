import CloseIcon from '@mui/icons-material/Close';
import { Download, DownloadDone } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import EastIcon from '@mui/icons-material/East';
const ethWallet = require('ethereumjs-wallet');

function GenerateAccountModal({ openModal, setOpenModal,setAccountAddress }) {
    const [mnemonic, setMnemonic] = useState('');
    const [checked, setChecked] = useState(true)
    const [mnemonicCode, setMnemonicCode] = useState('');
    const [loader, setLoader] = useState(false);
    let AccountData = ethWallet['default'].generate();

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            padding: "0",
            borderRadius: "10px",
            transform: "translate(-50%, -50%)",
            width:"370px"
        },
    };
    const downloadParaphrase = async () => {

        // console.log("keys", keys);
        const element = document.createElement("a");
        const file = new Blob([AccountData.getPrivateKeyString()], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "ParaPhrase.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        // dispatch(appActions.setWalletAddress([{ address: keys.addr }]));
        // dispatch(appActions.login(true));
        // navigate('/wallet');
    }
    const generateAccount = async () => {
        const element = document.createElement("a");
        const file = new Blob([AccountData.getPrivateKeyString()], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "ParaPhrase.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        // dispatch(appActions.setWalletAddress([{ address: keys.addr }]));
        // dispatch(appActions.login(true));
        // navigate('/wallet');
        // setOpenModal(false);
        // dispatch(appActions.setWalletLoading(false));
        setAccountAddress(AccountData.getAddressString());
        localStorage.setItem('accountAddress',AccountData.getAddressString())
        closeModal();
    }
    function closeModal() {
        setOpenModal(false);
    }

    return (
        <Modal isOpen={openModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal" ariaHideApp={false}>
            <div
                className="flex flex-col items-center"
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                <div
                    className="flex  justify-center gap-32 items-center w-full bg-[#bbff00] p-6"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", }}
                >
                    {/* <div className="text-xl font-bold  px-8">Yay! Congratulations on your purchase.</div> */}
                    {/* <Link to={`/explore/${nftId}`}>
                    <button className=" font-bold leading-[10px] text-gray-500 absolute  right-6" onClick={closeModal}>
                        X
                    </button>
                    </Link> */}
                    <div>
                        <div
                            className=" font-bold leading-[10px] text-gray-500 absolute  right-6"
                            style={{ fontWeight: "bold", color: "gray", position: "absolute", right: "20px" }}
                            onClick={() => {
                                // navigate(`/explore`);
                                closeModal();
                            }}
                        >
                            <CloseIcon />
                        </div>
                    </div>
                </div>

                <div
                    className="flex flex-col py-2 px-24 items-center"
                    style={{ display: "flex", flexDirection: "column", padding: "30px 10px 10px 10px",rowGap:"18px" }}
                >
                    <div className="w-[100%] text-right" style={{display:"flex",justifyContent:"flex-end",alignItems:"center",width:"100%"}}><button onClick={() => downloadParaphrase()} style={{display:"flex",justifyContent:"center",alignItems:"center"}}><span>Secret Key</span><Download /></button></div>
                    <div className="" style={{display:"flex",flexDirection:"column"}}>
                        <div className='' style={{width:"100%",textAlign:"center",fontWeight:"bold"}}>Your Secret Key:</div>
                        <div style={{wordBreak:"break-word",textAlign:"justify",fontWeight:"500"}} className="font-medium text-justify"><span className="font-bold ml-[10px]">{AccountData.getPrivateKeyString()}</span></div>
                    </div>
                    <button primary={true} className='buttonAccount' onClick={() => generateAccount()}>Generate Account</button>
                </div>
            </div>
        </Modal>
    );
}

export default GenerateAccountModal;
