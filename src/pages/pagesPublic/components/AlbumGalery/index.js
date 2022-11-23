import {
  Container, Photo,
} from './styles';

export default function AlbumGalery({ album, getImage }) {
  return (

    <Container>
      {
          album?.map((photo) => (
            <Photo key={photo.id} onClick={() => getImage(photo.image)}>
              <img src={photo.image} alt="" />
            </Photo>
          ))
      }
    </Container>
  );
}
