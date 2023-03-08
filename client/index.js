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

async function loadJourneys () {
  const dataFetch = await fetch('http://127.0.0.1:8080/journeys');
  const fetchResponseTxt = await dataFetch.text();
  const journeysJSON = JSON.parse(fetchResponseTxt);
  let dropdownData = '';
  journeysJSON.map((values) => {
    dropdownData += `<a class="dropdown-item" href="#" onclick="showJourney('${values}')">${values}</a>`;
  });

  document.getElementById('selam').innerHTML = dropdownData;
};

async function showJourney (journey) {
const selection = await fetch(`http://127.0.0.1:8080/journeys/${journey}`);
const selectionText = await selection.text();
const selectionJSON = JSON.parse(selectionText);
const tableData = `<tr><td>${selectionJSON.Start}</td>
<td>${selectionJSON.Destination}</td> 
<td>${selectionJSON.Distance}</td> 
<td>${selectionJSON.Haul}</td>
<td>${selectionJSON.ExpectedPassengers}</td>  
<td>${selectionJSON.Transcontinental}</td> 
</tr>`;

document.getElementById('tbody1').innerHTML = tableData;
document.getElementById('journey-name').innerHTML = journey;
}

async function loadPlanes () {
const dataFetch = await fetch('http://127.0.0.1:8080/planes');
const fetchResponseTxt = await dataFetch.text();
const planesJSON = JSON.parse(fetchResponseTxt);
let tableData = '';

planesJSON.map((values) => {
  tableData += `<tr>
  <td>${values.name}</td>
  <td>${values.MaximumRange}</td> 
  <td>${values.MaximumSpeed}</td> 
  <td>${values.PassengerCapacity}</td>
  <td>${values.Price}</td>  
  <td><img src="./images/${values.Image}" class="img"</img></td> 
  </tr>`;
});
document.getElementById('tbody2').innerHTML = tableData;
}

// async function planeData (plane) {
//  const planeFetch = await fetch(`http://127.0.0.1:8080/planes/${plane}`);
// const planeFetchText = await planeFetch.text();
//  const planeData = JSON.parse(planeFetchText);
//  let getInfo = '';
//  document.getElementById('show-info').innerHTML = getInfo;
// }

async function addJourney () {
  const form = document.getElementById('form-journey');
  form.addEventListener('submit', async function (event) {
      event.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      await fetch('http://127.0.0.1:8080/journeys/new',
      {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(data)
      });

      loadJourneys();
      form.reset();
  });
  };

async function addPlane () {
  const form = document.getElementById('form-plane');
  form.addEventListener('submit', async function (event) {
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

    loadPlanes();
    form.reset();
  });
};

document.addEventListener('DOMContentLoaded', loadJourneys);
document.addEventListener('DOMContentLoaded', addJourney);
document.addEventListener('DOMContentLoaded', loadPlanes);
document.addEventListener('DOMContentLoaded', addPlane);
document.addEventListener('DOMContentLoaded', showJourney('London-Paris'));
