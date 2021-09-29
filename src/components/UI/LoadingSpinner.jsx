import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingSpinner() {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' mt={2}>
      <CircularProgress />
    </Box>
  );
}

export default LoadingSpinner;
