
// WEB303 Assignment 2
// Name: Parth Prajapati

$(document).ready(function() {
    $("#content-wrapper").on("click", "a", function(event) {
      event.preventDefault();
  
      const id = $(this).attr("id");
      const url = `${id}.html`;
  
      $.ajax({
        url,
        success: function(data) {
          $("#content")
            .hide()
            .html(data)
            .fadeIn(1000);
        }
      });
    });
  });