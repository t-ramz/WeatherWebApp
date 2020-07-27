// Grab data
const conForm = document.querySelector('.contact-form');
const nameField = document.querySelector('#name');
const emailInput =  document.querySelector('#email');
const messageInput = document.querySelector('#message');
const message = document.querySelector('.msg');

// Functions to call
const onSubmit = (e) =>
{
  if (nameField.value === '' || emailInput.value === '')
  {
    e.preventDefault();
    message.classList.add('error');
    message.innerHTML = 'Please enter values for both your Name and Email.';

    setTimeout(() => message.innerHTML = '', 5000);
  }
  else if (messageInput.value === '')
  {
    e.preventDefault();
    message.classList.remove('error')
    message.classList.add('error');
    message.innerHTML = 'Please include a message with your Concerns.'
  }
  else
  {
    console.log('successfully entered data');
  }
}

// Listen for actions
conForm.addEventListener('submit', onSubmit);
