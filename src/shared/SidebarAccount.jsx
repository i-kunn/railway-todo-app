import PropTypes from 'prop-types';

const SidebarAccount = ({ userName, onLogout }) => (
  <div className="sidebar__account">
    <p className="sidebar__account_name">{userName}</p>
    <button type="button" className="sidebar__account_logout" onClick={onLogout}>
      Logout
    </button>
  </div>
);

SidebarAccount.propTypes = {
  userName: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default SidebarAccount;
