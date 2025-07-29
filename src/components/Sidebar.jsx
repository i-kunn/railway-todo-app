//  import { ListIcon } from '~/icons/ListIcon';
// import './Sidebar.css';
// import { useLocation } from 'react-router-dom';
//  import { PlusIcon } from '~/icons/PlusIcon';
// import { useSelector, useDispatch } from 'react-redux';
// import { useLogout } from '~/hooks/useLogout';
// import { useEffect } from 'react';
// import { fetchLists } from '~/store/list/index';
// import SidebarAccount from '~/shared/SidebarAccount';
// import SidebarListItem from '~/shared/SidebarListItem';
// import SidebarNewListButton from '~/shared/SidebarNewListButton';
// import SidebarLogin from '~/shared/SidebarLogin';
// import SidebarTitle from '~/shared/SidebarTitle';
// import SidebarSectionTitle from '~/shared/SidebarSectionTitle';

// export const Sidebar = () => {
//   const dispatch = useDispatch();
//   const { pathname } = useLocation();

//   const lists = useSelector((state) => state.list.lists);
//   const activeId = useSelector((state) => state.list.current);
//   const isLoggedIn = useSelector((state) => state.auth.token !== null);
//   const userName = useSelector((state) => state.auth.user?.name);

//   // リスト新規作成ページではリストをハイライトしない
//   const shouldHighlight = !pathname.startsWith('/list/new');

//   const { logout } = useLogout();

//   useEffect(() => {
//     void dispatch(fetchLists());
//   }, []);

//   return (
//     <div className="sidebar">
//       <SidebarTitle />
//       {isLoggedIn ? (
//         <>
//           {lists && (
//             <div className="sidebar__lists">
//               <SidebarSectionTitle>Lists</SidebarSectionTitle>
//               <ul className="sidebar__lists_items">
//                 {lists.map((listItem) => (
//                   <SidebarListItem
//                     key={listItem.id}
//                     id={listItem.id}
//                     title={listItem.title}
//                     active={shouldHighlight && listItem.id === activeId}
//                   />
//                 ))}
//                 <SidebarNewListButton />
//               </ul>
//             </div>
//           )}
//           <div className="sidebar__spacer" aria-hidden />
//           <SidebarAccount userName={userName} onLogout={logout} />
//         </>
//       ) : (
//         <SidebarLogin />
//       )}
//     </div>
//   );
// };
// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useLocation } from 'react-router-dom';
// import { fetchLists } from '~/store/list/index';
// import { useLogout } from '~/hooks/useLogout';
// import { ListIcon } from '~/icons/ListIcon';
// import { PlusIcon } from '~/icons/PlusIcon';
// import './Sidebar.css';

// export const Sidebar = () => {
//   const dispatch = useDispatch();
//   const { pathname } = useLocation();
//   const lists = useSelector((state) => state.list.lists);
//   const activeId = useSelector((state) => state.list.current);
//   const isLoggedIn = useSelector((state) => state.auth.token !== null);
//   const userName = useSelector((state) => state.auth.user?.name);
//   const { logout } = useLogout();

//   const shouldHighlight = !pathname.startsWith('/list/new');

//   useEffect(() => {
//     void dispatch(fetchLists());
//   }, []);

//   return (
//     <div className="sidebar">

//       <div className="sidebar__title">
//         <Link to="/">
//           <h1 className="sidebar__title">Todos</h1>
//         </Link>
//       </div>

//       {isLoggedIn ? (
//         <>

//           {lists && (
//             <div className="sidebar__lists">
//               <h2 className="sidebar__lists_title">Lists</h2>
//               <ul className="sidebar__lists_items">

//                 {lists.map((listItem) => (
//                   <li
//                     key={listItem.id}
//                     data-active={shouldHighlight && listItem.id === activeId}
//                     className="sidebar__lists_item"
//                   >
//                     <Link to={`/lists/${listItem.id}`}>
//                       <ListIcon aria-hidden className="sidebar__lists_icon" />
//                       {listItem.title}
//                     </Link>
//                   </li>
//                 ))}

//                 <li className="sidebar__lists_button">
//                   <Link to="/list/new">
//                     <PlusIcon className="sidebar__lists_plus_icon" />
//                     New List
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           )}
//           <div className="sidebar__spacer" aria-hidden />

//           <div className="sidebar__account">
//             <p className="sidebar__account_name">{userName}</p>
//             <button type="button" className="sidebar__account_logout" onClick={logout}>
//               Logout
//             </button>
//           </div>
//         </>
//       ) : (

//         <div>
//           <Link to="/signin" className="sidebar__login">
//             Login
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };
// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchLists } from '~/store/list/index';
import { useLogout } from '~/hooks/useLogout';
import { ListIcon } from '~/icons/ListIcon';
import { PlusIcon } from '~/icons/PlusIcon';
import './Sidebar.css';

export const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const lists = useSelector((state) => state.list.lists);
  const activeId = useSelector((state) => state.list.current);
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const userName = useSelector((state) => state.auth.user?.name);
  const { logout } = useLogout();

  const shouldHighlight = !pathname.startsWith('/list/new');

  useEffect(() => {
    void dispatch(fetchLists());
  }, []);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar__title">
        <Link to="/" onClick={onClose}>
          <h1 className="sidebar__title">Todos</h1>
        </Link>
      </div>

      {isLoggedIn ? (
        <>
          {lists && (
            <div className="sidebar__lists">
              <h2 className="sidebar__lists_title">Lists</h2>
              <ul className="sidebar__lists_items">
                {lists.map((listItem) => (
                  <li
                    key={listItem.id}
                    data-active={shouldHighlight && listItem.id === activeId}
                    className="sidebar__lists_item"
                  >
                    <Link to={`/lists/${listItem.id}`} onClick={onClose}>
                      <ListIcon aria-hidden className="sidebar__lists_icon" />
                      {listItem.title}
                    </Link>
                  </li>
                ))}
                <li className="sidebar__lists_button">
                  <Link to="/list/new" onClick={onClose}>
                    <PlusIcon className="sidebar__lists_plus_icon" />
                    New List
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <div className="sidebar__spacer" aria-hidden />

          <div className="sidebar__account">
            <p className="sidebar__account_name">{userName}</p>
            <button
              type="button"
              className="sidebar__account_logout"
              onClick={() => {
                logout();
                onClose();
              }}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div>
          <Link to="/signin" className="sidebar__login" onClick={onClose}>
            Login
          </Link>
        </div>
      )}
    </div>
  );
};
