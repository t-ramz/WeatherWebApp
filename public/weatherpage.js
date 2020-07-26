// Grab necessary elements
const searchForm = document.querySelector('#search-form');
const searchQuery = document.querySelector('#search');
const display = document.querySelector('.cards')

searchForm.addEventListener('submit',
  (e) =>
  {
    e.preventDefault();

    if (searchQuery.value ===  '' || searchQuery.value.length != 5)
    {
      console.log('true');
    }
    else
    {
      while (display.hasChildNodes())
      {
        display.removeChild(display.firstChild);
      }
      // display.classList.add('card')
      const newCard = document.createElement('div');
      newCard.classList.add('card')
      // Image
      const image = document.createElement('img');
      image.width = '200em';
      image.src = 'https://www.trbimg.com/img-5a3d3316/turbine/ct-edit-amazon-chicago-rank-edit-20171206';
      image.alt = 'Chicago';
      newCard.appendChild(image);

      // Title
      const title = document.createElement('h3');
      title.innerHTML = 'Chicago';
      newCard.appendChild(title);

      // List definition
      const ul = document.createElement('ul');
        // List elements
        const temp = document.createElement('li');
        temp.appendChild(document.createTextNode(`Temperature : VALUE`));
        const perc = document.createElement('li');
        perc.appendChild(document.createTextNode(`Percipitation : VALUE`));
        const sup = document.createElement('li');
        sup.appendChild(document.createTextNode(`Sunup : VALUE`));
        const sdn = document.createElement('li');
        sdn.appendChild(document.createTextNode(`Sundown : VALUE`));
        ul.appendChild(temp);
        ul.appendChild(perc);
        ul.appendChild(sup);
        ul.appendChild(sdn);
        
      newCard.appendChild(ul);

      // newCard.innerHTML =
      // "<div class="card">
			// 	<img src="https://www.trbimg.com/img-5a3d3316/turbine/ct-edit-amazon-chicago-rank-edit-20171206" alt="Chicago" width="200em">
			// 	<h3>Chicago</h3>
			// 	<ul>
			// 		<li>Temperature: </li>
			// 		<li>Precipitation: </li>
			// 		<li>Sunup: </li>
			// 		<li>Sundown: </li>
			// 	</ul>
			// </div>";

      display.appendChild(newCard)
    }
  }
);
