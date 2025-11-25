// assets
import { Description } from '@mui/icons-material';

// icons
const icons = {
  Description
};

// ==============================|| MENU ITEMS - PROCESS ||============================== //

const process = {
  id: 'process',
  title: 'Process',
  type: 'group',
  children: [
    {
      id: 'application',
      title: 'Application',
      type: 'item',
      url: '/process/application',
      icon: icons.Description
    }
  ]
};

export default process;

