//*****************Display confirmation *****************//
const query = window.location.search;
const urlParams = new URLSearchParams(query);
const id = urlParams.get('orderId')

document.getElementById('orderId').innerHTML = id;


