import { memo } from 'react';

import Filter from '../../UI/Filter';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ClearIcon from '@mui/icons-material/Clear';
import { addParams, deleteParams } from '../../../util/params';
import classes from './RatingFilter.module.scss';

function RatingFilter({ changeUrlParams, urlParams }) {
  let ratingOfProducts = [...Array(5).keys()];

  const filterProductsByRating = (item) => {
    const params = addParams(urlParams, { rating: item });
    changeUrlParams(params);
  };

  const clearRatingFilter = () => {
    const params = deleteParams(urlParams, 'rating');
    changeUrlParams(params, 'clear');
  };

  let ratings = ratingOfProducts.map((rat) => {
    rat++;
    return (
      <div
        className={`${classes.rating} ${classes[`rating-${rat}`]}`}
        key={rat}
        onClick={() => filterProductsByRating(rat)}
      >
        {[...Array(rat)].map((r, i) => {
          return (
            <StarIcon key={i} color='warning' style={{ cursor: 'pointer' }} />
          );
        })}
        {[...Array(ratingOfProducts.length - rat)].map((r, i) => {
          return (
            <StarBorderIcon
              key={i}
              color='warning'
              style={{ cursor: 'pointer' }}
            />
          );
        })}
      </div>
    );
  });

  return (
    <Filter filterName='Average Rating'>
      <div className={classes['rating-cotnainer']}>{ratings}</div>
      <Button
        variant='contained'
        color='error'
        size='small'
        sx={{ fontSize: '12px' }}
        onClick={() => clearRatingFilter()}
      >
        <ClearIcon sx={{ fontSize: '17px' }} /> Clear
      </Button>
    </Filter>
  );
}

export default memo(RatingFilter);
