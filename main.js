// Functions ===============================
// Create Product constructor
function Product(name, price) {
    this.name = name;
    this.price = price;
}

// UI constructor
function UI() {}
UI.prototype.addProductToList = function ({
    name,
    price
}) {
    const li = document.createElement('li');
    li.innerHTML = `
        <li>
            <button class="product-btn btn btn-light container-fluid">
                <div class="d-flex">
                <a class="mr-auto product-item">${name}- $${price}</a>
                <i class="fa fa-trash"></i>
                <i class="fa fa-edit"></i>
                </div>
            </button>
        </li>
    `;
    console.log(name, price)
    ul.appendChild(li);
}



// Selectors
const form = document.getElementById('form');

const ul = document.getElementById('product-list');





// Event Listeners
form.addEventListener('submit', e => {
    e.preventDefault();
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    // Instantiate product object
    const product = new Product(productName, productPrice);
    // Instantiate UI object
    const ui = new UI();
    // Validation input fields
    if (productName === '' || productPrice === '') {
        console.log(productName, productPrice)
    } else {
        ui.addProductToList(product);

    }
})