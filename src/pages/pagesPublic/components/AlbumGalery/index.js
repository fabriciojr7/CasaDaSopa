import {
  Container, Photo,
} from './styles';

export default function AlbumGalery({ album, getImage }) {
  return (

    <Container>
      {
          album?.map((photo) => (
            <Photo key={photo.id} onClick={() => getImage(photo.foto)}>
              <img src={photo.foto} alt="" />
            </Photo>
          ))
      }
    </Container>
  );
}
