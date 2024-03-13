import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from '../../components/select';
import { Card } from '../../components/card';
import Checkbox from '../../components/checkbox';
import AccordionDynamicHeight from '../../components/accord';
//chakra range slayder
import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from '@chakra-ui/react';
import { ArrowSelect, LoadingIcon, NotFound, Search } from '../../assets/svgs';

import './style.css';
import { useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Filterpage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const search = new URLSearchParams(location.search);

  // Convert URLSearchParams object to an array of [key, value] pairs
  const paramsArray = Array.from(search.entries());

  // Convert array of [key, value] pairs to an object
  const params = Object.fromEntries(paramsArray);
  const minPrice = useMemo(() => announcements?.data?.sort((a, b) => a?.price - b?.price)[0]?.price || 0, [announcements]);
  const maxPrice = useMemo(() => announcements?.data?.sort((a, b) => b?.price - a?.price)[0]?.price || 5, [announcements]);
  const maxM2 = useMemo(() => announcements?.data?.sort((a, b) => b?.m2 - a?.m2)[0]?.m2 || 5, [announcements]);
  const minM2 = useMemo(() => announcements?.data?.sort((a, b) => a?.m2 - b?.m2)[0]?.m2 || 0, [announcements]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      repair_type: '',
      sale_type: '',
      address: '',
      place_type: '',
      m2: [0, 5],
      price: [0, 5]
    }
  });

  const onSubmit = (values) => console.log(values);

  const handleFirstInputChange = (e, name) => {
    const value = parseInt(Number(e.target.value));
    const currentValues = watch(name);
    const newValue = [value < currentValues[1] - 3 ? value : currentValues[1] - 3, currentValues[1]];
    setValue(name, newValue);
  };

  const handleSecondInputChange = (e, name) => {
    const value = Number(e.target.value);
    const currentValues = watch(name);
    const newValue = [currentValues[0], value > currentValues[0] + 3 ? value : currentValues[0] + 3];
    setValue(name, newValue);
  };

  const desiredObject = useMemo(
    () => Object.assign({}, ...Array.from(Object.keys(params), (obj) => ({ [obj]: searchParams.get(obj) }))),
    [searchParams, params]
  );
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.frossh.uz/api/announcement/get-by-filter${location.search}`)
      .then(({ data }) => {
        setLoading(false);
        setAnnouncements(data?.result?.nonTop);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [location.search]);

  useEffect(() => {
    if (!watch('m2')[0] || !watch('price')[0]) {
      setValue('price', [minPrice, maxPrice]);
      setValue('m2', [minM2, maxM2]);
    }
  }, [minPrice, maxPrice, minM2, maxM2, setValue, watch]);

  const searchBar = (
    <div className="search-bar form">
      <input
        type="text"
        placeholder="Qidirish"
        {...register('address', { required: true })}
        required
        onChange={({ target: { value } }) => setSearchParams({ ...desiredObject, title: value })}
      />
      <button type="submit">{loading ? <LoadingIcon color={'#fff'} size={'34px'} /> : <Search />}</button>
    </div>
  );

  return (
    <div className="container">
      <div className="filterpage">{searchBar}</div>
      <div className="grid-filter">
        <div className="f-left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Select
              error={errors['place_type']}
              name={'place_type'}
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

            <div className="input-progress">
              <p>Hajmi</p>
              <div className="input-size">
                <input type="number" onChange={(e) => handleFirstInputChange(e, 'm2')} placeholder="dan" value={watch('m2')[0]} />
                <input type="number" onChange={(e) => handleSecondInputChange(e, 'm2')} placeholder="gacha" value={watch('m2')[1]} />
              </div>
            </div>

            <RangeSlider
              onChange={(value) => setValue('m2', value)}
              value={watch('m2')}
              aria-label={"['min', 'max']"}
              className="range-slider"
              // minStepsBetweenThumbs={maxM2 * 0.02}
              max={maxM2}
              min={minM2}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} bg={'#0085AF'} />
              <RangeSliderThumb index={1} bg={'#0085AF'} />
            </RangeSlider>
            <div className="input-progress">
              <p>Narxi</p>
              <div className="input-size">
                <input type="number" onChange={(e) => handleFirstInputChange(e, 'price')} placeholder="dan" value={watch('price')[0]} />
                <input type="number" onChange={(e) => handleSecondInputChange(e, 'price')} placeholder="gacha" value={watch('price')[1]} />
              </div>
            </div>
            <RangeSlider
              max={maxPrice}
              min={minPrice}
              aria-label={"['min', 'max']"}
              onChange={(value) => setValue('price', value)}
              value={watch('price')}
              className="range-slider"
              // minStepsBetweenThumbs={maxPrice * 0.02}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} bg={'#0085AF'} />
              <RangeSliderThumb index={1} bg={'#0085AF'} />
            </RangeSlider>
            <Select
              error={errors['repair_type']}
              name={'repair_type'}
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
            <div className="checkboxes">
              <Checkbox type="radio" name={'buy_type'} value={'buy'} label={'Sotib olish'} register={register} />
              <Checkbox type="radio" name={'buy_type'} value={'sell'} label={'Ijaraga olish'} register={register} />
            </div>
            <AccordionDynamicHeight
              classes={{ header: 'header-acc' }}
              header={
                <>
                  <p>Viloyatlar</p>
                  <ArrowSelect />
                </>
              }
              headerOpen={
                <>
                  <p>Yopish</p>
                  <ArrowSelect />
                </>
              }
              body={
                <div className="checkboxes">
                  {[
                    'Andijon',
                    'Buxoro',
                    "Farg'ona",
                    'Jizzax',
                    'Xorazm',
                    'Namangan',
                    'Navoiy',
                    'Qashqadaryo',
                    "Qoraqalpog'iston",
                    'Samarqand',
                    'Sirdaryo',
                    'Surxondaryo',
                    'Toshkent'
                  ].map((item) => (
                    <Checkbox key={item} type="radio" name="region" value={item} label={item} register={register} />
                  ))}
                </div>
              }
            />
            <AccordionDynamicHeight
              classes={{ header: 'header-acc' }}
              header={
                <>
                  <p>Qo`shimcha qulayliklar</p>
                  <ArrowSelect />
                </>
              }
              headerOpen={
                <>
                  <p>Yopish</p>
                  <ArrowSelect />
                </>
              }
              body={
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
              }
            />
          </form>
        </div>
        <div className="f-right personinfo">
          <div
            className={'cards-container new-card-style'}
            style={announcements?.data?.length ? undefined : { gridTemplateColumns: 'auto' }}
          >
            {announcements?.data?.length ? (
              announcements?.data?.map((item) => <Card key={item?.id} item={item} />)
            ) : loading ? null : (
              <h3 className="not-found">
                {"E'lonlar topilmadi"}
                <NotFound />
              </h3>
            )}
          </div>
          <div className="paginations">
            {announcements?.links?.map((item) => (
              <button
                dangerouslySetInnerHTML={{ __html: item?.label?.replace(/\b(Previous|Next)\b/g, '')?.trim() }}
                key={item?.label}
                className={item?.active ? 'active' : undefined}
                disabled={!item?.url || !announcements?.data?.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
