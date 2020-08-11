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
UI.prototype.clearField = function () {
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
}
UI.prototype.showAlert = function (message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.textContent = message;
    form.insertBefore(div, inputArea);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 1000)

}


// Selectors
const form = document.getElementById('form');

const ul = document.getElementById('product-list');
const inputArea = document.getElementById('input-area')




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
        ui.showAlert('Please add a product with price', 'warning');
    } else {
        ui.showAlert('Your product has been added successfully!', 'success');
        ui.addProductToList(product);
        ui.clearField();
    }
})