new Vue({
	el: '#app',
	created:function(){
		this.createArrayImg();
	},
	data: {
		imgData : [], resultados:[], resulSorteo: [], buscador: null, dateSi: null				
	},
	methods:{
		createArrayImg:function(){		
			this.imgData.push({ img: ' img/00.png', nro: '00' } )			
			for (var i = 0; i <= 36 ; i++) {
				if( i >= 1 && i <= 9){
					this.imgData.push({ img: ' img/0'+ i +'.png', nro: '0'+i } )	
				}else{
					this.imgData.push({ img: ' img/'+ i +'.png', nro : i } )	
				}						
			}
			
			// this.imgData[5]['img']			
			this.getSorteos(); 					
		},
		getSorteos(){
			axios.get('http://localhost:8000/api/v1/loteria/2').then( resp => {
				this.resultados = resp.data.resultados;
				this.dateSi = resp.data.date;
				console.log( this.resultados )
				this.filtroResultados(); // Filtramos los resultados 
			})					
		},
		buscar:function(){
			axios.get('http://localhost:8000/api/v1/loteria/2?date='+this.buscador).then( resp => {
				this.resultados = resp.data.resultados;
				this.dateSi = resp.data.date;
				$('#exampleModal').modal('hide');
				this.filtroResultados();
			})
		},
		filtroResultados:function(){
			var resulT = []
			this.resultados.forEach(function(e){
	
				if( e.nro >= 1 && e.nro <= 9){
					resulT.push({ img: ' img/0'+ e.nro +'.png', nro_sorteo: e.nro_sorteo, hora: e.hora } )	
				}else{
					resulT.push({ img: ' img/'+ e.nro +'.png', nro_sorteo: e.nro_sorteo, hora: e.hora } )	
				}																								
			})
			this.resulSorteo = resulT
		}				
	}
})