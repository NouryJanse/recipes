import { ButtonStyle } from './styled';

const Button = ({ onClick, disabled = false, label }) => {
  return (
    <ButtonStyle disabled={disabled} onClick={onClick}>
      {label}
    </ButtonStyle>
  );
};

export default Button;
