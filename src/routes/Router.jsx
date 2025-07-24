// import React from 'react';
// import { useSelector } from 'react-redux';
// import { BrowserRouter, Routes, Route, Navigate,Link,useLocation } from 'react-router-dom';
// import { Sidebar } from '~/components/Sidebar';
// import Home from '~/pages/index.page';
// import NotFound from '~/pages/404';
// import SignIn from '~/pages/signin/index.page';
// import NewList from '~/pages/list/new/index.page';
// import EditTask from '~/pages/lists/[listId]/tasks/[taskId]/index.page';
// import SignUp from '~/pages/signup/index.page';
// import EditList from '~/pages/lists/[listId]/edit/index.page';
// import ListIndex from '~/pages/lists/[listId]/index.page';

// export const Router = () => {
//   const auth = useSelector((state) => state.auth.token !== null);
//   const location = useLocation();
//   const ModalRoutes = () => {
//   const location = useLocation();
//   const state = location.state;
//   const auth = useSelector((state) => state.auth.token !== null);
//   };

//   console.log('auth', auth);
//   return (
//     <BrowserRouter>
//       <Sidebar />
//       <div className="main_content">
//         <Routes>
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />
//           {auth ? (
//             <>
//               <Route path="/" element={<Home />} />
//               <Route path="/lists/:listId" element={<ListIndex />} />
//               <Route path="/list/new" element={<NewList />} />
//               <Route path="/lists/:listId/tasks/:taskId" element={<EditTask />} />
//               <Route path="/lists/:listId/edit" element={<EditList />} />
//               <Route path="*" element={<NotFound />} />
//             </>
//           ) : (
//             <Route path="*" element={<Navigate to="/signin" replace />} />
//           )}
//         </Routes>
//                 {/* モーダル専用ルート（stateがあるときだけ表示） */}
//         {state?.backgroundLocation && auth && (
//           <Routes>
//             <Route path="/lists/:listId/tasks/:taskId" element={<EditTask />} />
//             <Route path="/lists/:listId/edit" element={<EditList />} />
//           </Routes>
//         )}
//       </div>
//     </BrowserRouter>
//   );
// };

// export const Router = () => {
//   return (
//     <BrowserRouter>
//     </BrowserRouter>
//   );
// };
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { Sidebar } from '~/components/Sidebar';
import Home from '~/pages/index.page';
import NotFound from '~/pages/404';
import SignIn from '~/pages/signin/index.page';
import NewList from '~/pages/list/new/index.page';
import EditTask from '~/pages/lists/[listId]/tasks/[taskId]/index.page';
import SignUp from '~/pages/signup/index.page';
import EditList from '~/pages/lists/[listId]/edit/index.page';
import ListIndex from '~/pages/lists/[listId]/index.page';

// ⚠️ AppRoutes を BrowserRouter の中で使う
const AppRoutes = () => {
  const auth = useSelector((state) => state.auth.token !== null);
  const location = useLocation();
  const state = location.state;

  return (
    <>
      <Sidebar />
      <div className="main_content">
        {/* 通常の画面遷移 */}
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {auth ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/lists/:listId" element={<ListIndex />} />
              <Route path="/list/new" element={<NewList />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/signin" replace />} />
          )}
        </Routes>

        {/* モーダル用ルート */}
        {state?.backgroundLocation && auth && (
          <Routes>
            <Route path="/lists/:listId/tasks/:taskId" element={<EditTask />} />
            <Route path="/lists/:listId/edit" element={<EditList />} />
          </Routes>
        )}
      </div>
    </>
  );
};

// BrowserRouter はルートに1つだけ
export const Router = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
