import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const saveStateToLocalStorage = throttle(() => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(state));
}, 500);

const loadStateFromLocalStorage = () => {
  const storedState = localStorage.getItem('feedback-form-state');
  if (storedState) {
    const state = JSON.parse(storedState);
    emailInput.value = state.email || '';
    messageInput.value = state.message || '';
  }
};

form.addEventListener('input', event => {
  if (event.target === emailInput || event.target === messageInput) {
    saveStateToLocalStorage();
  }
});

window.addEventListener('load', loadStateFromLocalStorage);

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log('Submitting form...');

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log('Form data before clearing:', formData);

  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
  console.log('Form state cleared.');
});
