import { useEffect, useState } from 'react';
import TitleSection from '../components/TitleSection';
import ContainerSection from '../components/ContainerSection';
import AlbumService from '../../../services/AlbumService';
import ImageModal from '../../../components/ImageModal';
import AlbumGalery from '../components/AlbumGalery';

import {
  Album,
} from './styles';

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
