import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists } from '~/store/list/index';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentListId = useSelector((state) => state.list.current);

  const lists = useSelector((state) => state.list.lists);
  console.log('lists', lists);

  useEffect(() => {
    dispatch(fetchLists());
  }, []);

  useEffect(() => {
    if (currentListId) {
      navigate(`/lists/${currentListId}`);
    }
  }, [currentListId]);

  return <div></div>;
};

export default Home;
