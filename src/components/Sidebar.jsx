// import { ListIcon } from '~/icons/ListIcon';
import './Sidebar.css';
import { useLocation } from 'react-router-dom';
// import { PlusIcon } from '~/icons/PlusIcon';
import { useSelector, useDispatch } from 'react-redux';
import { useLogout } from '~/hooks/useLogout';
import { useEffect } from 'react';
import { fetchLists } from '~/store/list/index';
import SidebarAccount from '~/shared/SidebarAccount';
import SidebarListItem from '~/shared/SidebarListItem';
import SidebarNewListButton from '~/shared/SidebarNewListButton';
import SidebarLogin from '~/shared/SidebarLogin';
import SidebarTitle from '~/shared/SidebarTitle';
import SidebarSectionTitle from '~/shared/SidebarSectionTitle';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const lists = useSelector((state) => state.list.lists);
  const activeId = useSelector((state) => state.list.current);
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const userName = useSelector((state) => state.auth.user?.name);

  // リスト新規作成ページではリストをハイライトしない
  const shouldHighlight = !pathname.startsWith('/list/new');

  const { logout } = useLogout();

  useEffect(() => {
    void dispatch(fetchLists());
  }, []);

  return (
    <div className="sidebar">
      <SidebarTitle />
      {isLoggedIn ? (
        <>
          {lists && (
            <div className="sidebar__lists">
              <SidebarSectionTitle>Lists</SidebarSectionTitle>
              <ul className="sidebar__lists_items">
                {lists.map((listItem) => (
                  <SidebarListItem
                    key={listItem.id}
                    id={listItem.id}
                    title={listItem.title}
                    active={shouldHighlight && listItem.id === activeId}
                  />
                ))}
                <SidebarNewListButton />
              </ul>
            </div>
          )}
          <div className="sidebar__spacer" aria-hidden />
          <SidebarAccount userName={userName} onLogout={logout} />
        </>
      ) : (
        <SidebarLogin />
      )}
    </div>
  );
};
