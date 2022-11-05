import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import CreateItem from '../uiComponents/Mint-NFTs\'/CreateItem'
import Mint from '../uiComponents/Mint-NFTs\'/Mint'
import { Home } from '../uiComponents/pages/generateAccount/Home/Home'

export const RouterComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/create' element={ <CreateItem />}></Route>
            {/* <Route path='create/:id' element={appCtx.isLoggedIn ? <Create /> : <Navigate to={"/login"} />}></Route> */}
            <Route path ="mint/:id" element={<Mint />} />
        </Routes>
    )
}
