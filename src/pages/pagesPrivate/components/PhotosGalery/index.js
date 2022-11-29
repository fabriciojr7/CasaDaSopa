import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Modal from '../../../../components/Modal';
import AlbumService from '../../../../services/AlbumService';
import toast from '../../../../utils/toast';
import { Container } from './styles';

export default function PhotosGalery({ photos, setPhotos }) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [photoBeingDeleted, setPhotoBeingDeleted] = useState(null);
  const [isLoadingDeleted, setIsLoadingDeleted] = useState(false);

  const toggleVisibleModal = () => {
    setVisibleModal((prevState) => !prevState);
  };

  const handleDeletePhoto = (photo) => {
    setPhotoBeingDeleted(photo);
    setVisibleModal(true);
  };

  const handleCloseDeleteModal = () => {
    setVisibleModal(false);
    setPhotoBeingDeleted(null);
  };

  const handleConfirmDeleteContributor = async () => {
    try {
      setIsLoadingDeleted(true);
      await AlbumService.removePhotoAlbum(photoBeingDeleted?.id);

      setPhotos((prevState) => prevState.filter(
        (photo) => photo.id !== photoBeingDeleted.id,
      ));

      toast({
        type: 'success',
        text: 'Foto deletada com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar a foto!',
      });
    } finally {
      setIsLoadingDeleted(false);
      handleCloseDeleteModal();
    }
  };

  return (
    <Container>
      <Modal
        visible={visibleModal}
        danger
        title="Realmente deseja excluir a foto do álbum?"
        cancelLabel="Cancelar"
        confirmLabel="Confirmar"
        onCancel={toggleVisibleModal}
        onConfirm={handleConfirmDeleteContributor}
        loading={isLoadingDeleted}
      >
        <p>Essa ação é irreversível!</p>
      </Modal>

      <div className="container-img">

        {photos?.map((photo) => (
          <div
            key={photo.id}
            className="area-img"
          >
            <FaTrash
              className="icon-remove"
              onClick={() => handleDeletePhoto(photo)}
            />
            <img src={photo.foto} alt="Imagem Galeria" />
          </div>
        ))}
      </div>

    </Container>
  );
}
