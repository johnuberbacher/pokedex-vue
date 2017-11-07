var dataURL = 'https://pokeapi.co/api/v2/pokemon/';

new Vue({
  el: '#app',
  data: {
    items: null,
	  title: "Vue Json Iteration",
    showModal: false,
    name: null,
    items: null,
    sprite: null,
    types: null,
    weight: null,
    abilities: null
  },
  created: function () {
    this.fetchData();
  },
  methods: {
    fetchData: function () {
  		var self = this;
  		$.get(dataURL, function( data ) {
  			self.items = data.results;
  		});
    },
    getDetails: function (unique) {
      var detailsURL = dataURL + unique;
      $.get(detailsURL, function( details ) {
        self.name = details.name;
        self.types = details.types;
        console.log(details.name);
        console.log(details.types);
      });
    }
  }
});