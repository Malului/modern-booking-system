import React, { useState } from 'react';

const Form = ({ isPremium }) => {
  const [tripType, setTripType] = useState('one-way');
  const [trainType, setTrainType] = useState('');
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');

  const getStationOptions = () => {
    if (trainType === 'express') {
      return [
        { value: 'nairobi', label: 'Nairobi' },
        { value: 'mombasa', label: 'Mombasa' }
      ];
    } else if (trainType === 'inter-country') {
      return [
        { value: 'nairobi', label: 'Nairobi' },
        { value: 'mombasa', label: 'Mombasa' },
        { value: 'voi', label: 'Voi' },
        { value: 'mtito', label: 'Mtito Andei' },
        { value: 'kibwezi', label: 'Kibwezi' },
        { value: 'emali', label: 'Emali' }
      ];
    }
    return [];
  };

  const stations = getStationOptions();

  const handleSubmit = (event) => {
    event.preventDefault();
    const bookingData = {
      tripType,
      trainType,
      fromStation,
      toStation,
      departureDate,
      departureTime,
      returnDate: tripType === 'return' ? returnDate : null,
      returnTime: tripType === 'return' ? returnTime : null,
    };
    console.log('Booking Details:', bookingData);
    // Snd this data to an API endpoint here
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3>
        Madaraka Express - Online Booking {isPremium && <span className="crown-icon">👑</span>}
        {!isPremium && <span className="dot-icon">🔴</span>}
      </h3>
      
      {isPremium && (
        <div className="trip-selector">
          <label className={`trip-option ${tripType === 'one-way' ? 'selected' : ''}`}>
            <input 
              type="radio" 
              name="tripType" 
              value="one-way"
              checked={tripType === 'one-way'}
              onChange={() => setTripType('one-way')}
            />
            <span className="radio-custom"></span>
            One way
          </label>
          <label className={`trip-option ${tripType === 'return' ? 'selected' : ''}`}>
            <input 
              type="radio" 
              name="tripType" 
              value="return"
              checked={tripType === 'return'}
              onChange={() => setTripType('return')}
            />
            <span className="radio-custom"></span>
            Return trip
          </label>
        </div>
      )}
      
      <div className="form-fields">
        <div className="form-group">
          <label>TRAIN TYPE</label>
          <select value={trainType} onChange={(e) => setTrainType(e.target.value)} required>
            <option value="" disabled>Select...</option>
            <option value="express">Express</option>
            <option value="inter-country">Inter-Country</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>FROM</label>
          <select value={fromStation} onChange={(e) => setFromStation(e.target.value)} required>
            <option value="" disabled>Select...</option>
            {stations.map(station => (
              <option key={station.value} value={station.value}>{station.label}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>TO</label>
          <select value={toStation} onChange={(e) => setToStation(e.target.value)} required>
            <option value="" disabled>Select...</option>
            {stations.map(station => (
              <option key={station.value} value={station.value}>{station.label}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>DEPARTURE DATE</label>
          <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} required />
        </div>
        
        <div className="form-group">
          <label>DEPARTURE TIME</label>
          <select value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required>
            <option value="" disabled>Select...</option>
            <option value="morning">Morning (8:00 AM)</option>
            <option value="afternoon">Afternoon (2:30 PM)</option>
            <option value="evening">Evening (7:00 PM)</option>
          </select>
        </div>
      </div>
      
      {tripType === 'return' && isPremium && (
        <div className="form-fields return-fields">
          <div className="form-group">
            <label>RETURN DATE</label>
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required={tripType === 'return'} />
          </div>
          <div className="form-group">
            <label>RETURN TIME</label>
            <select value={returnTime} onChange={(e) => setReturnTime(e.target.value)} required={tripType === 'return'}>
              <option value="" disabled>Select...</option>
              <option value="morning">Morning (8:00 AM)</option>
              <option value="afternoon">Afternoon (2:30 PM)</option>
              <option value="evening">Evening (7:00 PM)</option>
            </select>
          </div>
        </div>
      )}
      
      <button type="submit" className="book-button">Book a Train</button>
    </form>
  );
};

export default Form;
