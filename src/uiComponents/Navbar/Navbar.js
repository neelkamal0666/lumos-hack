import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div style={{display:"flex",alignItems:"center",padding:"10px 0px 10px 0px",borderBottom:"1px solid black"}} className="mb-[]">
            <div style={{width:"34px",margin:"0px 15px 0px 15px",cursor:"pointer" }} onClick={()=>navigate('/')}><img style={{width:'100%'}} src="/images/nftblacklogo.png" alt='' /></div>
            <div style={{fontWeight:"bold"}}>
                NFTVerse
            </div>
        </div>
    )
}
