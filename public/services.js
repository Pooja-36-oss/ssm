function toggleForm(formId) {
  const form = document.getElementById(formId);
  if (form.style.display === "block") {
    form.style.display = "none";
  } else {
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('repair-form');
  const messageContainer = document.getElementById('messageContainer');
  const modal = document.getElementById('customModal');
  const modalText = document.getElementById('modalText');
  const closeModal = document.getElementById('closeModal');

  // Submit event listener
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      issue: formData.get('issue')
    };

    fetch('/submit-repair', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          // Show custom modal
          modalText.textContent = "Repair request submitted successfully!";
          modal.style.display = "block";

          messageContainer.innerHTML = '<p class="success">Repair request submitted successfully!</p>';
          form.reset();
        } else {
          messageContainer.innerHTML = `<p class="error">Error submitting the repair request: ${result.message}</p>`;
        }
      })
      .catch(error => {
        messageContainer.innerHTML = `<p class="error">An error occurred: ${error}</p>`;
      });
  });

  // Modal close button
  closeModal.addEventListener('click', function () {
    modal.style.display = "none";
  });

  // Close modal if clicking outside
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});




document.addEventListener('DOMContentLoaded', function () {
  const virtualForm = document.getElementById('virtualVisitForm');
  const messageContainer = document.getElementById('messageContainer'); // You must have this in your HTML
  const modal = document.getElementById('customModal');
  const modalText = document.getElementById('modalText');
  const closeModal = document.getElementById('closeModal');

  virtualForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(virtualForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      datetime: formData.get('datetime'),
      message: formData.get('message')
    };

    fetch('/submit-virtual-visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          modalText.textContent = "Virtual visit booked successfully!";
          modal.style.display = "block";

          messageContainer.innerHTML = '<p class="success">Virtual visit booked successfully!</p>';
          virtualForm.reset();
        } else {
          messageContainer.innerHTML = `<p class="error">Error booking virtual visit: ${result.message}</p>`;
        }
      })
      .catch(error => {
        messageContainer.innerHTML = `<p class="error">An error occurred: ${error}</p>`;
      });
  });

  // Reuse modal close functionality
  closeModal.addEventListener('click', function () {
    modal.style.display = "none";
  });

  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
