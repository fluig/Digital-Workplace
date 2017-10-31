var graphic = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {
        
    	// consulta um dataset customizado
    	var ds = DatasetFactory.getDataset("ds_indicadores",null,null,null);

        var sugestao = 0;
        var reclamacao = 0;
        var orcamento = 0;
     // popula o array 
        for (x = 0; x < ds.values.length; x++){
        	
        	if (ds.values[x]["Codigo"] == 1){
        		reclamacao = reclamacao + 1;
        	}else if (ds.values[x]["Codigo"] == 2 ){
        		sugestao = sugestao + 1;
        	}else if (ds.values[x]["Codigo"] == 3){
        		orcamento = orcamento + 1;
        	}
        	
        	var array_vazio = [sugestao,reclamacao,orcamento];
        	
        }
        
        var data = {
        	    labels: ["Sugestões", "Reclamações", "Orçamento"],
        	    datasets: [
        	        {
        	            label: "My First dataset",
        	            fillColor: "rgba(220,220,220,0.2)",
        	            strokeColor: "rgba(220,220,220,1)",
        	            pointColor: "rgba(220,220,220,1)",
        	            pointStrokeColor: "#fff",
        	            pointHighlightFill: "#fff",
        	            pointHighlightStroke: "rgba(220,220,220,1)",
        	            data: array_vazio
        	        }
        	       
        	    ]
        	};
    	
				        var chart = FLUIGC.chart('#grafico_1', {
				            id: 'teste',
				            width: '700',
				            height: '400',
				            /* See the list of options */
				        });
				        // call the line function
				        var barChart = chart.bar(data, "");
    	  
				        
			$("#sugestao").html(sugestao); 
			$("#reclamacao").html(reclamacao); 
			$("#orcamento").html(orcamento); 
			$("#total").html(sugestao + orcamento + reclamacao);

			
			
			
			graphic2();
			
    //	var AtualizaIndicadores = FLUIGC.periodicalExecutor(function() {
    //}, 15); 
	//AtualizaIndicadores.start();
			
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },
 
    executeAction: function(htmlElement, event) {
    }

});

