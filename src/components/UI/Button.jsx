import { memo } from 'react';
import Button from '@mui/material/Button';

function ButtonUI({ variant, color, size, fz, clicked, children }) {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      sx={{ fontSize: fz }}
      onClick={clicked}
    >
      {children}
    </Button>
  );
}

export default memo(ButtonUI);
