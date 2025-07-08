import { Link } from 'react-router-dom';
import { PlusIcon } from '~/icons/PlusIcon';

const SidebarNewListButton = () => (
  <li>
    <Link to="/list/new" className="sidebar__lists_button">
      <PlusIcon className="sidebar__lists_plus_icon" />
      New List...
    </Link>
  </li>
);
export default SidebarNewListButton;
