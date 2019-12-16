var app = new Vue({
  el: '#app',
  data: {
    products: [],
  },
  methods: {
    loadProducts() {
      axios
        .get('https://line-interview-api.herokuapp.com/products')
        .then(res => {
          this.products = res.data
        })
        .catch(err => console.log(err));
    },
    sendMessage(message) {
      if (!liff.isInClient()) {
          sendAlertIfNotInClient();
      } else {
          liff.sendMessages([{
              'type': 'text',
              'text': message
          }]).then(function() {
              window.alert('Message sent');
          }).catch(function(error) {
              window.alert('Error sending message: ' + error);
          });
      }
  }
  },
  mounted() {
    this.loadProducts();
  }
})
