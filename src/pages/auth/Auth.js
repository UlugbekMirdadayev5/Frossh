import React, { useEffect, useState } from 'react';
import './auth.css';
import regleft from '../../assets/images/regleft.png';
import axios from 'axios';
// otp
// import OtpInput from 'react-otp-input';

// true modal
// import trudemodal from '../../assets/images/tru.png';
// import falsemodal from '../../assets/images/false.png';

export default function Auth() {
  const [islogin, setIslogin] = useState(false);
  // const [otp, setOtp] = useState('');
  // const [sms, setSms] = useState(true);
  // const [truemodal, setTruemodal] = useState(true);

  // register api

  useEffect(() => {
    axios;
  }, []);

  return (
    <div className="register">
      <div className="register-card">
        <div className="reg-card-left">
          <p> {islogin ? 'xisobga kirish' : 'Ro’yxatdan o’tish'}</p>
          <img src={regleft} alt="" />
        </div>
        <div className="reg-card-register">
          <form action="">
            <p>Malumotlaringizni kiriting</p>
            {islogin ? null : (
              <>
                <input type="text" name="" id="" placeholder="Ismingiz" />
                <input type="text" name="" id="" placeholder="Familiyangiz" />
              </>
            )}
            <input type="text" name="" id="" placeholder="+998" />
            <span>
              Hisobingiz bormi?{' '}
              <button type="button" onClick={() => setIslogin(true)}>
                Hisobga kirish
              </button>
            </span>

            <button type="button" onClick={() => setSms(true)}>
              Sms kod yuborish
            </button>
          </form>
        </div>
      </div>
      {/* {sms && (
        <div className="modal">
          <div className="modal-card">
            <p>Tasdiqlash kodini kriting!</p>
            <OtpInput
              inputStyle={{
                width: '77px',
                height: '77px',
                flexShrink: 0,
                margin: 18,
                borderRadius: 18,
                fontSize: 32
              }}
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderInput={(props) => <input {...props} />}
            />
            <span>00:59</span>
            <span>
              Kod kelmadimi? <button>Qayta yuborish</button>
            </span>

            <button onClick={() => setTruemodal(true)}>Yuborish</button>
          </div>
        </div>
      )} */}

      {/* <div className="modal-true">
        <div className="truecart">
          {truemodal ? (
            <>
              <img src={trudemodal} alt="" />
              <p>Siz muvaffaqiyatli ro’yxatdan o’tdingiz!</p>
              <button>Bosh menyu </button>
            </>
          ) : (
            <>
              <img src={falsemodal} alt="" />
              <p>Hatolik yuz berdi! Keynroq urinib ko’ring</p>
              <button style={truemodal ? { backgroundColor: '#2ECC71' } : { backgroundColor: '#E74C3C' }}>Bosh menyu </button>
            </>
          )}
        </div>
      </div> */}
    </div>
  );
}
