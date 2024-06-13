document.addEventListener('DOMContentLoaded', () => {
  const dropzoneBox = document.getElementsByClassName('dropzone-box')[0];
  const inputFiles = document.querySelectorAll(".dropzone-area input[type='file']");
  const inputElement = inputFiles[0];
  const dropZoneElement = inputElement.closest('.dropzone-area');

  const updateDropzoneFileList = (dropzoneElement, file) => {
    const dropzoneFileMessage = dropzoneElement.querySelector('.file-info');
    dropzoneFileMessage.innerHTML = `${file.name}, ${file.size} bytes`;
  };

  inputElement.addEventListener('change', (e) => {
    if (inputElement.files.length) {
      updateDropzoneFileList(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZoneElement.classList.add('dropzone--over');
  });

  ['dragleave', 'dragend'].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove('dropzone--over');
    });
  });

  dropZoneElement.addEventListener('drop', (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateDropzoneFileList(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove('dropzone--over');
  });

  dropzoneBox.addEventListener('reset', (e) => {
    const dropzoneFileMessage = dropZoneElement.querySelector('.file-info');
    dropzoneFileMessage.innerHTML = 'No hay archivo seleccionado';
  });

  dropzoneBox.addEventListener('submit', (e) => {
    e.preventDefault();
    const myFile = document.getElementById('upload-file');
  });
});
