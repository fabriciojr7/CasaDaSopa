import {
  Container,
} from './styles';

export default function Select({
  children, label, error, value, change, max,
}) {
  return (
    <Container error={error}>
      <select
        className="select"
        placeholder=" "
        value={value}
        onChange={change}
        maxLength={max}
      >
        {children}
      </select>
      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        {label}
      </label>
    </Container>
  );
}
