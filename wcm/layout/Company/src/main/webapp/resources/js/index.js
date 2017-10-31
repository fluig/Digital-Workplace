// Toggle Function
$('.toggle').click(function(){
  // Switches the Icon
  $(this).children('i').toggleClass('fa-pencil');
  // Switches the forms  
  $('.form').animate({
    height: "toggle",
    'padding-top': 'toggle',
    'padding-bottom': 'toggle',
    opacity: "toggle"
  }, "slow");
});


$("#submitLogin").click(function(ev) {
	click();
});

function click(){
	$("#submitLogin").attr("disabled", "true");
	if (firstClickToLogin) {
		firstClickToLogin = false;
		//wcmLogin.envia();
	}
}