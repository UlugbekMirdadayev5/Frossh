import React, { useState } from 'react';
import './auth.css';
import regleft from '../../assets/images/regleft.png';
import axios from 'axios';

export default function Auth() {
  const [islogin, setIslogin] = useState(false);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValidPhoneNumber = (phoneNumber) => {
      const phoneRegex = /^[+]?[0-9]{7,15}$/;
      return phoneRegex.test(phoneNumber);
    };

    if (!isValidPhoneNumber(phoneNumber)) {
      console.error('Invalid phone number format');
      return;
    }

    const url = 'https://api.frossh.uz/api/auth/register';
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    const body = {
      last_name: lastName,
      first_name: firstName,
      birth_date: '1999-12-31',
      phone_number: '998' + phoneNumber
    };

    try {
      const response = await axios.post(url, body, { headers });
      console.log(response.data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="register">
      <div className="register-card">
        <div className="reg-card-left">
          <p>{islogin ? 'Hisobga kirish' : 'Ro’yxatdan o’tish'}</p>
          <img src={regleft} alt="" />
        </div>
        <div className="reg-card-register">
          <form onSubmit={handleSubmit}>
            <p>Malumotlaringizni kiriting</p>
            {islogin ? null : (
              <>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Ismingiz" required />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Familiyangiz" required />
              </>
            )}
            <input type="date" />
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Telefon raqami"
              required
            />
            <span>
              Hisobingiz bormi?{' '}
              <button type="button" onClick={() => setIslogin(true)}>
                Hisobga kirish
              </button>
            </span>
            <button type="submit">{islogin ? 'Hisobga kirish' : 'Ro’yxatdan o’tish'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
