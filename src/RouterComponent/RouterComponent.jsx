import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { appActions } from '../context/app-slice'
import useHttp from '../hooks/use-http'
import { ClaimYourRewar } from '../uiComponents/claim/ClaimYourRewar'
import CreateItem from '../uiComponents/Mint-NFTs\'/CreateItem'
import Mint from '../uiComponents/Mint-NFTs\'/Mint'
import { Home } from '../uiComponents/pages/generateAccount/Home/Home'
import { LoginOtp } from '../uiComponents/pages/generateAccount/LoginOtp/LoginOtp'

export const RouterComponent = () => {
  const [claimReward, setClaimedReward] = useState(false);
  const [ipfsUrl, setIpfsUrl] = useState('');
  const [nftData, setNftData] = useState({});
  const appCtx = useSelector((state) => state.app);
  const makeRequest = useHttp();
  const dispatch = useDispatch();
//   useEffect(() => {
//     makeRequest(
//         {
//             url: `https://bs-dev.api.onnftverse.com/v1/external/metadata/ipfs/upload`,
//             data: {
//                 "name": "Lumos Hack",
//                 "description": "Hackathon",
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
//             dispatch(
//                 appActions.paymentData({
//                     ipfsUrl: data.ipfsUrl.substring(7, data.ipfsUrl.length), 
//                     ipfsHash: appCtx.paymentData.ipfsHash
//                 })
//             )
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
// }, [ dispatch, makeRequest])
    return (
        <Routes>
            <Route path="/" element={<Home claimReward={claimReward} setClaimedReward={setClaimedReward}/>} />
            <Route path='/create' element={ <CreateItem setIpfsUrl={setIpfsUrl} setNftData={setNftData}/>}></Route>
            {/* <Route path='create/:id' element={appCtx.isLoggedIn ? <Create /> : <Navigate to={"/login"} />}></Route> */}
            <Route path ="mint/:id" element={<Mint setIpfsUrl={setIpfsUrl} setNftData={setNftData}/>} />
            <Route path ="/loginotp" element={<LoginOtp />} />
            <Route path ="/claimreward/:id" element={<ClaimYourRewar claimReward={claimReward} setClaimedReward={setClaimedReward} ipfsUrl={ipfsUrl} nftData={nftData}/>} />
        </Routes>
    )
}
