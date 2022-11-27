/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { File } from './styles';

export default function FileInput({ image, setImage }) {
  const [fileUrl, setFileUrl] = useState(null);
  useEffect(() => {
    if (image) {
      if (typeof image === 'string') {
        setFileUrl(image);
      } else {
        setFileUrl(URL.createObjectURL(image));
      }
    }
  }, [image]);

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  return (
    <File className="picture" tabIndex="0">
      <input
        type="file"
        name="imagem"
        accept="image/*"
        className="picture-input"
        onChange={handleImageChange}
      />
      <span className="picture-image">
        {fileUrl
          ? (
            <img
              className="picture-img"
              src={fileUrl}
              alt="Imagem"
            />
          ) : (
            <div>
              <FaCamera size={32} />
              Imagem do grupo
            </div>
          )}
      </span>
    </File>
  );
}
