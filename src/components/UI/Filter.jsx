import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import classes from './Filter.module.scss';

function Filter({ filterName, children }) {
  return (
    <Box className={classes.filter}>
      <div className={classes['filter-box']}>
        <Typography>{filterName}</Typography>
        {children}
      </div>
    </Box>
  );
}

export default Filter;
