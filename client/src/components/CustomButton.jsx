import React from 'react'

const CustomButton = ({ title, active, onClick, className }) => {
  return (
    <button 
      className={`booking-button ${active ? 'active' : ''} ${className || ''}`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default CustomButton