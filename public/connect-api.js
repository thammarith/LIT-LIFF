const apiUrl = 'https://line-interview-api.herokuapp.com';

let products = [];
let waitingOrders = [];

loadProducts();
keepCheckingForServed();

function loadProducts() {
  axios
    .get(`${apiUrl}/products`)
    .then(res => (products = res.data))
    .then(updateProductList)
    .catch(err => console.log(err))
    .finally(() => setTimeout(loadProducts, 10000));
}

function updateProductList() {
  const productContainer = document.getElementById('product-container');
  for (const product of products) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.style.backgroundImage = `url(${product.prd_image})`;

    const productName = document.createElement('h2');
    productName.classList.add('product-card-prd-name');
    productName.innerHTML = product.prd_name;

    const orderButton = document.createElement('h3');
    orderButton.classList.add('product-card-button');
    orderButton.innerHTML = 'Select >';
    orderButton.addEventListener('click', () => {
      order(product._id);
    });

    card.appendChild(productName);
    card.appendChild(orderButton);

    productContainer.appendChild(card);
  }
}

function order(prd_id) {
  axios
    .post(`${apiUrl}/orders/${prd_id}`)
    .then(res => addToWaiting(res.data._id))
    .then(() =>         window.alert('Order was made')
    )
    .catch(err => window.alert(`There was a problem sending your order (${JSON.stringify(err)})`));
}

function addToWaiting(prd_id) {
  waitingOrders.push(prd_id);
}

function keepCheckingForServed() {
  let orders = [];
  axios
    .get(`${apiUrl}/orders`)
    .then(res => (orders = res.data))
    .then(() => {
      const servedOrders = orders.filter(
        o => o.ord_served && waitingOrders.includes(o._id)
      );
      for (const servedOrder of servedOrders) {
        notifyServedOrder(servedOrder);
      }
    })
    .catch(err => console.err(err))
    .finally(() => setTimeout(keepCheckingForServed, 3000));
}

function notifyServedOrder(order) {
  waitingOrders = waitingOrders.filter(o => o !== order._id);
  if (!liff.isInClient()) {
    sendAlertIfNotInClient();
  } else {
    const product = products.find(p => p._id === order.prd_id);
    liff
      .sendMessages([
        {
          type: 'text',
          text: `Order for "${product.prd_name}" was served at ${order.ord_served_at}`,
        },
      ])
      .then(function() {
        window.alert('Order served! Check details in your chat');
      })
      .catch(function(error) {
        window.alert('Error sending message: ' + error);
      });
  }
}
