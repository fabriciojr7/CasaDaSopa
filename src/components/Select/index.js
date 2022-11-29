/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Container,
} from './styles';

export default function Select({
  children, label, error, value, change, disabled,
}) {
  return (
    <Container error={error}>
      <select
        className="select"
        placeholder=" "
        value={value}
        onChange={change}
        disabled={disabled}
      >
        {children}
      </select>

      <label>
        {label}
      </label>
    </Container>
  );
}
