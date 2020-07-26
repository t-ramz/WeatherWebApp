// Grab data
const conForm = document.querySelector('.contact-form');
const nameField = document.querySelector('#name');
const emailInput =  document.querySelector('#email');
const messageInput = document.querySelector('#message');
const message = document.querySelector('.msg');

// Functions to call
const onSubmit = (e) =>
{
  e.preventDefault();

  if (nameField.value === '' || emailInput.value === '')
  {
    message.classList.add('error');
    message.innerHTML = 'Please enter values for both your Name and Email.';

    setTimeout(() => message.remove(), 5000);
  }
  else if (messageInput.value === '')
  {
    message.classList.add('warn');
    message.innerHTML = 'Please include a message with your Concerns'
  }
  else
  {
    console.log('successfully entered data');
  }
}

// Listen for actions
conForm.addEventListener('submit', onSubmit);
