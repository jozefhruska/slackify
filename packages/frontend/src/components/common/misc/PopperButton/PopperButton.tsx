import React, { useState } from 'react';
import { Manager, Reference, Popper, PopperProps } from 'react-popper';

import Button, { ButtonProps } from '../Button/Button';

import * as S from './PopperButton.styles';

/* Props - <PopperButton />
============================================================================= */
type Props = {
  options: (close: () => void) => Array<{ text?: string } & ButtonProps>;
  children: (ref: React.Ref<HTMLButtonElement>, onClick: () => void) => React.ReactElement;
} & Pick<PopperProps, 'placement'>;

/* <PopperButton />
============================================================================= */
const PopperButton: React.FC<Props> = ({ options, children, ...props }) => {
  const [isPopperVisible, setPopperVisible] = useState<boolean>(false);

  /**
   * Handles click event on the reference element
   */
  const handleClick = () => {
    setPopperVisible(!isPopperVisible);
  };

  /**
   * Handles closing of popper element.
   */
  const handleClose = () => {
    setPopperVisible(false);
  };

  return (
    <Manager>
      <Reference>{({ ref }) => children(ref, handleClick)}</Reference>

      {isPopperVisible && (
        <Popper {...props}>
          {({ ref, style, placement }) => (
            <S.PopperWrapper ref={ref} style={style} data-placement={placement}>
              {options(handleClose)?.map(({ text, ...buttonProps }, key) => (
                <S.ChildButtonWrapper key={key} data-placement={placement}>
                  <Button {...buttonProps}>{text ? text : ''}</Button>
                </S.ChildButtonWrapper>
              ))}
            </S.PopperWrapper>
          )}
        </Popper>
      )}
    </Manager>
  );
};

/* Default props - <PopperButton />
============================================================================= */
PopperButton.defaultProps = {
  placement: 'top',
};

export default PopperButton;
