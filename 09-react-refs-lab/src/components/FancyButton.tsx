import React from 'react';
import './FancyButton.css';

type FancyButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const FancyButton = React.forwardRef<HTMLButtonElement, FancyButtonProps>((props: FancyButtonProps, fRef) => {
  const { children, ...other } = props;
  return (
    <button {...other} ref={fRef} className="FancyButton">
      {props.children}
    </button>
  );
});

export default FancyButton;