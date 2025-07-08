import PropTypes from 'prop-types';

const SidebarSectionTitle = ({ children }) => <h2 className="sidebar__lists_title">{children}</h2>;
SidebarSectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarSectionTitle;
