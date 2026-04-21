import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { authUtils } from '../utils/auth.util';

const AppLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    authUtils.isAuthenticated(dispatch);
  }, [dispatch]);

  return <Outlet />;
};

export default AppLayout;