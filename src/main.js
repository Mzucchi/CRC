import './style.css'

const fileInput = document.querySelector('#pdf-upload')
const fileStatus = document.querySelector('#file-status')

fileInput.addEventListener('change', () => {
  const [file] = fileInput.files
  fileStatus.textContent = file ? file.name : 'No file selected'
  fileStatus.classList.toggle('has-file', Boolean(file))
})
