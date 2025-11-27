import { createBrowserRouter } from 'react-router-dom';

// project imports
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import FullScreenRoutes from './FullScreenRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([FullScreenRoutes, MainRoutes, LoginRoutes], { basename: import.meta.env.VITE_APP_BASE_NAME });

export default router;
