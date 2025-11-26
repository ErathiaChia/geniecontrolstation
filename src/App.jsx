import { RouterProvider } from 'react-router-dom';

// project imports
import router from 'routes';
import ThemeCustomization from 'themes';
import QueryProvider from 'providers/QueryProvider';

import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <QueryProvider>
      <ThemeCustomization>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </ThemeCustomization>
    </QueryProvider>
  );
}
