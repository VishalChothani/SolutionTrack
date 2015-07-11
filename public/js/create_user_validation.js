$(document).ready(function(){
	
	var first_name = false;
	var last_name = false;
	var email_flag = false;

	function onlyAlpha(input)
	{
		var filter=/^[a-zA-Z]*$/;
		if (filter.test(input))
		{
			return true;
		}
		return false;		
	}

	function first_name_blur(){
		$(".first_name_error").hide();
		first_name = true;

		if(!(onlyAlpha($("#first_name").val())))
		{
			$(".first_name_error").text("Please enter only alphabets");
	        $(".first_name_error").show();
	        first_name = false;
		}
	}

	function last_name_blur(){
		$(".last_name_error").hide();
		last_name = true;

		if(!(onlyAlpha($("#last_name").val())))
		{
			$(".last_name_error").text("Please enter only alphabets");
	        $(".last_name_error").show();
	        last_name = false;
		}
	}

	function email_blur(){
		$(".email_error").hide();
		email_flag = true;

		var email = $("#email").val();
		var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		if (filter.test(email))
		{
			$.ajax({                                  
	            type: 'GET',
	            url: '/ajax_check_email',
	            data: { 
	                email: email
	            },
	        }).done(function(response) {  	        	
	        	if(response.duplicateEmail!="")
	        	{
	        		$(".email_error").text(response.duplicateEmail);
	        		$(".email_error").show();
	        		emaemail_flag = false;
	        	}
	            
	        }).error(function(response) {
	            alert("No");
	        });
		}
		else
		{
			$(".email_error").text("Please input a valid email address");
	        $(".email_error").show();
	        email_flag = false;	        
		}
	}

	$("#first_name").blur(function(){	
		first_name_blur();	
	});

	$("#last_name").blur(function(){	
		last_name_blur();	
	});



	$("#email").blur(function(){	
		email_blur();
				
	});

	$("form").submit(function(e){
		
		$(".register_error").hide();
		var password = $("#password").val();
		var confirm_password = $("#password_confirmation").val();

		first_name_blur();	
		last_name_blur();	
		email_blur();

		if((confirm_password !== password))
		{			
			$(".register_error").text("Please fill all the details properly");
	        $(".register_error").show();	        	        
	        e.preventDefault();	       
		}
		
	});
	

});
