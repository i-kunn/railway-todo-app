// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLists } from '~/store/list/index';

// const Home = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const currentListId = useSelector((state) => state.list.current);

//   const lists = useSelector((state) => state.list.lists);
//   console.log('lists', lists);

//   useEffect(() => {
//     dispatch(fetchLists());
//   }, []);

//   useEffect(() => {
//     if (currentListId) {
//       navigate(`/lists/${currentListId}`);
//     }
//   }, [currentListId]);

//   return <div></div>;
// };

// export default Home;
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLists } from '~/store/list/index';

// const Home = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const currentListId = useSelector((state) => state.list.current);
//   const lists = useSelector((state) => state.list.lists);

//   console.log('lists (初期):', lists);
//   console.log('currentListId (初期):', currentListId);

//   useEffect(() => {
//     console.log('fetchLists 実行');
//     dispatch(fetchLists());
//   }, []);

//   useEffect(() => {
//     console.log('currentListId が変更:', currentListId);
//     if (currentListId) {
//       console.log(`リダイレクト先: /lists/${currentListId}`);
//       navigate(`/lists/${currentListId}`);
//     }
//   }, [currentListId]);

//   return <div></div>;
// };

// export default Home;
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists } from '~/store/list/index';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentListId = useSelector((state) => state.list.current);
  const lists = useSelector((state) => state.list.lists);

  console.log('lists (初期):', lists);
  console.log('currentListId (初期):', currentListId);
  console.log('現在のパス:', location.pathname);

  useEffect(() => {
    console.log('fetchLists 実行');
    dispatch(fetchLists());
  }, [dispatch]);

  useEffect(() => {
    console.log('currentListId が変更:', currentListId);
    // ホーム画面の時だけリダイレクト
    if (location.pathname === '/' && currentListId) {
      console.log(`リダイレクト先: /lists/${currentListId}`);
      navigate(`/lists/${currentListId}`);
    }
  }, [currentListId, location.pathname, navigate]);

  return <div></div>;
};

export default Home;

