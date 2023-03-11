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
  try {
const selection = await fetch(`http://127.0.0.1:8080/journeys/${journey}`);
const selectionText = await selection.text();
const selectionJSON = JSON.parse(selectionText);
const tableData = `<tr><td data-label="Start">${selectionJSON.Start}</td>
<td data-label="Destination">${selectionJSON.Destination}</td> 
<td data-label="Distance">${selectionJSON.Distance}</td> 
<td data-label="Haul">${selectionJSON.Haul}</td>
<td data-label="Expected Passengers">${selectionJSON.ExpectedPassengers}</td>  
<td data-label="Transcontinental">${selectionJSON.Transcontinental}</td> 
</tr>`;
document.getElementById('tbody1').innerHTML = tableData;
document.getElementById('journey-name').innerHTML = journey;
} catch (err) {
  alert(`The website disconnected, ${err}`);
};
}

async function loadPlanes () {
const dataFetch = await fetch('http://127.0.0.1:8080/planes');
const fetchResponseTxt = await dataFetch.text();
const planesJSON = JSON.parse(fetchResponseTxt);
let tableData = '';

planesJSON.map((values) => {
  tableData += `<tr>
  <td data-label="Model">${values.name}</td>
  <td data-label="Maximum Range">${values.MaximumRange}</td> 
  <td data-label="Maximum Speed">${values.MaximumSpeed}</td> 
  <td data-label="Passenger Capacity">${values.PassengerCapacity}</td>
  <td data-label="Price">${values.Price}</td>  
  <td data-label="Image"><img src="./images/${values.Image}" class="img"</img></td>
  <td data-label="Show Info"><button class="btn btn-primary" onclick="planeData('${values.name.replace(/\s+/g, '')}')">Show Info</button></td>
  </tr>`;
});
document.getElementById('tbody2').innerHTML = tableData;
}

 async function planeData (plane) {
  const box = document.querySelector('.box');
  try {
  const planeFetch = await fetch(`http://127.0.0.1:8080/planes/${plane}`);
  const planeFetchText = await planeFetch.text();
  if (box.innerHTML === `<p class="para">${planeFetchText}</p>`) {
    box.innerHTML = '';
  } else {
  box.innerHTML = `<p class="para">${planeFetchText}</p>`;
  }
} catch (err) {
alert(`The website has disconnected, ${err}`);
  };
};

async function addJourney () {
  const form = document.getElementById('form-journey');
  form.addEventListener('submit', async function (event) {
      event.preventDefault();
      try {
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
    } catch (err) {
      alert(`The website has disconnected, ${err}`);
      };
      loadJourneys();
      form.reset();
  });
  };

document.addEventListener('DOMContentLoaded', loadJourneys);
document.addEventListener('DOMContentLoaded', addJourney);
document.addEventListener('DOMContentLoaded', loadPlanes);
document.addEventListener('DOMContentLoaded', showJourney('London-Paris'));
