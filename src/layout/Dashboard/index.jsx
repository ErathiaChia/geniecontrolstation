import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project imports
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';
import Loader from 'components/Loader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout() {
  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));
  const location = useLocation();

  // set media wise responsive drawer
  useEffect(() => {
    handlerDrawerOpen(!downXL);
  }, [downXL]);

  // Routes that should hide navigation (stepper flow pages)
  const hideNavigationRoutes = [
    '/process/document-assessment',
    '/process/candidate-screening',
    '/process/approval'
  ];

  // Check if current route should hide navigation elements
  const shouldHideNavigation = hideNavigationRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  if (menuMasterLoading) return <Loader />;

  // Full-screen layout for stepper flow pages
  if (shouldHideNavigation) {
    return (
      <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
        <Box component="main" sx={{ width: '100%', flexGrow: 1 }}>
          <Box
            sx={{
              position: 'relative',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    );
  }

  // Standard layout with navigation
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      <Drawer />

      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar sx={{ mt: 'inherit' }} />
        <Box
          sx={{
            ...{ px: { xs: 0, sm: 2 } },
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Breadcrumbs />
          <Outlet />
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
