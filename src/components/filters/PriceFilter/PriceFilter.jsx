import { useContext, useCallback, useReducer } from 'react';
import ProductsContext from '../../../context/product-context';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import ButtonUI from '../../UI/Button';
import Filter from '../../UI/Filter';
import Slider from '@mui/material/Slider';
import { addParams, deleteParams } from '../../../util/params';
import classes from './PriceFilter.module.scss';

const initialState = {
  slider: [0, 100],
  from: null,
  to: null,
};
const priceFilterReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        slider: [action.from, action.to],
        from: action.from,
        to: action.to,
      };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
};

function PriceFilter() {
  const { changeUrlParams, urlParams } = useContext(ProductsContext);
  const [{ slider, from, to }, dispatch] = useReducer(
    priceFilterReducer,
    initialState
  );

  const sliderChange = (event, newValue) => {
    dispatch({ type: 'CHANGE', from: newValue[0], to: newValue[1] });
  };

  const searchPriceHandler = useCallback(() => {
    if (+from > +to) {
      return;
    }
    const paramUrl = addParams(urlParams, { price_gte: from, price_lte: to });
    changeUrlParams(paramUrl);
  }, [changeUrlParams, from, to, urlParams]);

  const clearPriceFilter = useCallback(() => {
    const params = deleteParams(urlParams, 'price_gte', 'price_lte');
    changeUrlParams(params, 'clear');

    dispatch({ type: 'CLEAR' });
  }, [changeUrlParams, urlParams]);

  return (
    <Filter filterName='price range'>
      <TextField
        id='outlined-basic'
        type='number'
        placeholder='From ($)'
        variant='outlined'
        size='small'
        onChange={(event) => {
          dispatch({ type: 'CHANGE', from: +event.target.value, to });
        }}
        value={from || ''}
      />
      <TextField
        id='outlined-basic'
        type='number'
        placeholder='To ($)'
        variant='outlined'
        size='small'
        onChange={(event) => {
          dispatch({ type: 'CHANGE', from, to: +event.target.value });
        }}
        value={to || ''}
      />
      <Slider
        className={classes.slider}
        getAriaLabel={() => 'Temperature range'}
        value={slider}
        onChange={sliderChange}
        valueLabelDisplay='auto'
        getAriaValueText={(value) => `${value}`}
        min={1}
        max={1000}
      />
      <ButtonUI
        variant='contained'
        color='inherit'
        size='small'
        fz='13px'
        clicked={searchPriceHandler}
      >
        Go
      </ButtonUI>
      <ButtonUI
        variant='contained'
        color='error'
        size='small'
        sx='12px'
        clicked={clearPriceFilter}
      >
        <ClearIcon sx={{ fontSize: '17px' }} /> Clear
      </ButtonUI>
    </Filter>
  );
}

export default PriceFilter;
