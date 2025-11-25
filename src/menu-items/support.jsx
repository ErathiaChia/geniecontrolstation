// assets
import { Language, Help } from '@mui/icons-material';

// icons
const icons = {
  Language,
  Help
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.Language
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://ST Engineering.gitbook.io/mantis/',
      icon: icons.Help,
      external: true,
      target: true
    }
  ]
};

export default support;
