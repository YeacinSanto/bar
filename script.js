const loadItems = () =>{
    
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
        .then(response => response.json())
        .then(data=>{
            defaultload(data.drinks);
    })
}

const defaultload = (items) =>{
    const itemContainer = document.getElementById("item-container");
    itemContainer.innerHTML ='';
    var count = 0;

    items.forEach(item=>{
        if(++count<13){
            itemContainer.innerHTML += `
            <div class="card shadow-lg rounded border-0" style="width: 18rem; transition: 0.3s">
                <img src="${item.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.strDrink}</h5>
                    <h6>Category: ${item.strCategory}</h6>
                    <p>Instruction: ${item.strInstructions.slice(0,20)}...</p>
                    <button class="btn btn-outline-secondary" onclick="singleItem('${item.idDrink}')">Details</button>
                    <button class="btn btn-outline-success" onclick="addCart('${item.strDrink}','${item.strDrinkThumb}')">Add to Cart</button>
                </div>
            </div>
        `;
        }
    });

};

const singleItem = (id) =>{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.json())
    .then(data =>{
        showSingle(data.drinks[0]);
        const modalElement = new bootstrap.Modal(document.getElementById('modal'));
        modalElement.show();
    });
};

const showSingle =(data)=>{
    const singleModal = document.getElementById("modal");
    singleModal.innerHTML = `
        
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">"${data.strDrink}"</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img src="${data.strDrinkThumb}" class="img-fluid w-50">
                <p>"${data.strInstructions}"</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-outline-success" onclick="addCart('${data.strDrink}','${data.strDrinkThumb}')">Add to Cart</button>
            </div>
        </div>
    </div>

    `
}

document.getElementById("search-button").onclick = () =>{
    let value = document.getElementById("text").value;
    loadSearch(value);
}

const loadSearch = (search) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
        .then(response => response.json())
        .then(data => {
            const itemContainer = document.getElementById("item-container");

            if (!data.drinks) {
                itemContainer.innerHTML = `<h4 class="text-danger">No results found for "${search}"</h4>`;
                return;
            }

            defaultload(data.drinks);
        });
};


let cartCount = 0;

const addCart = (name, photo) => {
    const container = document.getElementById("cart-item");
    const div = document.createElement("div");
    cartCount++;
        if(cartCount<8){
              div.innerHTML = `
            <div style="width: 50px;">${cartCount}</div>
            <div style="width: 100px;">
                <img src="${photo}" alt="${name}" class="img-fluid">
            </div>
            <div style="flex: 1;">${name.slice(0, 15)}</div>
            `;
        }
      

    container.appendChild(div);
};


loadItems();