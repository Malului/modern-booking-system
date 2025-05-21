import React from 'react'

const Navbar = () => {
    const navLinks = [
        {title: 'Book a Train', url: '/'},
        {title: 'Manage Premium Booking', url: '/'},
        {title: 'Stations', url: '/stations'},
        {title: 'About Us', url: '/about-us'}
    ]

  return (
    <nav>
        <div className='nav-image'>
            <img src='./src/assets/madaraka.png' alt="logo" width={'80px'} height={'80px'}/>
        </div>

        <ul className='nav-links'>
            {navLinks.map((item, index) => (
                <li key={index}>
                    <a 
                        href={item.url}
                        alt={item.title}                    
                    >
                        {item.title}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Navbar