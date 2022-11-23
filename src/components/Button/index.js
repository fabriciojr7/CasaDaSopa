import { StyledButton } from './styles';
import Spinner from '../Spinner';

export default function Button({
  type, disabled, isLoading, children, danger, onClick,
}) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      danger={danger}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}
