import React from 'react'
import LandingPage from './LandingPage'
import Testimonial from './Testimonoal'
import LatestNew from './LatestNew'
import Tranding from './Tranding'
const Home = () => {
  return (
    <div>
      <LandingPage />
      <Tranding />
      <Testimonial />
      <LatestNew/>
    </div>
  )
}

export default Home