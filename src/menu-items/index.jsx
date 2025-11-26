// project import
import dashboard from './dashboard';
// import pages from './page';
// import utilities from './utilities';
// import support from './support';
import process from './process';
import opsSettings from './ops-settings';
import media from './media';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, process, media],
  bottomItems: [opsSettings]
};

export default menuItems;
