// assets
import { SettingOutlined } from '@ant-design/icons';

// icons
const icons = {
  SettingOutlined
};

// ==============================|| MENU ITEMS - OPS SETTINGS ||============================== //

const opsSettings = {
  id: 'ops-settings',
  title: 'Others',
  type: 'group',
  children: [
    {
      id: 'ops-settings-page',
      title: 'Ops Settings',
      type: 'item',
      url: '/ops-settings',
      icon: icons.SettingOutlined
    }
  ]
};

export default opsSettings;

