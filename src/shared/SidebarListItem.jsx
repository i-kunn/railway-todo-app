import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ListIcon } from '~/icons/ListIcon';
import './SidebarListItem.css';

const SidebarListItem = ({ id, title, active }) => (
  <li>
    <Link to={`/lists/${id}`} data-active={active} className="sidebar__lists_item">
      <ListIcon aria-hidden className="sidebar__lists_icon" />
      {title}
    </Link>
  </li>
);

SidebarListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default SidebarListItem;
