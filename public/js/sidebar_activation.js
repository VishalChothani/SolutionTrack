$(document).ready(function(){
	
	$('.sidebar li').click(function (e) {  		  		
  		localStorage.setItem("tab_clicked", $(this).attr("class"));
	})

	if(localStorage.getItem("tab_clicked")!=null)
	{
		$('.sidebar li.'+localStorage.getItem("tab_clicked")).addClass('active');
	}

	// On logout clear localStorage 

});