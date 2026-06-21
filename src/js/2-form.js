const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');
const formData = { email: '', message: '' };

populateFromStorage();

formEl.addEventListener('input', handleInput);
formEl.addEventListener('submit', handleSubmit);

function handleInput(event) {
  const { name, value } = event.target;
  if (!(name in formData)) return;

  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleSubmit(event) {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  formEl.reset();
}

function populateFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  let parsed;
  try {
    parsed = JSON.parse(saved);
  } catch {
    return;
  }

  formData.email = parsed.email ?? '';
  formData.message = parsed.message ?? '';
  formEl.elements.email.value = formData.email;
  formEl.elements.message.value = formData.message;
}
