import {
  useMemo,
  useEffect,
  useState,
  memo,
  useCallback,
  useRef,
  createRef,
} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

import ColorItem from './ColorItem';
import Filter from '../../UI/Filter';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';

import classes from './ColorFilter.module.scss';

function ColorFilter({ changeUrlParams, urlParams }) {
  const [colors, setColors] = useState([]);
  const [filteredColors, setFilteredColors] = useState([]);

  const checkRef = useRef([]);

  checkRef.current = useMemo(() => {
    return colors.map((_, i) => checkRef.current[i] ?? createRef());
  }, [colors]);

  const getColors = useCallback(async () => {
    const products = await axios.get('https://test-api.edfa3ly.io/product');
    let colorsMap = products.data.map((product) => {
      return product.color;
    });
    colorsMap = [...new Set(colorsMap)];
    setColors(colorsMap);
    setFilteredColors(colorsMap);
  }, []);

  useEffect(() => {
    getColors();
  }, [getColors]);

  const filterColorHandler = (e) => {
    let word = e.target.value;
    let searchedColors = colors.filter((c) => {
      return c.includes(word);
    });
    setFilteredColors(searchedColors);
  };

  const clearColorFilter = () => {
    const params = new URLSearchParams(urlParams);
    params.delete('color');
    changeUrlParams(params.toString());
    colors.forEach((c, i) => {
      checkRef.current[i].current.removeCheck();
    });
  };

  return (
    <Filter filterName='Color'>
      <TextField
        onChange={filterColorHandler}
        label='Colors'
        className={classes.autoComplete}
        size='small'
      />
      <div className={classes['color-container']}>
        {filteredColors.map((color, i) => {
          return (
            <ColorItem
              color={color}
              key={color}
              ref={checkRef.current[i]}
              changeUrlParams={changeUrlParams}
              urlParams={urlParams}
            />
          );
        })}
      </div>
      <Button
        variant='contained'
        color='error'
        size='small'
        sx={{ fontSize: '12px' }}
        onClick={() => clearColorFilter()}
      >
        <ClearIcon sx={{ fontSize: '17px' }} /> Clear
      </Button>
    </Filter>
  );
}

export default memo(ColorFilter);
