$(document).ready(() => 
{
  getTeamDataWithAjax();
});

const getTeamData = async () => 
{
  const response = await fetch('team.json');
  const data = await response.json();

  data.forEach((element) => 
  {
    const name = `<h2>${element.name}</h2>`;
    const position = `<h5>${element.position}</h5>`;
    const bio = `<p>${element.bio}</p>`;
    $('#team').append(`${name}${position}${bio}`);
  });
};

const getTeamDataWithAjax = async () => 
{
  $('#team').text('Loading...');

  const response = await fetch('team.json');
  const data = await response.json();

  setTimeout(() =>
   {
    $('#team').empty();

    data.forEach((element) => {
      const name = `<h2>${element.name}</h2>`;
      const position = `<h5>${element.position}</h5>`;
      const bio = `<p>${element.bio}</p>`;
      $('#team').append(`${name}${position}${bio}`);
    });
  }, 3000);
};

$(document).ajaxError(() =>
 {
  $('#team').text('Content could not be retrieved.');
  console.error('Content could not be retrieved.');
});