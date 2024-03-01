import React from 'react';

export default function UserDashboard() {
  return (
    <div className="person">
      <div className="p-left">
        <div className="p-left-top">
          <div className="user-img"></div>
          <div className="p-text-info">
            <p>Name Surname</p>
            <span>Sizning hisob raqamingiz: 123456</span>
            <b>+998 90 113-22-11</b>
          </div>
        </div>
        <form action="">
          <label htmlFor="">
            <p>Ism:</p>
            <input type="text" placeholder="Name" />
          </label>
          <label htmlFor="">
            <p>Familiya:</p>
            <input type="text" placeholder="Surname" />
          </label>
          <label htmlFor="">
            <p>Viloyat:</p>
            <input type="text" placeholder="Namangan" />
          </label>
          <label htmlFor="">
            <p>Shahar:</p>
            <input type="text" placeholder="Chust" />
          </label>
          <button>Saqlash </button>
        </form>
      </div>
      <div className="p-right">
        <span>FROSH.UZ saytini tanlaganingizdan mamnunmiz. </span>
      </div>
    </div>
  );
}
