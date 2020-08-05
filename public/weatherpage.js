// Grab necessary elements
const searchForm = document.querySelector('#search-form');
const searchQuery = document.querySelector('#search');
const display = document.querySelector('.cards');
const message = document.querySelector('.msg');
// var weather = {{ data }};   // this will grab data passed by render

searchForm.addEventListener('submit',
  (e) =>
  {

    if (searchQuery.value ===  '' || searchQuery.value.length != 5)
    {
        e.preventDefault();
      message.classList.add('error');
      message.innerHTML = 'Please enter a valid 5-digit ZIP code.';

      setTimeout(() =>
        {
          message.innerHTML = '';
          message.classList.remove('error');
        },
        5000
      );
    }
  }
);

function clear()
{
    while (display.hasChildNodes())
    {
      display.removeChild(display.firstChild);
    }
}

function newCard(p_loc, p_temp, p_pre, p_sup, p_sdn)
{
    const newCard = document.createElement('div');
    newCard.classList.add('searchcard');
    // Image
    const image = document.createElement('img');
    image.width = '200em';
    image.src = 'https://www.trbimg.com/img-5a3d3316/turbine/ct-edit-amazon-chicago-rank-edit-20171206';
    image.alt = 'Chicago';
    newCard.appendChild(image);

    // Title
    const title = document.createElement('h3');
    title.innerHTML = p_loc;
    newCard.appendChild(title);

    // List definition
    // Could possibly be refactored into for-each
    const ul = document.createElement('ul');
      // List elements
      const temp = document.createElement('li');
      temp.appendChild(document.createTextNode(`Temperature : ${p_temp}`));
      const perc = document.createElement('li');
      perc.appendChild(document.createTextNode(`Precipitation : ${p_pre}`));
      const sup = document.createElement('li');
      sup.appendChild(document.createTextNode(`Sunup : ${p_sup}`));
      const sdn = document.createElement('li');
      sdn.appendChild(document.createTextNode(`Sundown : ${p_sdn}`));
      ul.appendChild(temp);
      ul.appendChild(perc);
      ul.appendChild(sup);
      ul.appendChild(sdn);

    newCard.appendChild(ul);

    display.appendChild(newCard);
}
