import { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import './style.css';
import * as icons from 'assets/svgs';
import { Card } from 'components/card';

const Single = () => {
  const { id } = useParams();
  const swiperRef = useRef(null);
  const thumbsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const slideToIndex = useCallback((index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
    if (thumbsRef.current && thumbsRef.current.swiper) {
      thumbsRef.current.swiper.slideTo(index);
    }
  }, []);
  const handleChange = ({ activeIndex }) => {
    slideToIndex(activeIndex);
    setActiveIndex(activeIndex);
  };
  const sliderData = Array.from({ length: 6 }, (_, i) => i);
  return (
    <div className="container announcements">
      <h2 className="title">Namangan, Davlatobod, 5-kichik noxiya 1-uy {id}</h2>
      <div className="row">
        <div className="space">
          <div className={`slider ${open ? 'open' : ''}`}>
            <button onClick={() => setOpen(false)} className="closer">
              <icons.Exit />
            </button>
            <Swiper ref={swiperRef} onSlideChange={handleChange} onClick={() => setOpen(!open)} className="top-slider" spaceBetween={35}>
              {sliderData.map((slide) => (
                <SwiperSlide key={slide}>
                  <img src={`https://picsum.photos/1053/${500 + slide}`} alt="img-slide" />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper ref={thumbsRef} onSlideChange={handleChange} className="thumbs-container" slidesPerView={'auto'} spaceBetween={35}>
              {sliderData.map((image) => (
                <SwiperSlide key={image} onClick={() => handleChange({ activeIndex: image })}>
                  <img
                    className={activeIndex === image ? 'active' : undefined}
                    src={`https://picsum.photos/1053/${500 + image}`}
                    alt="img-thumb"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="progressbar">
              <div className="filled" style={{ '--percent': `${(activeIndex + 1) * 10}%` }}></div>
              <p className="absolute-center">{activeIndex + 1}/10</p>
            </div>
          </div>
        </div>
        <div className="between">
          <div className="user-info">
            <div className="avatar">
              <img src={`https://picsum.photos/100/100`} alt="user-avatar" />
            </div>
            <div className="column">
              <h3 className="h3">Name Surname</h3>
              <span>Sizning hisob raqamingiz: 123456</span>
              <a href="tel:+998 90 ***-**-**">+998 90 ***-**-**</a>
            </div>
          </div>
          <h3 className="h3">Narx</h3>
          <ul className="values">
            <li>
              <span>50.000.000</span> UZS/m²
            </li>
            <li>
              <span>50.000.000</span> UZS/sotix
            </li>
            <li>
              <span>1.000.000 </span>UZS
            </li>
          </ul>
          <h3 className="h3">Oldindan to’lov</h3>
          <ul className="values">
            <li>1 oylik</li>
          </ul>
          <ul className="options">
            <li>
              <icons.Floor />
              <span className="h3">3-qavat</span>
            </li>
            <li>
              <icons.Room />
              <span className="h3">5 xona</span>
            </li>
            <li>
              <icons.Quadrad />
              <span className="h3">120 m²</span>
            </li>
            <li>
              <icons.Home />
              <span className="h3">6 sotix</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="more-infos">
        <ul>
          <li className="caption">Qo’shimcha :</li>
          <li className="comment">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi voluptatum laborum
            numquam blanditiis Veritatis obcaecati tenetur rovident similique accusantium nemo autem.
          </li>
        </ul>
        <ul className="values">
          <li className="caption">Umumiy ma’lumot</li>
          <li>
            <p>Xonalar soni</p>
            <p>5</p>
          </li>
          <li>
            <p>Umumiy joy</p>
            <p>120m²</p>
          </li>
          <li>
            <p>Tamir</p>
            <p>Evro</p>
          </li>
          <li>
            <p>Dush</p>
            <p>Bor</p>
          </li>
          <li>
            <p>Balkon</p>
            <p>Bor</p>
          </li>
          <li>
            <p>Oynadan korinish</p>
            <p>Hovli</p>
          </li>
          <li>
            <p>Lift</p>
            <p>Bor</p>
          </li>
          <li>
            <p>Qurilgan yil</p>
            <p>1999</p>
          </li>
        </ul>
        <ul className="values">
          <li className="caption">Qo’shimcha qulayliklar</li>
          <li>
            <icons.Gas />
            <span>Gaz</span>
          </li>
          <li>
            <icons.Water />
            <span>Suv</span>
          </li>
          <li>
            <icons.Electric />
            <span>Elektr energiya</span>
          </li>
          <li>
            <icons.Wifi />
            <span>Internet</span>
          </li>
          <li>
            <icons.AirCondition />
            <span>Konditsioner</span>
          </li>
          <li>
            <icons.Refrigerator />
            <span>Muzlatgich</span>
          </li>
          <li>
            <icons.TvIcon />
            <span>Televizor</span>
          </li>
          <li>
            <icons.Washing />
            <span>Kiryuvish mashinasi</span>
          </li>
        </ul>
      </div>

      <iframe
        className="iframe"
        title="Tashkent"
        src="https://yandex.uz/map-widget/v1/?ll=69.270168%2C41.311937&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgk3NzEyODg4ODUSFk_Ku3piZWtpc3RvbiwgVG9zaGtlbnQiCg06j4pCFaA-JUI%2C&z=15.32"
        allowFullScreen
      />
      <h3 className="title">O’xshash e’lonlar</h3>
      <div className="row">
        {[1, 2, 3, 4].map((slide) => (
          <Card key={slide} item={slide} />
        ))}
      </div>
    </div>
  );
};

export default Single;
