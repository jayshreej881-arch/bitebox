function calculateItemTotal(price, quantity) {
    return price * quantity;
}
// let cartRows = document.querySelectorAll(
//     "#shopping-cart tbody tr"
// );
function calculateSubtotal() {
    let subtotal = 0;
    let cartRows = document.querySelectorAll("#shopping-cart tbody tr" );

    cartRows.forEach(function(row) {
        let priceText =  row.children[1].textContent;
        let price = parseFloat(priceText.replace("₹", "")  );
        let quantityText = row.querySelector( ".quantity-box span" ).textContent;
        let quantity = parseInt(quantityText);
        let itemTotal = calculateItemTotal(price,quantity);
        subtotal += itemTotal;
    });
    return subtotal;
}
function calculateDeliveryCharge(subtotal) {
    if (subtotal === 0) {
       return 0;
    }
    return 40;
}
function calculatePackagingCharge(subtotal) {
    if (subtotal === 0) {
        return 0;
    }
  
    return 20;
}
function calculateDiscount(subtotal) {
    if (subtotal > 500) {
        return subtotal * 0.10;
    }
    return 0;
}
function calculateTotal(subtotal,deliveryCharge,packagingCharge,discount) {
    return subtotal + deliveryCharge + packagingCharge - discount;
}


function updateOrderSummary() {

  let subtotalElement = document.getElementById("subtotal-amount");
    if (!subtotalElement) {
        return;
    }


    let subtotal = calculateSubtotal();
    let deliveryCharge = calculateDeliveryCharge(subtotal);
    let packagingCharge = calculatePackagingCharge(subtotal);
    let discount = calculateDiscount(subtotal);
    let totalAmount = calculateTotal(subtotal, deliveryCharge, packagingCharge, discount);


    document.getElementById("subtotal-amount").textContent = "₹" + subtotal.toFixed(2);
    document.getElementById("delivery-amount").textContent = "₹" + deliveryCharge.toFixed(2);
    document.getElementById("packaging-amount").textContent = "₹" + packagingCharge.toFixed(2);

    document.getElementById("discount-amount").textContent = "₹" + discount.toFixed(2);

    document.getElementById( "total-amount").textContent = "₹" + totalAmount.toFixed(2);

}

updateOrderSummary();

let cart =JSON.parse(
      
        localStorage.getItem("biteboxCart")
      
    ) || []; 
let menuContainer = document.getElementById("menu-items");
if (menuContainer) {
menuContainer.addEventListener("click", function(event) {
        let button = event.target.closest("button");
        if (!button) {
            return;
        }
        if ( button.textContent.includes("Add to Cart")) {
          
            let card = button.closest("article");
          
            addToCart(card);
        }
    }
);
}
function addToCart(card) {
    let name = card.querySelector("h3").textContent.trim();

    let priceText = card.querySelector(".price") .textContent;

    let price = parseFloat( priceText.replace("₹", ""));

    let image = card.querySelector("img").getAttribute("src");

    console.log("Name:", name);
    console.log("Price:", price);
    console.log("Image:", image);

let cartItem = {

    name: name,
    price: price,
    image: image,
    quantity: 1

};
let existingItem =
    cart.find(function(item) {
        return item.name === name;
    });
    if (existingItem) {
    existingItem.quantity++;
}
else {
    cart.push(cartItem);
}
localStorage.setItem("biteboxCart",JSON.stringify(cart));

console.log("Cart:", cart);

}

let cartBody =
    document.querySelector(
        "#shopping-cart tbody"
    );

function renderCart() {
    if (!cartBody) {
        console.log("carbody not found");
        
        return;
    }

   
    cartBody.innerHTML = "";

    if (cart.length === 0) {
      
    
        
        let row = document.createElement("tr");

        row.innerHTML = `
        <td colspan=5> 
        <div class="empty-cart">
            <h3> Your Cart is Empty</h3>
                    <p>
                        Add some delicious food
                        from our Menu!
                    </p>
            </div> 
            </td>
            `;

     console.log(row+"  this is row");
            
       

        cartBody.appendChild(row);
        return;
    }

    console.log();
    
    cart.forEach(function (item, index) {
        let itemTotal = item.price * item.quantity;
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        style="width: 90px; height: 62px; object-fit: cover; border-radius: 8px;"
                    >

                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                    </div>

                </div>

            </td>

            <td>
                ₹${item.price}
            </td>

    <td>

                <div class="quantity-box">

                    <button
                        class="decrease"
                        data-index="${index}">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        class="increase"
                        data-index="${index}">
                        +
                    </button>

                </div>

            </td>


            <td>
                ₹${itemTotal.toFixed(2)}
            </td>
            <td>

    <a href="#" class="remove-item" data-index="${index}">

    <img src="C:\bitebox\js\delete.png" alt="Delete" width="25">

    </a>

            </td>

    `;

    console.log(row);
    

        cartBody.appendChild(row);
        //    cartBody.document.querySelector("tbody").appendChild(row);

    });
updateOrderSummary();
}

function clearCart(){
    cart=[];
    localStorage.removeItem("biteboxCart");
    renderCart();
    updateOrderSummary();
}

let clearCartBtn=document.querySelector("#cart-actions button");
if(clearCartBtn){
    clearCartBtn.addEventListener("click", clearCart);
}


// ==========================search option===================================


let menuCards = document.querySelectorAll("#menu-items article");
let searchInput = document.getElementById("menu-search");
let searchButton = document.getElementById("search-button");

function searchMenu(searchText) {
    let searchValue = searchText.trim().toLowerCase();

    menuCards.forEach(function (card) {
        let foodName = card.querySelector("h3").textContent.trim().toLowerCase();

        if (foodName.includes(searchValue)) {
            card.style.display = "";
        }
        else {
            card.style.display = "none";
        }
    });

}

if (searchButton) {
    searchButton.addEventListener(
        "click",
        function () {
            searchMenu(
                searchInput.value
            );
        }
    );

}
 

let categoryCards = document.querySelectorAll("#categories article");

function filterMenu(category) {

    menuCards.forEach(function(card) {
        let cardCategory = card.dataset.category.toLowerCase();

        if (cardCategory === category) {
            card.style.display = "";
        }
        else {
            card.style.display = "none";
        }
    });

}



categoryCards.forEach(
    function(card) {

        card.addEventListener("click",function() {
                let category = card.querySelector("h3")
                        .textContent
                        .trim()
                        .toLowerCase();
                filterMenu(category);
            }
        );

    }
)
renderCart();
updateOrderSummary(); 

//----------------card clum//
let themeButton = document.getElementById("theme-toggle");

function toggleTheme() {
    document.body.classList.toggle("dark-theme");

    let themeIcon = themeButton.querySelector(".theme-icon");
    let themeText = themeButton.querySelector(".theme-text");

    if(document.body.classList.contains("dark-theme")) {
        themeIcon.textContent = "☾";
        themeText.textContent = "NIGHT MODE";
        localStorage.setItem("biteboxTheme", "dark");
    }
    else {
        themeIcon.textContent = "☀";
        themeText.textContent ="DAY MODE";
        localStorage.setItem("biteboxTheme","light");
    }
};

function loadTheme() {
    let savedTheme = localStorage.getItem("biteboxTheme");

    /* Disable animation while loading */
    document.body.classList.add("theme-loading");

    if(savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }
    else {
        document.body.classList.remove("dark-theme");
    }

    let themeIcon = themeButton.querySelector(".theme-icon");

    let themeText = themeButton.querySelector(".theme-text");

    if(savedTheme === "dark") {
        if(themeIcon) {
            themeIcon.textContent = "☾";
        }

        if(themeText) {
            themeText.textContent = "NIGHT MODE";
        }
    }
    else {
        if (themeIcon) {
            themeIcon.textContent = "☀";
        }


        if (themeText) {
            themeText.textContent = "DAY MODE";
        }
    }

    // allow animation again
    setTimeout(function () {
        document.body.classList.remove("theme-loading");
    }, 50)
};

if (themeButton) {
     themeButton.addEventListener("click",function () {
            toggleTheme();
        }
    );
};



function updateCartCount() {

    let cartCount = 0;

    cart.forEach(function (item) {
        cartCount += item.quantity;
    });

    let cartCountElement =
        document.getElementById("cart-count");

    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
};

function showToast(message, type) {
    let toast = document.createElement("div");
    toast.className = "toast " + type;
    toast.textContent = message;
        document.body.appendChild(toast);

    setTimeout(function () {
        toast.classList.add("show");
    }, 100);

    setTimeout(function () {
        toast.classList.remove("show");

        setTimeout(function () {
            toast.remove();
        }, 300);

    }, 3000);
};

let contactForm = document.querySelector(".right-column form");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            let name =
                contactForm.querySelector(
                    'input[name="Name"]'
                );

            let email =
                contactForm.querySelector(
                    'input[name="Email"]'
                );

            let phone =
                contactForm.querySelector(
                    'input[name="Phone Number"]'
                );

            let subject =
                contactForm.querySelector(
                    'input[name="Subject"]'
                );

            let message =
                contactForm.querySelector(
                    'textarea[name="Message"]'
                );


            if (!name.value.trim()) {

                showToast(
                    "⚠ Please enter your name.",
                    "error"
                );

                return;
            }


            if (!email.value.trim()) {

                showToast(
                    "⚠ Please enter your email address.",
                    "error"
                );

                return;
            }


            if (!email.validity.valid) {

                showToast(
                    "⚠ Please enter a valid email address.",
                    "error"
                );

                return;
            }


            let phonePattern = /^[6-9]\d{9}$/;


            if (!phone.value.trim()) {

                showToast(
                    "⚠ Please enter your phone number.",
                    "error"
                );

                return;
            }


            if (!phonePattern.test(phone.value.trim())) {

                showToast(
                    "⚠ Please enter a valid 10-digit phone number.",
                    "error"
                );

                return;
            }


            if (!subject.value.trim()) {

                showToast(
                    "⚠ Please enter a subject.",
                    "error"
                );

                return;
            }


            if (!message.value.trim()) {

                showToast(
                    "⚠ Please enter your message.",
                    "error"
                );

                return;
            }


            showToast(
                "✓ Message sent successfully!",
                "success"
            );


            contactForm.reset();

        }
    );
}



loadTheme();
renderCart();
updateCartCount();
updateOrderSummary();


const API_URL =
    "https://6ae4846528393034b08da79c.mockapi.io/menu";

const menu = document.getElementById("menu-modal");
const menuForm = document.getElementById("menu-form");
const addMenuBtn = document.getElementById("add-menu-btn");
const cancelMenuBtn = document.getElementById("cancel-menu-form");

// Open the form
function showform() {
    
        menu.classList.add("show");
    
}

// Close the form
function hideform() {
    
        menu.classList.remove("show");
    
}

if (addMenuBtn) {
    addMenuBtn.addEventListener("click", showform);
}

if (cancelMenuBtn) {
    cancelMenuBtn.addEventListener("click", function () {
        menuForm.reset();
        hideform();
    });
}

// Send menu item data to MockAPI
async function addmenu(event) {
    event.preventDefault();

    const menuItem = {
        name: document.getElementById("menu-name").value.trim(),
        price: Number(document.getElementById("menu-price").value),
        category: document.getElementById("menu-category").value,
        rating: Number(document.getElementById("menu-rating").value),
        reviews: Number(document.getElementById("menu-reviews").value),
        image: document.getElementById("menu-image").value.trim()
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(menuItem)
        });

        if (!response.ok) {
            throw new Error("Failed to add menu item");
        }

        const data = await response.json();
        console.log("Menu item added:", data);
        alert("Menu item added successfully!");
        menuForm.reset();
        hideform();
        await fetchMenuItems();

    } catch (error) {
        console.error("Error adding menu item:", error);
        alert("Error adding menu item. Check your API URL and console.");
    }
}

if (menuForm) {
    menuForm.addEventListener("submit", addmenu);
}

async function fetchMenuItems() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch menu items");
        }
        const menuItems = await response.json();
        console.log("Menu items fetched:", menuItems);
        displayMenuItems(menuItems);
    } catch (error) {
        console.error("Error fetching menu items:", error);
    }
}

function displayMenuItems(menuItems) {
    const menuContainer = document.getElementById("menu-items");

    if (!menuContainer) {
        console.error('Element with id "menu-items" not found.');
        return;
    }

    // Remove previously fetched API cards
    menuContainer.querySelectorAll(".api-menu-item").forEach(card => {
        card.remove();
    });

    menuItems.forEach(menuItem => {
        const card = document.createElement("article");
        card.classList.add("api-menu-item");

        card.dataset.category =
            String(menuItem.category || "").trim().toLowerCase();

        card.innerHTML = `
            <img src="${menuItem.image}" alt="${menuItem.name}">
            <h3>${menuItem.name}</h3>
            <p class="rating">
                ${menuItem.rating}
                <small>(${menuItem.reviews})</small>
            </p>
            <p class="price">₹${menuItem.price}</p>
             <div class="menu-actions">
          <button type="button" class="update-menu-btn">
            <img src="C:\bitebox\assests\images\update.png">
          </button>
          <button type="button" class="delete-menu-btn">
             <img src="assets/icons/delete.png">
          </button>
        </div>
            <button type="button">-
                <img src="assets/icons/cart-button.png"
                     alt=""
                     width="14"
                     height="14">
                Add to Cart
            </button>
        `;

        menuContainer.appendChild(card);
    });
}
fetchMenuItems();