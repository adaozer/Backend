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
      planeList();
      form.reset();
    });
  };

document.addEventListener('DOMContentLoaded', addPlane);
document.addEventListener('DOMContentLoaded', planeList);
