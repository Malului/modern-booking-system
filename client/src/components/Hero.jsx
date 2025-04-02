import React, { useState } from 'react'
import CustomButton from './CustomButton'
import Form from './Form'

const Hero = () => {
  const [activeForm, setActiveForm] = useState('standard'); // 'standard' or 'premium'

  return (
    <section className='hero'>
      <div className='hero-content'>
        <div className='hero-desc'>
          <h1>MADARAKA EXPRESS PASSENGER SERVICE</h1>
          <h2>Elevate your rail travel experience</h2>
          <p>comfort. convenience. elegance</p>
        </div>

        <div className='hero-booking'>
          <div className='hero-booking_buttons'>
            <CustomButton
              title={<><span className="icon">🔴</span> Madaraka Express</>}
              active={activeForm === 'standard'}
              onClick={() => setActiveForm('standard')}
              className="standard-btn"
            />
            <CustomButton 
              title={<><span className="icon">👑</span> Book Premium</>}
              active={activeForm === 'premium'}
              onClick={() => setActiveForm('premium')}
              className="premium-btn"
            />
          </div>

          <div className='hero-booking_forms'>
              <Form isPremium={activeForm === 'premium'} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero