$(function() {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
     
      //Abre processo no fluig
      
    //recuperar dados do formulario da widget
		var nome   = $('#name').val();
		var email  = $('#email').val();
		var tel    = $('#phone').val();
		var cat    = $('#request :selected').val();
		var msg    = $('#message').val();
		
		var myDateRequest = new Date(Date.now());
		
		var dt        = myDateRequest.toLocaleString();
		var userLogin = WCMAPI.userCode;
		
		//template envelope XML
		var _xml = null;
		$.ajax({
					url : '/Company/resources/js/xmls/ECMWFEngineService_simpleStartProcess.xml',
					async : false,
					type : "get",
					datatype : "xml",
					success : function(xml) {
						_xml = $(xml)
					}

				});
		
		//Alterar os valores recuperados na variavel _xml
		_xml.find("companyId").text(50);
		_xml.find("username").text("IntegradorSite");
		_xml.find("password").text("fluig@123");
		_xml.find("processId").text("Solicitacao_Site");
		_xml.find("comments").text('Processo inicializado atraves do Site');

		//descricao do chamado 
		
		_xml.find("[name='name']").text(name);
		_xml.find("[name='email']").text(email);
		_xml.find("[name='phone']").text(phone);
		_xml.find("[name='request']").text(cat);
		_xml.find("[name='message']").text(message);
		_xml.find("[name='date_request']").text(dt);
		_xml.find("[name='login']").text(userLogin);
		
		
		console.log(_xml[0]);
		
		
		//Usar o metodo WCMAPI.Create para chamar o webservice
		WCMAPI.Create({
			url : "/webdesk/ECMWorkflowEngineService?wsdl",
			contentType : "text/xml",
			dataType : "xml",
			data : _xml[0],
			success : function(data) {
				console.log(data)
				var processoCriado = $(data).find("iProcess").text();
				console.log('Processo :'+processoCriado);
				
				FLUIGC.toast({
					title:'Aviso',
					message:'Processo '+processoCriado+' criado com sucesso',
					type:'success'
				});
				
			}
		})
      
      //Fim abre processo no fluig
      
      
      $.ajax({
        url: "",
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message
        },
        cache: false,
        success: function() {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Sua mensagem foi enviada com sucesso ;). </strong>");
          $('#success > .alert-success')
            .append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        error: function() {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Desculpe " + firstName + ", parece que tivemos um problema com nosso servidor. Por favor, tente novamente :(!"));
          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
