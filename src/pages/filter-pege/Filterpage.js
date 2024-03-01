import React from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import Select from "components/select";
import { Card } from "components/card";
import Checkbox from "components/checkbox";
import AccordionDynamicHeight from "components/accord";
//chakra range slayder
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

export default function Filterpage() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm({
    defaultValues: {
      holati: "",
      joy: "",
      month: "",
      tur: "",
      type: "",
      prepayment: null,
    },
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
              error={errors["tur"]}
              name={"tur"}
              label={"Joy turini tanlang"}
              options={[
                {
                  value: "Kvartira",
                  label: "Kvartira",
                },
                {
                  value: "Xonadon",
                  label: "Xonadon",
                },
                {
                  value: "Quruq yer",
                  label: "Quruq yer",
                },
                {
                  value: "Biznes uchun joy",
                  label: "Biznes uchun joy",
                },
                {
                  value: "Turar joy majmuasi",
                  label: "Turar joy majmuasi",
                },
              ]}
              control={control}
              required
            />
            {/* //ragne slayder */}
            <RangeSlider aria-label={["min", "max"]} defaultValue={[10, 30]}>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Checkbox
              type="radio"
              name={"buy_type"}
              value={"buy"}
              label={"Sotib olish"}
              register={register}
            />
            <Checkbox
              type="radio"
              name={"buy_type"}
              value={"sell"}
              label={"Ijaraga olish"}
              register={register}
            />
            <Select
              error={errors["tur"]}
              name={"tur"}
              label={"Ta’mir holati"}
              options={[
                {
                  value: "Yomon",
                  label: "Yomon",
                },
                {
                  value: "O’rtacha",
                  label: "O’rtacha",
                },
                {
                  value: "Yaxshi",
                  label: "Yaxshi",
                },
              ]}
              control={control}
              required
            />
            <AccordionDynamicHeight
              body={
                <div>
                  <Checkbox
                    type="radio"
                    name={"buy_type"}
                    value={"buy"}
                    label={"Sotib olish"}
                    register={register}
                  />
                  <Checkbox
                    type="radio"
                    name={"buy_type"}
                    value={"sell"}
                    label={"Ijaraga olish"}
                    register={register}
                  />
                </div>
              }
            />
            <AccordionDynamicHeight />
          </form>
        </div>
        <div className="f-right">
          <div className={"cards-container yangicard"}>
            {data.map((item) => (
              <Card key={item} item={item + currentPage} editable />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
