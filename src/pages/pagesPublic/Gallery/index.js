import { useEffect, useState } from 'react';
import TitleSection from '../components/TitleSection';
import ContainerSection from '../components/ContainerSection';
import AlbumService from '../../../services/AlbumService';
import ImageModal from '../../../components/ImageModal';
import AlbumGalery from '../components/AlbumGalery';

import {
  Album,
} from './styles';

/*
import image1 from '../../../assets/images/image1.jpeg';
import image2 from '../../../assets/images/image2.jpeg';
import image3 from '../../../assets/images/image3.jpeg';
import image4 from '../../../assets/images/image4.jpeg';

const albums = [
  {
    id: 1,
    tituloAlbum: 'Dia das crianças',
    photos: [
      { id: 1, image: image1 },
      { id: 2, image: image2 },
      { id: 3, image: image3 },
      { id: 4, image: image4 },
      { id: 5, image: image1 },
      { id: 6, image: image2 },
      { id: 7, image: image3 },
      { id: 8, image: image4 },
      { id: 9, image: image1 },
      { id: 10, image: image2 },
      { id: 11, image: image3 },
      { id: 12, image: image4 },
    ],
  },

  {
    id: 2,
    tituloAlbum: 'Dia das Mães',
    photos: [
      { id: 1, image: image1 },
      { id: 2, image: image2 },
      { id: 3, image: image3 },
      { id: 4, image: image4 },
      { id: 5, image: image1 },
      { id: 6, image: image2 },
      { id: 7, image: image3 },
      { id: 8, image: image4 },
      { id: 9, image: image1 },
      { id: 10, image: image2 },
      { id: 11, image: image3 },
      { id: 12, image: image4 },
    ],
  },

]; */

export default function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [tempImage, setTempImage] = useState('');
  const [visibleImageModal, setVisibleImageModal] = useState(false);

  useEffect(() => {
    async function loadAlbuns() {
      const { data } = await AlbumService.listAlbunsVisible();
      setAlbums(data);
    }

    loadAlbuns();
  }, []);

  const toggleVisibleImageModal = () => {
    setVisibleImageModal((prevState) => !prevState);
  };

  const getImage = (img) => {
    setTempImage(img);
    toggleVisibleImageModal();
  };

  return (
    <ContainerSection>

      <ImageModal
        visible={visibleImageModal}
        image={tempImage}
        onClose={toggleVisibleImageModal}
      />
      <TitleSection title="Galeria" subtitle="Um pouco mais dos nossos trabalhos" />

      {albums?.map((album) => (
        <Album key={album.id}>
          <h2>{album.descricao}</h2>
          <AlbumGalery
            album={album.photos}
            getImage={getImage}
          />
        </Album>

      ))}

    </ContainerSection>
  );
}
