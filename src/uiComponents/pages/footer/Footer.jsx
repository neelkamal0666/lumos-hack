import React from 'react'

export const Footer = () => {
    return (
        <div className='w-[100%] py-[30px] flex justify-around items-center'>
            <div className='flex items-center w-[50%]'><img src="/images/nftblacklogo.png" className='w-[50px]' alt=''/><spam className="ml-[10px]">Powered By NFTVerse</spam></div>
            <div className="lg:w-[320px]">
                <div className="flex justify-between w-auto">
                    <div className="max-w-[18%] flex justify-center items-center w-auto cursor-pointer" onClick={() => { window.open('https://www.instagram.com/_nftverse/', '_blank') }}><img src="/images/instagramdark.svg" alt="logo" className={`w-[50px]`} /></div>
                    <div className="max-w-[18%] flex justify-center items-center w-auto cursor-pointer" onClick={() => { window.open('https://www.linkedin.com/company/nftverse/', '_blank') }}><img src="/images/linkedindark.svg" alt="logo" className={`w-[50px]`} /></div>
                    <div className="max-w-[18%] flex justify-center items-center w-auto cursor-pointer" onClick={() => { window.open('https://twitter.com/onnftverse?s=20&t=d9xAcEQONstJWodcG-8sUA', '_blank') }}><img src="/images/twitterdark.svg" alt="logo" className={`w-[50px]`} /></div>
                    <div className="max-w-[18%] flex justify-center items-center w-auto cursor-pointer" onClick={() => { window.open('https://www.facebook.com/onnftverse', '_blank') }}><img src="/images/facebookdark.svg" alt="logo" className={`w-[50px]`} /></div>
                    <div className="max-w-[18%] flex justify-center items-center w-auto cursor-pointer" onClick={() => { window.open('https://discord.gg/tbs47P7gDW', '_blank') }}><img src="/images/discorddark.svg" alt="logo" className={`w-[50px]`} /></div>
                </div>
            </div>
        </div>
    )
}
