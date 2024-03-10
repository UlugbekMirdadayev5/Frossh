import React from 'react';
import './style.css';
import { useForm } from 'react-hook-form';
import Select from 'components/select';
import { Card } from 'components/card';
import Checkbox from 'components/checkbox';
import AccordionDynamicHeight from 'components/accord';
//chakra range slayder
import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from '@chakra-ui/react';

export default function Filterpage() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register
  } = useForm({
    defaultValues: {
      holati: '',
      joy: '',
      month: '',
      tur: '',
      type: '',
      prepayment: null
    }
  });

  const onSubmit = (values) => console.log(values);

  const data = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentPage = 1; // Add this line to fix the 'item + currentPage' error

  return (
    <div className="container">
      <div className="filterpage">
        <div className="f-left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Select
              error={errors['tur']}
              name={'tur'}
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

            <div className="input-rpogress">
              <p>Hajmi</p>
              <div className="input-size">
                <input type="text" placeholder="20m2" />
                <input type="text" placeholder="100m2" />
              </div>
            </div>

            {/* //ragne slayder */}
            <div className="range-slayder">
              <RangeSlider
                aria-label={"['min', 'max']"}
                defaultValue={[10, 30]}
                sx={{
                  color: 'white',
                  width: '317px',
                  fontSize: '50px'
                }}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb maxW="960px" index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <div className="input-rpogress">
                <p>Narxi</p>
                <div className="input-size">
                  <input type="number" placeholder="100.000 USD" />
                  <input type="number" placeholder="100m2" />
                </div>
              </div>
              <RangeSlider
                aria-label={"['min', 'max']"}
                defaultValue={[10, 30]}
                sx={{
                  color: 'white',
                  width: '317px',
                  fontSize: '50px'
                }}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
            </div>
            <Select
              error={errors['tur']}
              name={'tur'}
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
            <p id="v">viloyatlar</p>
            <AccordionDynamicHeight
              name="buy_type"
              header={<p>Yashirish</p>}
              body={
                <div className="checkboxes">
                  <Checkbox type="radio" name="region" value="Andijon" label="Andijon" register={register} />
                  <Checkbox type="radio" name="region" value="Buxoro" label="Buxoro " register={register} />
                  <Checkbox type="radio" name="region" value="Farg'ona" label="Farg'ona" register={register} />
                  <Checkbox type="radio" name="region" value="Jizzax" label="Jizzax " register={register} />
                  <Checkbox type="radio" name="region" value="Jizzax" label="Jizzax " register={register} />
                  <Checkbox type="radio" name="region" value="Navoiy" label="Navoiy " register={register} />
                  <Checkbox type="radio" name="region" value="Qashqadaryo" label="Qashqadaryo" register={register} />
                  <Checkbox type="radio" name="region" value="Samarqand" label="Samarqand" register={register} />
                  <Checkbox type="radio" name="region" value="Sirdaryo" label="Sirdaryo " register={register} />
                  <Checkbox type="radio" name="region" value="Surxondaryo" label="Surxondaryo" register={register} />
                  <Checkbox type="radio" name="region" value="Toshkent" label="Toshkent" register={register} />
                </div>
              }
            />
            <p id="v">Qo`shimcha qulayliklar</p>
            <AccordionDynamicHeight
              name="buy_type"
              header={<p>Yashirish</p>}
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
          <div className={'cards-container new-card-style'}>
            {data.map((item) => (
              <Card key={item} item={item + currentPage} editable />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
