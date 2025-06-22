import { Link } from 'react-router-dom';
import './SidebarLogin.css';

const SidebarLogin = () => {
  return (
    <div>
      <Link to="/signin" className="sidebar__login">
        Login
      </Link>
    </div>
  );
};

export default SidebarLogin;
