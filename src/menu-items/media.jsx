// assets
import { Newspaper, People } from '@mui/icons-material';

// icons
const icons = {
  Newspaper,
  People
};

// ==============================|| MENU ITEMS - MEDIA ||============================== //

const media = {
  id: 'group-media',
  title: 'Media',
  type: 'group',
  children: [
    {
      id: 'news-verification',
      title: 'News Verification',
      type: 'item',
      url: '/media/news-verification',
      icon: icons.Newspaper
    },
    {
      id: 'community-manager',
      title: 'Radio - Community Manager',
      type: 'item',
      url: '/media/community-manager',
      icon: icons.People
    }
  ]
};

export default media;

