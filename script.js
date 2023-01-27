/*
	WEB 303 Assignment 1 - jQuery
	Name: Parth Prajapati
*/

//Created ready function.

$(document).ready(function() {

	//Created 'change' event as it will show the amount when user pressed an enter button.

	$("#yearly-salary, #percent").on("change", function() {
		
	/*
		Created 'keyup' event as it will show the amount when when user releases a key while typing.
	
		$("#yearly-salary, #percent").on("keyup", function(){

		});
	*/
		
		var salary = $("#yearly-salary").val();

		var percent = $("#percent").val();
		
		var amount = salary * percent / 100;
		
		$("#amount").text("$" + amount).toFixed(2); //To round the number to dollars and cents.
	
  	});

});