import React from 'react'
import { Navbar } from '../../../Navbar/Navbar'
import { Footer } from '../../footer/Footer'

import { GenerateAccount } from '../GenerateAccount'

export const Home = ({claimReward,setClaimedReward}) => {
  return (
    <div>
      <Navbar />
      <GenerateAccount claimReward={claimReward} setClaimedReward={setClaimedReward}/>
      <Footer />
    </div>
  )
}
