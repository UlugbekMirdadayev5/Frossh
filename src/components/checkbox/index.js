import { useEffect, useState } from 'react';
import { Checkbox as CheckboxSvg } from '../../assets/svgs';
import './style.css';

const Checkbox = ({ name, register, type = 'checkbox', label, error, value, required, onChange, defaultChecked }) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    console.log(defaultChecked);
  }, [defaultChecked]);
  return (
    <label className={`custome-checkbox ${error ? 'error' : ''}`}>
      <CheckboxSvg />
      <input
        hidden
        type={type}
        value={type === 'checkbox' ? v : value}
        checked={defaultChecked}
        name={name}
        {...register(name, { required })}
        onChange={(e) => {
          register(name, { required }).onChange(e);
          setV(type === 'checkbox' ? v : e.target.checked);
          typeof onChange === 'function' && onChange({ [name]: value, checked: e.target.checked });
        }}
      />
      <p>{label || name}</p>
    </label>
  );
};

export default Checkbox;
