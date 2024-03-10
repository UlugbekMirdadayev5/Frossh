import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OtpInput from 'react-otp-input';
import Cookies from 'js-cookie';
import regleft from '../../assets/images/regleft.png';
import trudemodal from '../../assets/images/tru.png';
import falsemodal from '../../assets/images/false.png';
import './auth.css';

// Сохранить токен в cookie

export default function Auth() {
  const [islogin, setIslogin] = useState(false);
  const [num, setNum] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const [sms, setSms] = useState(false);
  const [otp, setOtp] = useState('');
  const [code, setCode] = useState(true);
  const [truemodal1, setTruemodal] = useState(false);
  const [Send, setSend] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [unreg, setUnreg] = useState(false);
  //regist

  
  const onRegister = (data) => {
    axios
      .post(
        'https://api.frossh.uz/api/auth/register',
        {
          last_name: data.lastName,
          first_name: data.firstName,
          birth_date: data.date,
          phone_number: data.phone
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      )
      .then(({ data }) => {
        console.log(data);
        setSms(true);
        setNum(data.phone);
        reset();
      })
      .catch((error) => {
        console.log(error.response.data);
        setIslogin(true);
        setUnreg(true);
      });
  };

  //Code/verification
  const onVerificationCode = async (data) => {
    await axios
      .post(
        'https://api.frossh.uz/api/auth/verify',
        {
          code: data,
          phone_number: num
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      )
      .then((response) => {
        console.log(response.data);

        if (response.data.result != {}) {
          console.log('omad');
          setCode(true);
          setSend(true);
          setTruemodal(true);
          Cookies.set('token', response.data.result.token);
        } else {
          setTruemodal(true);
        }
      })

      .catch((error) => {
        if (
          error.response.data.result == 'Code is not correct.' ||
          error.response.data.result == 'The code field is required.' ||
          error.response.data.message == 'The code must be at least 4 characters.'
        ) {
          console.log('omad');
          setCode(false);
          setTruemodal(false);
          setSend(true);
        } else {
          setCode(true);
          setTruemodal(true);
          setSend(true);
        }
      });
  };

  // useEffect
  // api/auth/resend
  //Login
  const onLogin = async (data) => {
    console.log(data.phone);

    await axios
      .post(
        'https://api.frossh.uz/api/auth/login',
        {
          phone_number: data.phone
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.result == 'Successfully sent code.') {
          console.log('omad');
          setNum(data.phone);
          setSms(true);
          console.log(sms);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log('hato');
      });
    reset();
  };

  const onResendMessage = async (data) => {
    console.log(data);

    await axios
      .post(
        'https://api.frossh.uz/api/auth/resend',
        {
          code: data,
          phone_number: num
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      )
      .then((response) => {
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const onUpdate = async (data) => {
    const token = Cookies.get('token');
    await axios
      .put(
        'https://api.frossh.uz/api/user/update',
        {
          last_name: data.lastName,
          first_name: data.firstName
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleLogout = async () => {
    const token = Cookies.get('token');
    console.log(token);
    await axios
      .post(
        'https://api.frossh.uz/api/auth/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error.response.data);
      });
    Cookies.remove('token');
    setUnreg(true);

    reset();
  };

  return (
    <div className="register">
      <div className="register-card">
        <div className="reg-card-left">
          <p> {islogin ? 'xisobga kirish' : 'Ro’yxatdan o’tish'}</p>
          <img src={regleft} alt="images-left" />
        </div>
        <div className="reg-card-register">
          <form onSubmit={handleSubmit(refresh ? onUpdate : unreg ? onLogin : onRegister)}>
            <p>Malumotlaringizni kiriting</p>
            {unreg ? null : (
              <>
                <input {...register('firstName', { required: true })} type="text" placeholder="Ismingiz" />
                {errors.firstName && <span></span>}
                <input {...register('lastName', { required: true })} type="text" placeholder="Familiyangiz" />
                {/* {errors.lastName && <span>This field is required</span>} */}

                <div>
                  <input {...register('date', { required: true })} type="date" placeholder="date" />

                  {/* {errors.lastName && <span>This field is required</span>} */}
                </div>
              </>
            )}
            {islogin ? (
              <span>Siz Muofaqyatli otingiz</span>
            ) : (
              <div className="ph">
                <input {...register('phone', { required: true })} type="text" placeholder="+998" />

                {/* {errors.phone && <span>This field is required</span>} */}
                <span>
                  Hisobingiz bormi?{' '}
                  <button type="button" onClick={() => setIslogin(true)}>
                    Hisobga kirish
                  </button>
                </span>
              </div>
            )}
            {unreg ? '' : <button type="submit">Sms kod yuborish</button>}

            {refresh ? (
              <div className="refresh">
                <input {...register('firstName', { required: true })} type="text" placeholder="Ismingiz" />
                {errors.firstName && <span></span>}
                <input {...register('lastName', { required: true })} type="text" placeholder="Familiyangiz" />
                {/* {errors.lastName && <span>This field is required</span>} */}
              </div>
            ) : null}

            {refresh ? <button onClick={() => setRefresh(false)}>Back</button> : null}
            {islogin ? <button onClick={() => handleLogout()}>Log out</button> : null}
            {/* {islogin ? <button onClick={() => setRefresh(true)}>Refresh</button> : null} */}
          </form>
        </div>
      </div>
      {sms && (
        <div className="modal">
          <div className="modal-card">
            {/* <button onClick={() => setSms(false)}>X</button> */}
            <p>Tasdiqlash kodini kriting!</p>
            <OtpInput
              inputStyle={{
                width: '77px',
                height: '77px',
                flexShrink: 0,
                margin: 18,
                borderRadius: 18,
                fontSize: 32,
                border: '1px solid black'
              }}
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderInput={(props) => <input {...props} />}
            />
            <span>00:59</span>
            {code ? null : <span>Code is not correct.</span>}
            <span>
              Kod kelmadimi? <button onClick={() => onResendMessage(otp)}>Qayta yuborish</button>
            </span>

            {/* <button onClick={() => setTruemodal(true)}>Yuborish</button> */}

            <button onClick={() => onVerificationCode(otp)}>Yuborish</button>
          </div>
        </div>
      )}

      {Send ? (
        <div className="modal-true">
          <div className="truecart">
            {truemodal1 ? (
              <>
                <img src={trudemodal} alt="" />
                <p>Siz muvaffaqiyatli ro’yxatdan o’tdingiz!</p>
                <button onClick={() => navigate('/')}>Bosh menyu </button>
              </>
            ) : (
              <>
                <img src={falsemodal} alt="" />
                <p>Hatolik yuz berdi! Keynroq urinib ko’ring</p>
                <button style={truemodal1 ? { backgroundColor: '#2ECC71' } : { backgroundColor: '#E74C3C' }} onClick={() => navigate('/')}>
                  Bosh menyu{' '}
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
