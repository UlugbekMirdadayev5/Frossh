/* eslint-disable react/prop-types */
import { useState, useRef, useCallback } from 'react';
import { Arrow, Close, ImagePicker, LoadingIcon, Pen, Save } from 'assets/svgs';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatFileSize } from 'utils';
import Select from 'components/select';
import { useForm } from 'react-hook-form';
import Checkbox from 'components/checkbox';
import './style.css';
import MapContainer from 'components/GoogleMap';
import { getCoorDinates } from 'utils/location';

const handleRemoveImage = (image, element, seTimgFiles, setActiveIndex) => {
  setActiveIndex((index) => index - 1);
  element?.current?.classList?.add('this-removed');
  setTimeout(() => {
    seTimgFiles((files) => files.filter((item) => item.id !== image.id));
  }, 500);
};
export const ImageRow = ({ image, seTimgFiles, setActiveIndex }) => {
  const ref = useRef();
  const [scale, setScale] = useState(0);

  return (
    <Swiper
      direction={'vertical'}
      className="inner-slider"
      onProgress={(_, progress) => {
        setScale(progress > 1 ? 1 : progress);
      }}
      onSlideChange={(swiper) => {
        if (swiper.activeIndex === 1) {
          handleRemoveImage(image, ref, seTimgFiles, setActiveIndex);
        }
      }}
    >
      <SwiperSlide>
        <button type="button" key={image.id} ref={ref}>
          <Close className="remover" onClick={() => handleRemoveImage(image, ref, seTimgFiles, setActiveIndex)} />
          <img src={image.path} alt={`uploaded-img ${image.id}`} />
          <p className="file-size">{formatFileSize(image.size)}</p>
        </button>
      </SwiperSlide>
      <SwiperSlide>
        <div style={{ opacity: scale, scale: `${scale} 1` }} className="slide-trasher">
          <Close style={{ opacity: Math.round(scale) }} />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

const CreateAnnouncement = () => {
  const [imgFiles, seTimgFiles] = useState([]);
  const [keyCounter, setKeyCounter] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState({
    lat: 40.98,
    lng: 71.58
  });
  const [mapsArray, setMapArray] = useState([]);

  const sliderRef = useRef();

  const handleFileSelection = (event) => {
    const selectedImages = event.target.files;
    const validFiles = Array.from(selectedImages).filter((file) => file.size <= 10 * 1024 * 1024);
    const invalidFiles = Array.from(selectedImages).filter((file) => file.size > 10 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      // 10 MB dan katta bo'lgan fayllar qo'shilgan
      toast.error(`Quyidagi fayllar 10 MB dan katta: ${invalidFiles.map((file) => file.name).join(', ')}`);
    }
    setKeyCounter((prevCounter) => prevCounter + 1);
    // console.log(Array.from(selectedImages).map((file) => file.name));
    const arrayImages = Array.from(validFiles).map((path, index) => ({
      id: `unikey-${imgFiles?.length + index + URL.createObjectURL(path)}`,
      path: URL.createObjectURL(path),
      size: path.size
    }));

    if ([...imgFiles, ...arrayImages].length > 10) {
      toast.error("10 tadan ko'p rasmlar tanlash mumkin emas!");
      return;
    }
    seTimgFiles((files) => {
      const values = [...arrayImages, ...files];
      setActiveIndex(values.length);
      return values;
    });

    // KeyCounter ni o'zgartirish bilan input ni reset qilamiz
  };

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
    setError
  } = useForm({
    defaultValues: {
      holati: '',
      joy: '',
      month: '',
      tur: '',
      type: '',
      prepayment: null,
      year_of_construction: '',
      number_of_rooms: '',
      total_place: '',
      address: ''
    }
  });

  const handleGetCordinate = (value) => {
    if (!value) return null;
    setIsLoading(true);
    getCoorDinates(value)
      .then(({ data }) => {
        setIsLoading(false);
        if (data.status.message === 'OK') {
          setMapArray(data?.results);
          if (data?.results?.length === 1) {
            setValue('address', String(data?.results[0]?.formatted)?.replace('unnamed road,', ''));
            setLocation(data?.results[0]?.geometry);
            setMapArray([]);
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      });
  };

  const onSubmit = (values) => {
    if (!getValues('address')) return setError('address');
    values.address = {
      name: values.address,
      geometry: location
    };
    console.log(values);
  };

  return (
    <form className="container announcements" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="space">
          <div className="inner">
            <label
              htmlFor="upload_img"
              className="file_uploader"
              aria-hidden
              onClick={imgFiles.length === 10 ? () => toast.error("10 tadan ko'p rasmlar tanlash mumkin emas!") : null}
            >
              <ImagePicker />
              <span>Rasm joylash</span>
              <small>10ta rasm gacha / 10mb dan katta bo’lmasligi kerak</small>
              <input
                disabled={imgFiles.length === 10}
                key={keyCounter}
                type="file"
                hidden
                id="upload_img"
                accept="image/*"
                multiple
                onChange={handleFileSelection}
              />
            </label>
            {imgFiles.length > 0 && (
              <div className="slider-wrapper">
                <button className="prev-btn" type="button" onClick={handlePrev}>
                  <Arrow />
                </button>

                <Swiper ref={sliderRef} className="uplodaed-images" slidesPerView={'auto'} spaceBetween={26}>
                  {imgFiles.map((image) => (
                    <SwiperSlide className="slide-item-1" key={image.id}>
                      <ImageRow image={image} seTimgFiles={seTimgFiles} setActiveIndex={setActiveIndex} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button className="next-btn" type="button" onClick={handleNext}>
                  <Arrow />
                </button>
              </div>
            )}
            <button type="button" disabled={!imgFiles.length} className="image-saver">
              <span>Saqlash</span>
              <Save />
            </button>
          </div>
          <div className="progressbar">
            <div className="filled" style={{ '--percent': `${activeIndex * 10}%` }}></div>
            <p className="absolute-center">{activeIndex}/10</p>
          </div>
        </div>
        <div className="between right-bar_">
          <Select
            error={errors['tur']}
            name={'tur'}
            label={'Turini tanlang'}
            options={[
              {
                value: 'Sotix',
                label: 'Sotix'
              },
              {
                value: 'M²',
                label: 'M²'
              },
              {
                value: 'Quruq yer',
                label: 'Quruq yer'
              }
            ]}
            control={control}
            required
          />
          <Select
            error={errors['joy']}
            name={'joy'}
            label={'Joy turini tanlang'}
            options={[
              {
                value: 'Kvartira',
                label: 'Kvartira'
              },
              {
                value: 'Xonadon',
                label: 'Xonadon'
              },
              {
                value: 'Quruq yer',
                label: 'Quruq yer'
              },
              {
                value: 'Biznes uchun joy',
                label: 'Biznes uchun joy'
              },
              {
                value: 'Turar joy majmuasi',
                label: 'Turar joy majmuasi'
              }
            ]}
            control={control}
            required
          />
          <Select
            error={errors['holati']}
            name={'holati'}
            label={'Ta’mir holati'}
            options={[
              {
                value: 'Yomon',
                label: 'Yomon'
              },
              {
                value: 'O’rtacha',
                label: 'O’rtacha'
              },
              {
                value: 'Yaxshi',
                label: 'Yaxshi'
              }
            ]}
            control={control}
            required
          />
          <Select
            defaultOpened
            error={errors['type']}
            name={'type'}
            label={'Turini tanlang'}
            options={[
              {
                value: 'Sotish',
                label: 'Sotish'
              },
              {
                value: 'Ijaraga berish',
                label: 'Ijaraga berish'
              }
            ]}
            control={control}
            required
          />
        </div>
      </div>
      <h3 className="h3">Narx*</h3>
      <div className="inputs-row">
        <label className={`input-label ${errors['total-price'] ? 'error' : ''}`}>
          <input type="number" placeholder="100.000.000" {...register('total-price', { required: true })} />
          <span>UZS</span>
          <Pen />
        </label>
        <label className={`input-label ${errors['per-month-price'] ? 'error' : ''}`}>
          <input type="number" placeholder="100.000.000" {...register('per-month-price', { required: true })} />
          <span>UZS/M²</span>
          <Pen />
        </label>
        <label className={`input-label ${errors['per-month-price2'] ? 'error' : ''}`}>
          <input type="number" placeholder="100.000.000" {...register('per-month-price2', { required: true })} />
          <span>UZS/Sotix</span>
          <Pen />
        </label>
      </div>
      <div className="inputs-row">
        <div className="space_left">
          <h3 className="h3">Oldindan to’lov*</h3>
          <div className="checkboxes">
            <Checkbox type="radio" label={'Bor'} value="Bor" required name="prepayment" error={errors['prepayment']} register={register} />
            <Checkbox
              type="radio"
              label={'Yo’q'}
              value="Yo'q"
              required
              name="prepayment"
              error={errors['prepayment']}
              register={register}
            />
          </div>
        </div>
        <Select
          defaultOpened
          error={errors['month']}
          name={'month'}
          label={'Oyni tanlash'}
          options={[
            {
              value: '1',
              label: '1'
            },
            {
              value: '2',
              label: '2'
            },
            {
              value: '3',
              label: '3'
            }
          ]}
          control={control}
          required
        />
      </div>
      <div className="row mt-30">
        <div className="_col">
          <h3 className="h3">Umumiy ma’lumot*</h3>
          <div className="row mt-30">
            <Select
              defaultOpened
              error={errors['year_of_construction']}
              name={'year_of_construction'}
              label={'Qurilgan yil'}
              options={Array.from({ length: 25 }, (_, i) => ({ label: 2000 + i, value: 2000 + i }))}
              control={control}
              required
            />
            <Select
              defaultOpened
              error={errors['number_of_rooms']}
              name={'number_of_rooms'}
              label={'Xonalar soni'}
              options={Array.from({ length: 5 }, (_, i) => ({ label: 1 + i, value: 1 + i }))}
              control={control}
              required
            />
          </div>
          <h3 className="h3 mt-30">Umumiy joy*</h3>
          <div className="inputs-row">
            <label className={`input-label ${errors['total_place'] ? 'error' : ''}`}>
              <input type="number" placeholder="100" {...register('total_place', { required: true })} />
              <span>m²</span>
              <Pen />
            </label>
          </div>
        </div>
        <div className="_col">
          <h3 className="h3">Qo’shimcha qulayliklar</h3>
          <div className="checkboxes">
            <Checkbox name={'gas'} label={'Gaz'} register={register} />
            <Checkbox name={'water'} label={'Suv'} register={register} />
            <Checkbox name={'electric'} label={'Elektr energiya'} register={register} />
            <Checkbox name={'internet'} label={'Internet'} register={register} />
            <Checkbox name={'air_conditioning'} label={'Konditsioner'} register={register} />
            <Checkbox name={'refrigerator'} label={'Muzlatgich'} register={register} />
            <Checkbox name={'tv'} label={'Televizor'} register={register} />
            <Checkbox name={'washing_machine'} label={'Kiryuvish mashinasi'} register={register} />
          </div>
        </div>
      </div>
      <h3 className="h3 mt-30">Qayerda joylashgan*</h3>
      <div className={mapsArray.length > 1 ? 'address-row' : 'inputs-row'}>
        {mapsArray.length > 1 ? (
          <>
            <button type="button" className="edit-address" onClick={() => setMapArray([])}>
              {'Yozib kiritish'}
            </button>
            <Select
              label={getValues('address')}
              defaultOpened
              loading={isLoading}
              name={'address'}
              options={mapsArray.map((map) => ({
                label: String(map?.formatted)?.replace('unnamed road,', ''),
                value: map?.geometry
              }))}
              onSelect={(value, { label }) => {
                setValue('address', label);
                setLocation(value);
                setMapArray([]);
              }}
            />
          </>
        ) : (
          <label className={`input-label address ${errors['address'] ? 'error' : ''}`}>
            <input
              type="text"
              placeholder="Namangan, Davlatobod, 5-kichik noxiya 1-uy"
              {...register('address')}
              onBlur={() => handleGetCordinate(getValues('address'))}
            />
            {isLoading && <LoadingIcon />}
          </label>
        )}
      </div>
      <div className="mt-30">
        <MapContainer setValue={setValue} location={location} onSelect={() => setMapArray([])} setLoading={setIsLoading} />
      </div>
      <h3 className="h3 mt-30">Tavsifi*</h3>
      <div className="inputs-row">
        <label className={`input-label address ${errors['comment'] ? 'error' : ''}`}>
          <textarea placeholder="Tavsifi*" {...register('comment', { required: true })} />
        </label>
      </div>
      <button className="sender-btn mt-30">
        <span>Saqlash</span>
        <Save />
      </button>
    </form>
  );
};

export default CreateAnnouncement;
