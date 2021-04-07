
function init() {
    renderTable();
}

function renderTable() {
    var table = document.querySelector('.books-container');
    var books = getBooksForDisplay();
    var crudHtmlBtns;

    var strHtmlHead = '<tr><th>id</th><th>Title</th><th>Price</th><th>Actions</th></tr>';
    var strHTMLs = books.map(function (book) {
        crudHtmlBtns = `<button onclick ="onRead('${book.id}')" class="btn btn-read">Read</button>
                        <button onclick ="onUpdate('${book.id}')" class="btn btn-update">Update</button>
                        <button onclick ="onRemove('${book.id}')" class="btn btn-remove ">Delete</button>`;
        return `  
        <tr><td> ${book.order}</td><td>${book.name}</td><td class="price">${book.price}</td><td>${crudHtmlBtns}</td></tr>`;
    });

    table.innerHTML = strHtmlHead + strHTMLs.join('');
}
function onChangeRate(val, bookId) {
    changeRate(val, bookId);
}

function renderModal(bookId) {
    var book = findBookByIdx(bookId);
    var img = getImgsForDisplay();
    var elModal = document.querySelector('.more-info')
    elModal.querySelector('h5').innerText = book.name;
    elModal.querySelector('h6').innerHTML = `<img src="${img[book.name]}" >`
    elModal.querySelector('.rate').innerHTML = `<input type="number" min="0" max="10" step="1" oninput="onChangeRate(this.value, '${bookId}')" value="${book.bookRate}"/>`
    elModal.querySelector('p').innerText = makeLorem();
    elModal.hidden = false;
}


function onRead(bookId) {
    renderModal(bookId);
}

function onCloseModal() {
    document.querySelector('.more-info').hidden = true
}

function onUpdate(bookId) {
    var price = prompt('Insert price please');
    updateBook(bookId, price)
    renderTable();
}

function onAddBook() {
    var name = prompt('Insert name please');
    var price = prompt('Insert price please');
    addBook(name, price);
    renderTable();
}

function onRemove(bookId) {
    removeBook(bookId);
    renderTable();
}
