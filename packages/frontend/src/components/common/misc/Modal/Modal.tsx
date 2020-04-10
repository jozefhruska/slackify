import React from 'react';
import ReactModal from 'react-responsive-modal';

import { Heading } from '../../typography';
import Button from '../Button/Button';
import { FiX } from 'react-icons/fi';
import { Box } from '../../layout/base';

import * as S from './Modal.styles';

/* Props - <Modal />
============================================================================= */
type Props = {
  title?: string;
  open: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  onOverlayClick?: () => void;
  onEscKeyDown?: () => void;
  center?: boolean;
};

/* <Modal />
============================================================================= */
const Modal: React.FC<Props> = ({ title, children, center, ...props }) => {
  return (
    <ReactModal
      styles={{
        modal: {
          padding: 0,
          background: 'none',
        },
        closeButton: {
          display: 'none',
        },
      }}
      center={center}
      {...props}
    >
      <S.Wrapper>
        {title && (
          <S.TitleBar>
            <Heading as="h3" mb={0}>
              {title}
            </Heading>

            <Box ml="s4">
              <Button icon={<FiX />} onClick={props.onClose} />
            </Box>
          </S.TitleBar>
        )}

        {children}
      </S.Wrapper>
    </ReactModal>
  );
};

/* Default props - <Modal />
============================================================================= */
Modal.defaultProps = {
  center: true,
};

export default Modal;
