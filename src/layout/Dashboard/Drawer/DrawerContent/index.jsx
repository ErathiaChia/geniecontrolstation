// material-ui
import Box from '@mui/material/Box';

// project imports
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import menuItems from 'menu-items';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' }, flexGrow: 1 }}>
        <Navigation items={menuItems.items} />
      </SimpleBar>
      <Box>
        <Navigation items={menuItems.bottomItems} />
      </Box>
    </Box>
  );
}
