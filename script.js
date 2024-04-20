const productForm = document.getElementById('productForm');
    const productlist = document.getElementById('productlist');

    let products = JSON.parse(localStorage.getItem('products')) || [];

    function renderProducts(product) {
        const productDiv=document.createElement("div");
        console.log(product);
        productDiv.setAttribute("id","productDiv");
            productDiv.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>Rs.${product.price}</td>
                <td><img src="https://picsum.photos/200/300" alt="${product.name}" style="max-width: 100px;"></td>
                <td>
                    <button onclick="editProduct()">Edit</button>
                    <button onclick="deleteProduct(})">Delete</button>
                </td>
            `;
            productlist.appendChild(productDiv);
    
    }

    function addProduct(event) {
        event.preventDefault();
        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productPrice = document.getElementById('productPrice').value;
        const product = {
            name: productName,
            description: productDescription,
            price: productPrice,
            imageUrl: 'https://picsum.photos/200/300'
        };
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products.map(({ name, description, price }) => ({ name, description, price }))));
        renderProducts(product);
        productForm.reset();
    }

    function editProduct(index) {
        const row = productTable.rows[index];
        const product = products[index];
        row.innerHTML = `
            <td><input type="text" value="${product.name}" id="editName${index}"></td>
            <td><input type="text" value="${product.description}" id="editDescription${index}"></td>
            <td><input type="text" value="${product.price}" id="editPrice${index}"></td>
            <td><input type="text" value="${product.imageUrl}" id="editImageUrl${index}"></td>
            <td>
                <button onclick="saveEdit(${index})">Save</button>
            </td>
        `;
    }

    function saveEdit(index) {
        const newName = document.getElementById(`editName${index}`).value;
        const newDescription = document.getElementById(`editDescription${index}`).value;
        const newPrice = document.getElementById(`editPrice${index}`).value;
        const newImageUrl = document.getElementById(`editImageUrl${index}`).value;
        products[index] = {
            name: newName,
            description: newDescription,
            price: newPrice,
            imageUrl: newImageUrl
        };
        localStorage.setItem('products', JSON.stringify(products.map(({ name, description, price }) => ({ name, description, price }))));
        renderProducts();
    }

    function deleteProduct(index) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products.map(({ name, description, price }) => ({ name, description, price }))));
        renderProducts();
    }

    productForm.addEventListener('submit', addProduct);
    function addFromLocalStorage() {
    let products = JSON.parse(localStorage.getItem("products"));
    if (!products || products.length === 0) return;
    products.forEach((product) => {
    displayProducts(product);
    });
    }

