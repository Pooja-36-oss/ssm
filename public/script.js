document.addEventListener('DOMContentLoaded', function () {
  // ===== Mobile Menu Toggle =====
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // ===== Dropdown Toggle on Mobile =====
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(drop => {
    drop.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // Prevent anchor link behavior
        this.classList.toggle('open');
      }
    });
  });

  // ===== Arrow Dropdown Logic (Desktop) =====
  const arrows = document.querySelectorAll(".dropdown-arrow");

  arrows.forEach(arrow => {
    arrow.addEventListener("click", function (e) {
      const targetId = this.dataset.dropdown;
      const dropdown = document.getElementById(targetId);

      document.querySelectorAll(".dropdown-menu").forEach(menu => {
        if (menu !== dropdown) menu.classList.remove("show");
      });

      dropdown.classList.toggle("show");
      this.classList.toggle("open");

      arrows.forEach(other => {
        if (other !== this) other.classList.remove("open");
      });

      e.stopPropagation();
    });
  });

  document.addEventListener("click", function () {
    document.querySelectorAll(".dropdown-menu").forEach(menu => menu.classList.remove("show"));
    arrows.forEach(arrow => arrow.classList.remove("open"));
  });

  // ===== Back to Top Button =====
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.onscroll = () => {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    };

    backToTopBtn.onclick = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  }

  // ===== Form Submission with Modal =====
  const form = document.getElementById('Service-form');
  const messageContainer = document.getElementById('messageContainer');
  const modal = document.getElementById('customModal');
  const modalText = document.getElementById('modalText');
  const closeModal = document.getElementById('closeModal');

  function showModal(message) {
    modalText.textContent = message;
    modal.classList.add('show');
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(form);
      const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phoneNumber: formData.get('phoneNumber'),
        serviceType: formData.get('serviceType'),
        message: formData.get('message')
      };

      fetch('/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(async response => {
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error("Server returned non-JSON:\n" + text);
          }
          return response.json();
        })
        .then(result => {
          if (result.success) {
            form.reset();
            showModal("Form submitted successfully!");
          } else {
            showModal("Error: " + result.message);
          }
        })
        .catch(error => {
          showModal("An error occurred: " + error.message);
        });
    });
  }
});
