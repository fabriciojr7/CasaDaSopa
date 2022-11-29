import { useEffect, useState } from 'react';
import TitleSection from '../components/TitleSection';
import ContainerSection from '../components/ContainerSection';
import AlbumService from '../../../services/AlbumService';
import ImageModal from '../../../components/ImageModal';
import AlbumGalery from '../components/AlbumGalery';

import {
  Album, EmptyGalery,
} from './styles';
import Loader from '../../../components/Loader';
import RequestError from '../components/RequestError';
import galeryEmpty from '../../../assets/images/icons/galeryEmpty.svg';

export default function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [tempImage, setTempImage] = useState('');
  const [visibleImageModal, setVisibleImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadAlbuns() {
      try {
        setIsLoading(true);
        const { data } = await AlbumService.listAlbunsVisible();

        setAlbums(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
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
      <TitleSection title="Galeria" subtitle="Um pouco mais dos nossos trabalhos" />

      <Loader isLoading={isLoading} />

      <ImageModal
        visible={visibleImageModal}
        image={tempImage}
        onClose={toggleVisibleImageModal}
      />

      {hasError && (
        <RequestError />
      )}

      {(albums.length === 0) && !isLoading && (
      <EmptyGalery>
        <img src={galeryEmpty} alt="Galeria vazia" />
        <span>Nenhuma foto foi adicionada a galeria, tente novamente mais tarde!</span>
      </EmptyGalery>
      )}

      {!hasError && (
      <div>
        {albums?.map((album) => (
          <Album key={album.id}>
            <h2>{album.descricao}</h2>
            <AlbumGalery
              album={album.photos}
              getImage={getImage}
            />
          </Album>
        ))}
      </div>
      )}

    </ContainerSection>
  );
}
