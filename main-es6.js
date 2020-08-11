class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class UI {
    addProductToList({
        id,
        name,
        price
    }) {
        const li = document.createElement('li');
        li.innerHTML = `
            <button class="product-btn btn btn-light container-fluid">
                <div class="d-flex">
                    <a class="mr-auto product-item"><span >${name}</span> - $<span>${price}</span></a>
                    <i id="delete" class="fa fa-trash"></i>
                    <i id="edit" class="fa fa-edit"></i>
                    <input type="hidden" data-id=${id} />
                </div>
            </button>
        `;
        document.getElementById('product-list').appendChild(li);
        console.log(id);
    }
    clearField() {
        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
    }
    deleteProduct(target) {
        if (target.id === 'delete') {
            target.parentElement.parentElement.parentElement.remove();
        }
    }
    editProduct(target) {
        if (target.id === 'edit') {
            // Capture the values from target list
            const name = target.previousElementSibling.previousElementSibling.children[0].innerText;
            const price = target.previousElementSibling.previousElementSibling.children[1].innerText;
            // Display the target values onto the form
            document.getElementById('product-name').value = name;
            document.getElementById('product-price').value = price;

            // Remove current product from display
            target.parentElement.parentElement.parentElement.remove();
        }
    }
    showAlert(message, className) {
        const form = document.getElementById('form');
        const inputArea = document.getElementById('input-area')
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.textContent = message;
        form.insertBefore(div, inputArea);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 1000)
    }
    getId() {
        return document.querySelectorAll('li').length;
    }
}


// Event Listeners
document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    // Instantiate UI object
    const ui = new UI();

    // Initialize id
    const id = ui.getId();

    // Instantiate product object
    const product = new Product(id, productName, productPrice);

    // Validation input fields
    if (productName === '' || productPrice === '') {
        ui.showAlert('Please add a product with price', 'warning');
    } else {
        ui.showAlert('Your product has been added successfully!', 'success');
        ui.addProductToList(product);
        ui.clearField();
    }
})

// Event Delegation (delete/edit)
document.querySelector('#product-list').addEventListener('click', e => {
    // Instantiate UI object
    const ui = new UI();
    if (e.target.classList.contains('fa-trash')) {
        ui.showAlert('Your product has been deleted successfully!', 'info');
        ui.deleteProduct(e.target);
    } else {
        ui.editProduct(e.target);
    }
})