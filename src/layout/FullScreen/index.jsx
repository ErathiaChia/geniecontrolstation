import { Outlet } from 'react-router-dom';

// material-ui
import { Box } from '@mui/material';

// ==============================|| FULL SCREEN LAYOUT ||============================== //

export default function FullScreenLayout() {
  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Box component="main" sx={{ width: '100%', flexGrow: 1, bgcolor: 'background.default' }}>
        <Outlet />
      </Box>
    </Box>
  );
}

