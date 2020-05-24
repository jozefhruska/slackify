import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '../Modal/Modal';
import { selectIsSettingsModalOpen } from '../../../../selectors/ui';
import { OpenSettings, CloseSettings } from '../../../../actions/ui';
import { Box } from '../../layout/base';
import { selectUser } from '../../../../selectors/auth';
import { Label } from '../../forms';

import * as S from './SettingsModal.styles';

/* <SettingsModal />
============================================================================= */
const SettingsModal: React.FC = () => {
  const isModalOpen = useSelector(selectIsSettingsModalOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch<Dispatch<OpenSettings | CloseSettings>>();

  return (
    <Modal
      open={isModalOpen}
      onClose={() => dispatch({ type: '[UI] CLOSE_SETTINGS' })}
      title="Settings"
    >
      <Box minWidth="26rem" maxWidth="36rem">
        <Label>Access token:</Label>
        <S.TokenWrapper>Bearer {user?.team?.accessToken}</S.TokenWrapper>
        <Box mt="s3">
          <i>
            You must send this token in <strong>Authorization</strong> header when making requests
            to public API (
            <a
              href="https://slackify-service-public.herokuapp.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              https://slackify-service-public.herokuapp.com/
            </a>
            ).
          </i>
        </Box>
      </Box>
    </Modal>
  );
};

export default SettingsModal;
