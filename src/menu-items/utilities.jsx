// assets
import {
  Apps,
  Dashboard,
  QrCode2,
  Palette,
  TextFields,
  HourglassEmpty
} from '@mui/icons-material';

// icons
const icons = {
  TextFields,
  Palette,
  QrCode2,
  Dashboard,
  HourglassEmpty,
  Apps
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Typography',
      type: 'item',
      url: '/typography',
      icon: icons.TextFields
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/color',
      icon: icons.Palette
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/shadow',
      icon: icons.QrCode2
    }
  ]
};

export default utilities;
