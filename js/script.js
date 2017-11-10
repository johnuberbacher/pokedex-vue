var dataURL = 'https://pokeapi.co/api/v2/pokemon/';
const Foo = { 
	props:  { items : {type: String, required: true} }, 
	template: '<div v-for="(item, i) in this.items" class="card"><div class="post">Name: {{ this.item.name }}</div><router-link to="/details/{{ vm.item.types }}">Click</router-link></div>'
}
const Bar = { 
	template: '<div>bar</div>' 
}
const Details = { 
	props:  { 
		itemName : {
			type: String, 
			required: true
		} 
	},
	template: '<div>details: {{this.itemName }}{{ self.types }} </div>'
}

var vm = new Vue({
  el: '#app',
  router: new VueRouter({
    routes: [
      { 
        path: '/foo', 
        props: true,
        component: Foo 
	  },
      { 
        path: '/bar', 
        component: Bar 
      },
      { 
		name: 'Details',
        path: '/details/:itemName', 
        props: true,
        component: Details 
      }
    ]
  }),
  data: {
    loading: null,
    items: null,
    showModal: false,
    name: null,
    sprite: null,
    types: null,
    weight: null,
    abilities: null
  },
  created: function () {
    this.loading = true;
    this.fetchData();
  },
  watch: function () {
	this.fetchData();
  },
  methods: {
    fetchData: function () {
  		var self = this;
  		$.get(dataURL + '?limit=151&offset=0', function( data ) {
  			self.items = data.results;
			self.loading = false;
  		});
    },
    getDetails: function (unique,event) {
	  var self = this;
	  self.loading = true;
      var detailsURL = dataURL + unique.name;
      $.get(detailsURL, function( details ) {
		self.name = details.name;
        self.types = details.types;
		console.log(details.name);
		console.log(details.types);
		self.loading = false;
      });
    }
  }
});