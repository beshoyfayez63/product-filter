import { forwardRef, useImperativeHandle, useState, memo } from 'react';
import { addParams } from '../../../util/params';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const ColorItem = ({ color, changeUrlParams, urlParams }, ref) => {
  const [checked, setChecked] = useState(false);

  const removeCheck = () => {
    setChecked(false);
  };

  useImperativeHandle(ref, () => {
    return {
      removeCheck,
    };
  });

  const filteredProductsByColor = (e) => {
    let isChecked = e.target.checked;
    setChecked(isChecked);
    if (isChecked) {
      const params = addParams(urlParams, { color: color });
      changeUrlParams(params, 'append');
    } else {
      const params = new URLSearchParams(urlParams);
      let url = params.toString();
      let urlSplit = url.split('&');
      urlSplit = urlSplit
        .filter((u) => {
          let urlColor = u.split('=')[1];
          return urlColor !== color;
        })
        .join('&');
      changeUrlParams(urlSplit.toString(), 'clear');
    }
  };

  return (
    <FormControlLabel
      onChange={filteredProductsByColor}
      checked={checked}
      control={<Checkbox />}
      label={color}
      value={color}
      sx={{ display: 'block' }}
    />
  );
};

export default memo(forwardRef(ColorItem));
