import { useDispatch } from 'react-redux';
import { Router } from './routes/Router';
import { useEffect } from 'react';
import { fetchUser } from '~/store/auth/index';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    void dispatch(fetchUser());
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { fetchUser } from '~/store/auth/index';
// import { Router } from './routes/Router';

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     void dispatch(fetchUser());
//   }, [dispatch]);

//   return <Router />;
// }

// export default App;
