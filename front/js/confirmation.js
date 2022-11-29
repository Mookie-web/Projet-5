const query = window.location.search;
const urlParams = new URLSearchParams(query);
const id = urlParams.get('orderId')

document.getElementById('orderId').innerHTML = id;

// const query = window.location;
// const url = new URL(query);
// const id = url.searchParams.get("id");
// const orderId = document.getElementById("orderId");
// orderId.innerHTML = id;
