/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Container,
} from './styles';

export default function Input({
  label, error, value, change, max, type, disabled, autoFocus,
}) {
  return (
    <Container error={error}>
      <input
        className="input"
        placeholder=" "
        value={value}
        onChange={change}
        maxLength={max}
        type={type}
        disabled={disabled}
        autoFocus={autoFocus}
      />

      <label>
        {label}
      </label>
    </Container>
  );
}
