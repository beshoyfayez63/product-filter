import { useContext } from 'react';
import ProductsContext from '../../context/product-context';
import PriceFilter from './PriceFilter/PriceFilter';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import classes from './Filter.module.scss';
import ColorFilter from './ColorFilter/ColorFilter';
import RatingFilter from './RatingFilter/RatingFilter';

function Filter() {
  const { changeUrlParams, urlParams } = useContext(ProductsContext);
  return (
    <div className={classes.filter}>
      <Typography variant='body1' className={classes['filter-title']}>
        Filter
      </Typography>
      <PriceFilter />
      <Divider sx={{ margin: '5px 0 10px' }} />
      <ColorFilter changeUrlParams={changeUrlParams} urlParams={urlParams} />
      <Divider sx={{ margin: '5px 0 10px' }} />
      <RatingFilter changeUrlParams={changeUrlParams} urlParams={urlParams} />
    </div>
  );
}

export default Filter;
