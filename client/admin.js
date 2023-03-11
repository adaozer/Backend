window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
});

const navSlide = function () {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav_links');
  const navLinks = document.querySelectorAll('.nav_links li');

  burger.addEventListener('click', function () {
    nav.classList.toggle('nav_active');

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5 ease forwards ${index / 5 + 1.5}s`;
      }
    });

    burger.classList.toggle('toggle');
  });
};

navSlide();

async function planeList () {
    const list = await fetch('http://127.0.0.1:8080/planes/');
    const dataText = await list.text();
    const dataJSON = JSON.parse(dataText);
    let tableData = '';
    dataJSON.map((values) => {
        tableData += `<p class="para">${values.name}</p>`;
    });

    document.querySelector('.box').innerHTML = tableData;
};

async function addPlane () {
    const form = document.getElementById('form-plane');
    form.addEventListener('submit', async function (event) {
      try {
      event.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      await fetch('http://127.0.0.1:8080/planes/new',
      {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
    } catch (err) {
      alert(`The website has disconnected, ${err}`);
    };
      planeList();
      form.reset();
    });
  };

document.addEventListener('DOMContentLoaded', addPlane);
document.addEventListener('DOMContentLoaded', planeList);
