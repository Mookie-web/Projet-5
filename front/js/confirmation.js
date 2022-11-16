const query = window.location.search;
const urlParams = new URLSearchParams(query);
const orderId = urlParams.get('orderId')

document.getElementById('orderId').innerHTML = orderId;
