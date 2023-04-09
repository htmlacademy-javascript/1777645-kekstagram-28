const FILES_TYPES = ['jpg', 'jpeg', 'png'];
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview ');

const showPreview = () => {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILES_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((item) => {
      item.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
    });
  }
};

const clearPreview = () => {
  effectsPreview.forEach((item) => {
    item.removeAttribute('style');
  });
};

export { showPreview, clearPreview };
