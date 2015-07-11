$(document).ready(function(){
	
	$(".nav_login").click(function(){		
		localStorage.setItem("clicked", "Login");				
	});

	$(".nav_create_account").click(function(){
		localStorage.setItem("clicked", "Create_account");		
	});

	if(localStorage.getItem("clicked")=="Login"){
		$(".nav_login").addClass("active");
		$(".nav_create_account").removeClass("active");
	}
	else if(localStorage.getItem("clicked")=="Create_account"){
		$(".nav_create_account").addClass("active");
		$(".nav_login").removeClass("active");
	}
});