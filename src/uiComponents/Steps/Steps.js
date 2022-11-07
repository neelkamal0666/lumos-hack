import React from 'react'
const step = [{
    text: "Issue NFTs to all the attendees. Just upload your NFT and csv file of attendees",
    image: '/images/image1.png',
    heading:'Event'
},
{
    text: "Issue certificates, experience letter, and other verifiable documents as NFT",
    image: '/images/image2.png',
    heading:'Organisation'

},
{
    text: " Issue degree, certificates, marksheets and other verifiable documents as NFT",
    image: '/images/image3.png',
    heading:'Schools & Universities'

}]
export const Steps = () => {
    return (
        <div className='my-[30px] grid grid-cols-3 mx-[100px] gap-1'>
            {step.map((steps)=>{
                return <div class="w-[400px]rounded-3xl overflow-hidden shadow-lg">
                <img class="w-[100%] h-[264px] " src={steps.image} alt="Sunset in the mountains" />
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{steps.heading}</div>
                    <p class="text-gray-700 text-base">
                        {steps.text}
                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">

                </div>
            </div>
            })}
        </div>
    )
}
