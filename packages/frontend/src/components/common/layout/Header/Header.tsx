import React from 'react';
import { FiMenu, FiUser, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import { Box } from '../base';
import { Button } from '../../misc';

import * as S from './Header.styles';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { OpenNavigation, CloseNavigation, OpenSidebar, CloseSidebar } from '../../../../actions/ui';
import { selectIsNavigationOpen, selectIsSidebarOpen } from '../../../../selectors/ui';

/* <Header />
============================================================================= */
const Header: React.FC = () => {
  const isNavigationOpen = useSelector(selectIsNavigationOpen);
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const dispatch = useDispatch<
    Dispatch<OpenNavigation | CloseNavigation | OpenSidebar | CloseSidebar>
  >();

  return (
    <>
      <S.Wrapper>
        <Box display={['block', null, null, 'none']}>
          <Button
            icon={isNavigationOpen ? <FiArrowLeft /> : <FiMenu />}
            onClick={() => {
              if (isNavigationOpen) {
                dispatch({ type: '[UI] CLOSE_NAVIGATION' });
              } else {
                dispatch({ type: '[UI] OPEN_NAVIGATION' });
              }
            }}
          />
        </Box>

        <S.Logo>
          Slackify
          <S.VersionBadge>PRE-ALPHA</S.VersionBadge>
        </S.Logo>

        <Box display={['block', null, null, null, null, 'none']}>
          <Button
            icon={isSidebarOpen ? <FiArrowRight /> : <FiUser />}
            onClick={() => {
              if (isSidebarOpen) {
                dispatch({ type: '[UI] CLOSE_SIDEBAR' });
              } else {
                dispatch({ type: '[UI] OPEN_SIDEBAR' });
              }
            }}
          />
        </Box>
      </S.Wrapper>

      <S.Dummy />
    </>
  );
};

export default Header;
