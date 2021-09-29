import { memo } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { addParams } from '../../../util/params';
import './CategoryItem.scss';

function CategoryItem({ category, urlParams, changeUrlParams }) {
  const { id } = category;
  const filteredByCategory = () => {
    const paramUrl = addParams(urlParams, { categoryId: id });
    changeUrlParams(paramUrl);
  };

  return (
    <Grid item md>
      <Card className='card' onClick={filteredByCategory}>
        <CardMedia
          component='img'
          image={category.image}
          className='card-image'
        />
        <CardContent component={Typography} className='card-content'>
          {category.name}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default memo(CategoryItem);
