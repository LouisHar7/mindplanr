const emailInput = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');
const successMessage = document.getElementById('successMessage');
const form = document.getElementById('subscribeForm');

emailInput.addEventListener('input', function () {
  if (this.validity.valid) {
    emailError.classList.add('hidden');
    this.classList.remove('border-red-500', 'focus:ring-red-400');
    this.classList.add('focus:ring-purple-400');
  } else {
    emailError.classList.remove('hidden');
    this.classList.add('border-red-500', 'focus:ring-red-400');
    this.classList.remove('focus:ring-purple-400');
  }
});

function submitEmail(event) {
  event.preventDefault();

  if (!emailInput.validity.valid) {
    emailError.classList.remove('hidden');
    successMessage.classList.add('hidden');
    return;
  }

  // Google Form POST URL
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScxm8ZoSLk7obgcdu3HF2ytv1vHHxyJQQYXeq7U0TMzTcsQzw/formResponse';

  // Your actual field name from pre-filled link
  const emailFieldName = 'entry.1134455002';

  const formData = new FormData();
  formData.append(emailFieldName, emailInput.value);

  fetch(formUrl, {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  }).then(() => {
    successMessage.classList.remove('hidden');
    emailError.classList.add('hidden');

    setTimeout(() => {
      form.reset();
      successMessage.classList.add('hidden');
    }, 3000);
  }).catch((error) => {
    console.error('Submission failed:', error);
  });
}
