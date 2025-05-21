import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchDetails = () => {
  const location = useLocation();
  const tripDetails = location.state;
  const navigate = useNavigate();
  
  // State for managing passenger selection
  const [passengers, setPassengers] = useState({
    adults: 0,
    children12To17: 0,
    children3To11: 0
  });
  
  const [selectedCoach, setSelectedCoach] = useState('Economy');
  const [totalFare, setTotalFare] = useState(0);
  
  // Calculate fare when passengers or coach type changes
  useEffect(() => {
    let fare = 0;
    if (selectedCoach === 'Economy') {
      fare += passengers.adults * 1500; 
      fare += passengers.children12To17 * 1500; 
      fare += passengers.children3To11 * 750; 
    } else if (selectedCoach === 'First Class') {
      fare += passengers.adults * 4500; 
      fare += passengers.children12To17 * 4500; 
      fare += passengers.children3To11 * 2250; 
    }
    setTotalFare(fare);
  }, [passengers, selectedCoach]);
  
  // Function to update passenger count
  const updatePassengerCount = (type, operation) => {
    setPassengers(prev => {
      const newCount = operation === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      return { ...prev, [type]: newCount };
    });
  };
  
  // Handle booking action
  const handleBookTrain = () => {
    if (totalFare === 0) {
      alert('Please select at least one passenger');
      return;
    }
    
    // Create booking details object
    const bookingDetails = {
      trip: data,
      coachType: selectedCoach.toUpperCase().replace(' ', '_'),
      passengers,
      totalFare
    };
    
    console.log('Booking details:', bookingDetails);
    alert('Proceeding to booking...');
    // Navigate to booking page with details
    // navigate('/booking', { state: bookingDetails });
  };
  
  // Toggle modify search section
  const toggleModifySearch = () => {
    const modifySection = document.getElementById('modify-search-section');
    if (modifySection.style.display === 'block') {
      modifySection.style.display = 'none';
    } else {
      modifySection.style.display = 'block';
    }
  };

  // Check if tripDetails is available
  if (!tripDetails) {
    return <div className="loading">No trip details available. Please try searching again.</div>;
  }

  // Extract schedule details for easier access
  const { data } = tripDetails;
  const { schedule } = data;
  const { departureStation, arrivalStation, train, departureTime } = schedule;

  return (
    <div className="search-details-container">
      {/* Header */}
      <div className="search-header">
        <h2>Search Results</h2>
        <button className="book-train-btn" onClick={handleBookTrain}>Book a Train</button>
      </div>

      {/* Search criteria summary */}
      <div className="search-criteria">
        <h3>Your Search:</h3>
        <div className="criteria-items">
          <div className="criteria-item">
            <span className="criteria-label">FROM:</span>
            <span className="criteria-value">{departureStation.name}</span>
          </div>
          <div className="criteria-item">
            <span className="criteria-label">TO:</span>
            <span className="criteria-value">{arrivalStation.name}</span>
          </div>
          <div className="criteria-item">
            <span className="criteria-label">DEPARTURE DATE:</span>
            <span className="criteria-value">{data.departureDate || 'Not specified'}</span>
          </div>
        </div>

        {/* Modify search section */}
        <div className="modify-search">
          <div className="modify-search-header" onClick={toggleModifySearch}>
            <h3>Modify Search</h3>
            <span className="toggle-icon">+</span>
          </div>
          <div id="modify-search-section" className="modify-search-content" style={{ display: 'none' }}>
            {/* Form would go here */}
          </div>
        </div>
      </div>

      {/* Train details */}
      <div className="train-details">
        <h2 className="train-title">Train {train.trainType === 'EXPRESS' ? 'E' : 'IC'}{train.id} - {departureStation.name} to {arrivalStation.name}</h2>

        <div className="train-options">
          {/* First class section */}
          <div className="coach-section">
            <h3 className="coach-title">FIRST CLASS - 30 SEATS OPEN</h3>
            <div className="fare-details">
              <div className="fare-item">
                <div className="fare-info">
                  <div className="passenger-type">ADULTS</div>
                  <div className="fare-price">KSH 4500</div>
                </div>
              </div>
              
              <div className="fare-item">
                <div className="fare-info">
                  <div className="passenger-type">CHILDREN (BTW 3 - 11YRS)</div>
                  <div className="fare-price">KSH 2250</div>
                </div>
              </div>
              
              <div className="fare-item">
                <div className="fare-info">
                  <div className="passenger-type">CHILDREN (BELOW 3YRS)</div>
                  <div className="fare-price">KSH 0 - FREE</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Economy section */}
          <div className="coach-section">
            <h3 className="coach-title">ECONOMY - 542 SEATS OPEN</h3>
            <div className="fare-details">
              <div className="fare-item">
                <div className="fare-info">
                  <div className="passenger-type">ADULTS</div>
                  <div className="fare-price">KSH 1500</div>
                </div>
              </div>
              
              <div className="fare-item">
                <div className="fare-info">
                  <div className="passenger-type">CHILDREN (BTW 3 - 11YRS)</div>
                  <div className="fare-price">KSH 750</div>
                </div>
              </div>
              
              <div className="fare-item">
                <div className="fare-info">
                  <div className="passenger-type">CHILDREN (BELOW 3YRS)</div>
                  <div className="fare-price">KSH 0 - FREE</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Journey details */}
          <div className="journey-details">
            <div className="departure">
              <h4>DEPARTURE: {
                departureTime === 'MORNING' ? '08:00 AM' :
                departureTime === 'AFTERNOON' ? '02:30 PM' : 
                departureTime === 'EVENING' ? '07:00 PM' : 'Not specified'
              }</h4>
            </div>
            <div className="arrival">
              <h4>ARRIVAL: {
                departureTime === 'MORNING' ? '01:30 PM' :
                departureTime === 'AFTERNOON' ? '08:00 PM' : 
                departureTime === 'EVENING' ? '12:30 AM' : 'Not specified'
              }</h4>
            </div>
          </div>
        </div>

        {/* Passenger selection section */}
        <div className="passenger-selection">
          <div className="route-info">
            <h3>{departureStation.name} to {arrivalStation.name}</h3>
            <div className="train-info">TRAIN : {train.trainType === 'EXPRESS' ? 'E' : 'IC'}{train.id}</div>
          </div>
          
          <div className="passenger-categories">
            <div className="category-column">
              <h4>ADULTS</h4>
              <div className="counter-control">
                <button onClick={() => updatePassengerCount('adults', 'subtract')}>-</button>
                <span>{passengers.adults}</span>
                <button onClick={() => updatePassengerCount('adults', 'add')}>+</button>
              </div>
            </div>
            
            <div className="category-column">
              <h4>CHILDREN (12-17YRS)</h4>
              <div className="counter-control">
                <button onClick={() => updatePassengerCount('children12To17', 'subtract')}>-</button>
                <span>{passengers.children12To17}</span>
                <button onClick={() => updatePassengerCount('children12To17', 'add')}>+</button>
              </div>
            </div>
            
            <div className="category-column">
              <h4>CHILDREN (3-11YRS)</h4>
              <div className="counter-control">
                <button onClick={() => updatePassengerCount('children3To11', 'subtract')}>-</button>
                <span>{passengers.children3To11}</span>
                <button onClick={() => updatePassengerCount('children3To11', 'add')}>+</button>
              </div>
            </div>
          </div>
          
          <div className="coach-selection">
            <h4>COACH TYPE</h4>
            <div className="dropdown">
              <select 
                value={selectedCoach} 
                onChange={(e) => setSelectedCoach(e.target.value)}
                className="coach-dropdown"
              >
                <option value="Economy">Economy</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
          </div>
          
          <div className="total-fare">
            <div className="fare-label">TOTAL FARE:</div>
            <div className="fare-amount">KSH {totalFare}</div>
          </div>
          
          <button className="book-btn" onClick={handleBookTrain}>Book a Train</button>
        </div>
      </div>
    </div>
  );
};

export default SearchDetails;