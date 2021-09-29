import { memo } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import './ProductItem.scss';

function ProductItem({ product }) {
  const calculateRating = () => {
    let ratings = [...Array(5).keys()].map((rating) => {
      if (product.rating <= rating) {
        return <StarBorderIcon key={rating} fontSize='small' color='warning' />;
      } else {
        return <StarIcon key={rating} fontSize='small' color='warning' />;
      }
    });
    return ratings;
  };

  return (
    <Grid item md={4} sm={6} xs={12}>
      <Card>
        <CardMedia
          component='img'
          height='140'
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            color: {product.color}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            price: {product.price}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            display='flex'
            mt={1}
          >
            rating: {calculateRating()}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default memo(ProductItem);
