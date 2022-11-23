import {
  Container,
} from './styles';

export default function TextArea({
  label, error, value, change, max, disabled,
}) {
  return (
    <Container error={error}>
      <textarea
        className="area"
        placeholder=" "
        value={value}
        onChange={change}
        maxLength={max}
        disabled={disabled}
      />
      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        {label}
      </label>
    </Container>
  );
}
