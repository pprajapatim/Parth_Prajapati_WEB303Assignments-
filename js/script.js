$(document).ready(function () {

  // Retrieve JSON data using jQuery ajax method
  $.ajax({
      url: 'Data.json',
      dataType: 'json',
      success: function (data) {

          // Create a variable to store the table rows
          var tableRows = '';

          // Loop through the data and create table rows
          $.each(data, function (index, value) {
              tableRows += '<tr>';
              tableRows += '<td>' + value.first_name + '</td>';
              tableRows += '<td>' + value.last_name + '</td>';
              tableRows += '<td>' + value.occupation + '</td>';
              tableRows += '<td>' + value.age + '</td>';
              tableRows += '<td>' + value.gender + '</td>';
              tableRows += '<td>' + value.bod + '</td>';
              tableRows += '</tr>';
          });

          // Append the table rows to the table body
          $('#tableBody').append(tableRows);

          // Initialize search functionality
          $('#search').on('keyup', function () {
              var value = $(this).val().toLowerCase();
              $('#tableBody tr').filter(function () {
                  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
              });
          });

          // Initialize sorting functionality
          var sortDirection = true; // true is ascending, false is descending
          $('th').click(function () {
              var columnIndex = $(this).index();
              var rows = $('#tableBody  tr').toArray();
              var arrow = '';
              if (sortDirection) {
                  rows.sort(sortAscending(columnIndex));
                  arrow = '&#x25B2;';
              } else {
                  rows.sort(sortDescending(columnIndex));
                  arrow = '&#x25BC;';
              }
              $.each($('th'), function (index, th) {
                  if (index == columnIndex) {
                      $(th).html($(th).text() + arrow);
                  } else {
                      $(th).html($(th).text());
                  }
              });
              $('#tableBody').empty().append(rows);
              sortDirection = !sortDirection;
          });
      }
  });

  // Helper function for sorting ascending
  function sortAscending(columnIndex) {
      return function (a, b) {
          var aText = $(a).children('td').eq(columnIndex).text();
          var bText = $(b).children('td').eq(columnIndex).text();
          return $.isNumeric(aText) && $.isNumeric(bText) ?
              aText - bText :
              aText.localeCompare(bText);
      }
  }

  // Helper function for sorting descending
  function sortDescending(columnIndex) {
      return function (a, b) {
          var aText = $(a).children('td').eq(columnIndex).text();
          var bText = $(b).children('td').eq(columnIndex).text();
          return $.isNumeric(aText) && $.isNumeric(bText) ?
              bText - aText :
              bText.localeCompare(aText);
      }
  }

});
