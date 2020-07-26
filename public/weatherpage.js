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
      console.log(searchQuery.value)
    }
  }
);
