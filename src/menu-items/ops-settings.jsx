// assets
import { Settings } from '@mui/icons-material';

// icons
const icons = {
  Settings
};

// ==============================|| MENU ITEMS - OPS SETTINGS ||============================== //

const opsSettings = {
  id: 'ops-settings',
  type: 'group',
  children: [
    {
      id: 'ops-settings-page',
      title: 'Settings',
      type: 'item',
      url: '/ops-settings',
      icon: icons.Settings
    }
  ]
};

export default opsSettings;
