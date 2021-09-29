import { memo } from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

function ProductsPagination(props) {
  return (
    <Box
      sx={{
        width: '100%',
        margin: '1.2rem',
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      <Pagination
        count={Math.round(props.productsCount / props.limitProducts + 0.5)}
        color='primary'
        onChange={props.paginationChangeHandler}
      />
    </Box>
  );
}

export default memo(ProductsPagination);
