import React from 'react';
import { Link } from 'react-router-dom';
import { Fecebook, Instagram, Telegram, Appstore, GooglePlay } from 'assets/svgs';
import './style.css';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="f-about">
          <p>Frosh</p>
          <Link to="/about-us">Biz haqimizda!</Link>
          <Link to="/announcement/create">E’lon qo’shish</Link>
          <Link to="/profile">Shaxsiy kabinet</Link>
          <Link to="/auth">Ro’yxatdan o’tish</Link>
        </div>
        <div className="f-contact">
          <p>Biz bilan bog’laning</p>
          <a href="te:+998 90 222-43-11">+998 90 222-43-11</a>
          <a href="mailto:info@frosh.uz">info@frosh.uz</a>
          <a
            href="https://www.google.com/maps/place/Kamarsada+Dilkusho/@41.0007505,70.9283292,11z/data=!4m11!1m3!2m2!1sNamangan+viloyat,+chust+tumani,+kamarsada!6e1!3m6!1s0x38a4d5e3f9aa365f:0xacab3d2be9870dc2!8m2!3d41.0007505!4d71.2331998!15sCilOYW1hbmdhbiB2aWxveWF0LCBjaHVzdCB0dW1hbmksIGthbWFyc2FkYVopIiduYW1hbmdhbiB2aWxveWF0IGNodXN0IHR1bWFuaSBrYW1hcnNhZGGSAQpyZXN0YXVyYW504AEA!16s%2Fg%2F11pclhk749?entry=ttu"
            target="_blank"
            rel="noreferrer"
          >
            Namangan viloyat, chust tumani, kamarsada
          </a>
        </div>
        <div className="f-networks">
          <p>Bizning ijtimoiy tarmoqlarimiz</p>
          <div className="social">
            <Telegram />
            <Instagram />
            <Fecebook />
          </div>
          <div className="app-download">
            <img src={Appstore} alt="App-Store" />
            <img src={GooglePlay} alt="Google-Play" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
