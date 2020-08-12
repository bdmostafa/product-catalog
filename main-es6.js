class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class LocalStorage {
    static addProductToLocal(product) {
        let products;
        // When first product is added or if there is no product key in local storage, assign empty array to products
        if (localStorage.getItem('products') === null) {
            products = [];
        } else {
            // Get the existing products to the array
            products = JSON.parse(localStorage.getItem('products'));
        }
        // Adding new product
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    }
    static getProductsFromLocal() {
        let products;
        if (localStorage.getItem('products') === null) {
            products = [];
        } else {
            products = JSON.parse(localStorage.getItem('products'));
        }
        return products;
    }
    static displayProductsFromLocal() {
        const products = LocalStorage.getProductsFromLocal();
        products.forEach(product => {
            const ui = new UI();
            ui.addProductToList(product);
        })
    }
    static removeProductFromLocal(id) {
        const products = LocalStorage.getProductsFromLocal();
        products.forEach((product, index) => {
            if (product.id === id) {
                products.splice(index, 1);
            }
        })
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// Trigger after DOMLoaded
window.addEventListener('DOMContentLoaded', LocalStorage.displayProductsFromLocal);

class UI {
    addProductToList({
        // Object destructuring from product object
        id,
        name,
        price
    }) {
        const li = document.createElement('li');
        li.classList.add('collection');
        // Creating HTML and hidden input element to track id (special identification)
        li.innerHTML = `
            <button class="product-btn btn btn-light container-fluid">
                <div class="d-flex collection-item">
                    <a class="mr-auto"><span >${name}</span> - $<span>${price}</span></a>
                    <input type="hidden" data-id=${id} />
                    <i id="delete" class="fa fa-trash"></i>
                    <i id="edit" class="fa fa-edit"></i>
                </div>
            </button>
        `;
        // Append to the ul
        document.getElementById('product-list').appendChild(li);
    }
    clearField() {
        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
    }
    deleteProduct(target) {
        if (target.id === 'delete') {
            // Getting id from target hidden input
            const id = target.previousElementSibling.dataset.id;
            // Converting string 'id' into number for future comparing
            //  Removing products from local storage
            LocalStorage.removeProductFromLocal(parseInt(id));
            // Removing li from UI
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
        // Length is the id when new product is added because it starts from 1 where array starts from 0
        return document.querySelectorAll('li').length;
    }
    filterProduct(e) {
        const searchText = e.target.value.toLowerCase();
        let itemLength = 0;
        document.querySelectorAll('.collection .collection-item').forEach(item => {
            // console.log(item)
            const productName = item.firstElementChild.textContent.toLowerCase();
            // When keyup event is not matched, indexOf value is always -1
            if (productName.indexOf(searchText) === -1) {
                item.parentElement.parentElement.style.display = 'none';
            } else {
                item.parentElement.parentElement.style.display = 'block';
                ++itemLength;
            }
        });
        itemLength > 0 ? null : showAlert('Oops! No item found', 'danger');
    };
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
        LocalStorage.addProductToLocal(product);
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

document.querySelector('#search-btn').addEventListener('keyup', e => {
    const ui = new UI();
    ui.filterProduct(e);
});