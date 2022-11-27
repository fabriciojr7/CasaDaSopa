/* eslint-disable import/no-duplicates */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlbumService from '../../../services/AlbumService';
import toast from '../../../utils/toast';
import AlbumForm from '../components/AlbumForm';
import HeaderForm from '../components/HeaderForm';
import PhotosGalery from '../components/PhotosGalery';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import FileInput from '../../../components/FileInput';
import Loader from '../../../components/Loader';
import { Container, HeaderAlbumPhotos } from './styles';

export default function EditAlbum() {
  const [album, setAlbum] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAddPhoto, setIsLoadingAddPhoto] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getEntity = async () => {
      try {
        const { data } = await AlbumService.getAlbum(id);
        setAlbum(data[0]);
        setPhotos(data[0].photos);
        setIsLoading(false);
      } catch {
        toast({
          type: 'danger',
          text: 'Erro ao buscar dados do álbum!',
          duration: 5000,
        });
        navigate('/adm/entidades');
      }
    };

    getEntity();
  }, [id, navigate]);

  const toggleVisibleModal = () => {
    setSelectedFile(null);
    setVisibleModal((prevState) => !prevState);
  };

  const handleSubmit = async (formData) => {
    try {
      const { data } = await AlbumService.updateAlbum(id, formData);
      toast({
        type: 'success',
        text: 'Álbum editado com sucesso!',
        duration: 3000,
      });
      navigate(`/adm/albuns/edit/${data.id}`);
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o álbum!',
        duration: 5000,
      });
    }
  };

  const handleAddPhotoAlbum = async () => {
    try {
      setIsLoadingAddPhoto(true);
      const formData = new FormData();
      formData.append('albumId', id);
      if (selectedFile) {
        formData.append('foto', selectedFile);
      }

      const { data } = await AlbumService.addPhotoAlbum(formData);
      toast({
        type: 'success',
        text: 'Foto adicionada com sucesso!',
        duration: 3000,
      });
      toggleVisibleModal();
      setPhotos([...photos, data]);
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao adicionar a foto!',
        duration: 5000,
      });
    } finally {
      setIsLoadingAddPhoto(false);
    }
  };

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Modal
        loading={isLoadingAddPhoto}
        visible={visibleModal}
        title={`Adicione uma foto ao álbum ”${album.descricao}”`}
        cancelLabel="Cancelar"
        confirmLabel="Confirmar"
        onCancel={toggleVisibleModal}
        onConfirm={handleAddPhotoAlbum}
      >
        <FileInput image={selectedFile} setImage={setSelectedFile} />
      </Modal>

      <HeaderForm title="Edição de álbum" to="/adm/albuns" />

      <AlbumForm
        key={album.id}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        album={album}
      />

      <HeaderAlbumPhotos>
        <h2>Adicionar fotos no álbum</h2>
        <Button
          onClick={toggleVisibleModal}
        >
          Adicionar foto
        </Button>
      </HeaderAlbumPhotos>

      <PhotosGalery photos={photos} setPhotos={setPhotos} />

    </Container>
  );
}
