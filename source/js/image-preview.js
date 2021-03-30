const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarPick = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imagePick = document.querySelector('#images');
const imagesBlock = document.querySelector('.ad-form__photo');
/**
 * Функция добавления превью изображения аватара
 */
const pickAvatar = () => {
  avatarPick .addEventListener('change', () => {
    const file = avatarPick.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
}
/**
 * Функция добавления превью фотографий жилья
 */
const pickImage = () => {
  imagePick.addEventListener('change', () => {
    const file = imagePick.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      const newImage = document.createElement('img');
      newImage.classList.add = 'photo-preview';
      newImage.width = '70';
      newImage.height = '70';
      newImage.alt = 'Фотография жилья';

      reader.addEventListener('load', () => {
        newImage.src = reader.result;
        imagesBlock.appendChild(newImage);
      });

      reader.readAsDataURL(file);
    }
  });
}

export { pickAvatar, pickImage }
