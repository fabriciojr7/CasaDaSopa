import ReactDOM from 'react-dom';
import { MdClose } from 'react-icons/md';
import {
  Overlay,
} from './styles';

export default function ImageModal({
  visible,
  image,
  onClose,
}) {
  if (!visible) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      {/* <Container> */}
      <img src={image} alt="Imagem" />

      <MdClose onClick={onClose} />
      {/* </Container> */}
    </Overlay>,
    document.getElementById('modal-root'),
  );
}
