import { memo } from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

function ProductsPagination({
  productsCount,
  limitProducts,
  paginationChangeHandler,
  page,
}) {
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
        page={page}
        count={Math.round(productsCount / limitProducts + 0.5)}
        color='primary'
        onChange={paginationChangeHandler}
      />
    </Box>
  );
}

export default memo(ProductsPagination);
