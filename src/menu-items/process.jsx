// assets
import { FileTextOutlined } from '@ant-design/icons';

// icons
const icons = {
  FileTextOutlined
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
      icon: icons.FileTextOutlined
    }
  ]
};

export default process;

