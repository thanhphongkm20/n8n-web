import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../configs/routes.js';
import NotPermissionPage from "../../pages/bases/NotPermissionPage.jsx";

import { setAppState, setAppStateChild } from '../../store/slices/app-state.slice.js';
import { roleUtils } from '../../utils/auth.util';

const Page = ({
  state,
  stateChild,
  element,
  roles,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoadingUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (state) {
      dispatch(setAppState(state));
    }
    if (stateChild !== undefined) {
      dispatch(setAppStateChild(stateChild ?? null));
    }
  }, [dispatch, state, stateChild]);

  // Helper to check role permissions
  const hasPermission = useMemo(() => {
    if (!roles) return true;
    if (!user) return false;
    return roleUtils.isAvailable(roles, user.role);
  }, [roles, user]);

  useEffect(() => {
    if (!isLoadingUser && !user && roles) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [user, navigate, isLoadingUser, roles]);

  const renderContent = () => {
    if (!user) return roles ? null : element;
    return hasPermission ? element : <NotPermissionPage />;
  };

  return renderContent();
};

export default Page;
