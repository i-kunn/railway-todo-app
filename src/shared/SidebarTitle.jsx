import { Link } from 'react-router-dom';

const SidebarTitle = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <h1 className="sidebar__title">Todos</h1>
      </Link>
    </div>
  );
};
export default SidebarTitle;
