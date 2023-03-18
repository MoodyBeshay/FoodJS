////Hello JS again in 2023 i feel i love JS:)


//===============JS EXAM START=====================//
const areaConatiner = document.querySelector('.areaConatiner')
console.log(areaConatiner);

// getApi 
let meals = []
async function API() {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s')
    const response = await request.json()
    const allResults = response.meals
    display(allResults)
    showArea(allResults)

}
API()

// get details ================ by ID============== 
async function getDetails(id) {
    let details = ``;
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const response = await request.json()
    console.log(response.meals[0]);
    const oneMeal = response.meals[0]
    details += `
    <div class="row py-5 g-4 " id="rowData">
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${oneMeal.strMealThumb}" alt="">
                    <h2>Burek</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${oneMeal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${oneMeal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${oneMeal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-info m-2 p-1">${oneMeal.strIngredient1} </li><li class="alert alert-info m-2 p-1">${oneMeal.strIngredient2}</li><li class="alert alert-info m-2 p-1">${oneMeal.strIngredient3}</li><li class="alert alert-info m-2 p-1">${oneMeal.strIngredient4}</li><li class="alert alert-info m-2 p-1">${oneMeal.strIngredient5}</li><li class="alert alert-info m-2 p-1">${oneMeal.strIngredient6}</li>
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    
        <li class="alert alert-danger m-2 p-1">${oneMeal.strTags}</li>
                </ul>

                <a target="_blank" href="${oneMeal.strSource}" class="btn btn-primary">Source</a>
                <a target="_blank" href="${oneMeal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div></div></div>`
    document.querySelector('.MainConatiner').innerHTML = details;
}

// ====================== display ======================= 
async function display(api) {
    console.log(`Display Api`);
    let mmls = await api; // recive any apiiiii
    console.log(mmls);
    let box = ``;
    mmls.forEach(elm => {
        box += `
        <div class="col-md-3 mt-3 p-2">
        <div id="${elm.idMeal}" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${elm.strMealThumb}" alt=""
                srcset="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${elm.strMeal}</h3>
            </div>
        </div>
    </div>
        `
    });
    document.querySelector('.MainConatiner').innerHTML = box;
    // Add click event listener to each meal // i need only the id to send ot to display
    document.querySelectorAll('.meal').forEach(meal => {
        meal.addEventListener('click', () => {
            getDetails(meal.getAttribute("id"))

        });
    });
}
/// serachhhhhhh
const searchContainer = document.querySelector('#searchContainer')
const searchTab = document.querySelector('.search')
const mainConatiner = document.querySelector('.MainConatiner')
const catConatiner = document.querySelector('.CatConatiner')

//search tab
searchTab.addEventListener('click', () => {
    searchContainer.classList.remove('d-none')
    mainConatiner.classList.add('d-none')
    mainConatiner.classList.add('pt-5')
    catConatiner.classList.add('d-none')
    areaConatiner.classList.add('d-none')
    conactContainer.classList.add('d-none')
})

const inputs = document.querySelectorAll('input')

//get meals by name
async function getMealByName(Mealname) {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Mealname}`)
    const response = await request.json()
    const allNames = response.meals
    display(allNames)
}
// get input value and send it to display
inputs[0].addEventListener('keypress', function () {
    console.log(this.value);
    getMealByName(this.value)
    mainConatiner.classList.remove('d-none')
})

//get meals by first 
async function getMealByFirst(MealFirst) {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${MealFirst}`)
    const response = await request.json()
    const allNames = response.meals
    display(allNames)
}
// get input value and send it to display
inputs[1].addEventListener('keyup', function () {
    console.log(this.value);
    getMealByFirst(this.value)
    mainConatiner.classList.remove('d-none')
})

//categories
const categoriesTap = document.querySelector('.Categories')
categoriesTap.addEventListener('click', () => {
    searchContainer.classList.add('d-none')
    mainConatiner.classList.add('d-none')
    ingredConatiner.classList.add('d-none')
    conactContainer.classList.add('d-none')
    catConatiner.classList.remove('d-none')
    areaConatiner.classList.add('d-none')
    getCategories()
})


// getInnercategory 
async function getInnercategory(catName) {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`)
    const response = await request.json()
    const result = response.meals
    display(result)
}
// show Categories
async function getCategories() {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    const response = await request.json()
    const results = response.categories
    let box = ``;
    results.forEach((elm) => {
        box += `
        <div class="col-md-3 mt-3 p-2">
        <div id="${elm.idCategory}" name="${elm.strCategory}" class="meal mainCategory position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${elm.strCategoryThumb}" alt=""
                srcset="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${elm.strCategory}</h3>
            </div>
        </div>
    </div>`

    })
    document.querySelector('.CatConatiner').innerHTML = box;
    // loop tp get element cat id 
    document.querySelectorAll('.mainCategory').forEach(cat => {
        cat.addEventListener('click', () => {
            getInnercategory(cat.getAttribute('name'))
            mainConatiner.classList.remove('d-none')
            catConatiner.classList.add('d-none')
            areaConatiner.classList.add('d-none')
        });
    });
}

//=============================Area==========================\\ 
const areaTap = document.querySelector('.Area')
areaTap.addEventListener('click', () => {
    searchContainer.classList.add('d-none')
    mainConatiner.classList.add('d-none')
    catConatiner.classList.add('d-none')
    ingredConatiner.classList.add('d-none')
    conactContainer.classList.add('d-none')
    areaConatiner.classList.remove('d-none')


})
// get inner area
async function getInnerArea(areaName) {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
    const response = await request.json()
    const result = response.meals
    display(result)
}
//get area from api  and show them 
async function showArea(areaApi) {
    const results = await areaApi
    let box = ``;
    results.forEach((elm) => {
        box += `
        <div  name="${elm.strArea}" class="area col-md-3 mt-3  d-flex align-items-center p-2 ">
        <i class="fa-solid icon fa-house-laptop fa-4x">  <h6>${elm.strArea}</h6></i>
        </div>
    </div>`

    })
    document.querySelector('.areaConatiner').innerHTML = box;
    // loop tp get element area name  
    document.querySelectorAll('.area').forEach(area => {
        area.addEventListener('click', () => {
            getInnerArea(area.getAttribute('name'))
            mainConatiner.classList.remove('d-none')
            areaConatiner.classList.add('d-none')
        });
    });
}

///============= ingrediant ===============//
// ingretiant tap 

const ingredients = document.querySelector('.Ingredients')
const ingredConatiner = document.querySelector('.ingredConatiner')

ingredients.addEventListener('click', () => {
    getIngreList()
    searchContainer.classList.add('d-none')
    mainConatiner.classList.add('d-none')
    catConatiner.classList.add('d-none')
    areaConatiner.classList.add('d-none')
    conactContainer.classList.add('d-none')
    ingredConatiner.classList.remove('d-none')
})

async function getIngredientsMeals(mainIngre) {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngre}`)
    const response = await request.json()
    const result = response.meals
    display(result)
}

async function getIngreList() {
    const requet = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    const response = await requet.json();
    const result = response.meals
    let box = ``;
    result.forEach((elm) => {
        box += `
        <div class="col-md-3">
        <div onclick="getIngredientsMeals('${elm.strIngredient}')" class=" rounded-2 text-center cursor-pointer">
            <i class="ingClick fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${elm.strIngredient}</h3>
            <p class="text-limit">${elm.strDescription}</p>
            <button class="btn btn-success read-more-btn" onclick="toggleText(this)">Read More</button>
        </div> 
    </div>`

    })
    document.querySelector('.ingredConatiner').innerHTML = box;

    document.querySelectorAll('.ingClick').forEach((elm) => {
        elm.addEventListener('click', () => {
            mainConatiner.classList.remove('d-none')
            ingredConatiner.classList.add('d-none')
        })
    })
}

//// read more 
function toggleText(btn) {
    let p = btn.previousElementSibling;
    if (p.classList.contains("text-limit")) {
        p.classList.remove("text-limit");
        btn.innerHTML = "Read Less";
    } else {
        p.classList.add("text-limit");
        btn.innerHTML = "Read More";
    }
}


/// =========contact us ===============//
const contactTab = document.querySelector('.Contact')
const conactContainer = document.querySelector('.contactContainer')
console.log(conactContainer);

//tab 
contactTab.addEventListener('click', () => {
    searchContainer.classList.add('d-none')
    mainConatiner.classList.add('d-none')
    catConatiner.classList.add('d-none')
    conactContainer.classList.remove('d-none')
    areaConatiner.classList.add('d-none')
    ingredConatiner.classList.add('d-none')
})

const nameRegex = /^[a-zA-Z ]*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^01\d{9}$/;
const ageRegex = /^(1[8-9]|[2-9]\d)$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Get the input fields and submit button
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const ageInput = document.getElementById("ageInput");
const passwordInput = document.getElementById("passwordInput");
const repasswordInput = document.getElementById("repasswordInput");
const submitBtn = document.getElementById("submitBtn");
// Function to validate inputs
function inputsValidation() {
    if (nameRegex.test(nameInput.value) &&
        emailRegex.test(emailInput.value) &&
        phoneRegex.test(phoneInput.value) &&
        ageRegex.test(ageInput.value) &&
        passwordRegex.test(passwordInput.value) &&
        passwordInput.value === repasswordInput.value) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }

    if (!nameRegex.test(nameInput.value)) {
        document.getElementById("nameAlert").classList.remove("d-none");
    } else {
        document.getElementById("nameAlert").classList.add("d-none");
    }

    if (!emailRegex.test(emailInput.value)) {
        document.getElementById("emailAlert").classList.remove("d-none");
    } else {
        document.getElementById("emailAlert").classList.add("d-none");
    }

    if (!phoneRegex.test(phoneInput.value)) {
        document.getElementById("phoneAlert").classList.remove("d-none");
    } else {
        document.getElementById("phoneAlert").classList.add("d-none");
    }

    if (!ageRegex.test(ageInput.value)) {
        document.getElementById("ageAlert").classList.remove("d-none");
    } else {
        document.getElementById("ageAlert").classList.add("d-none");
    }

    if (!passwordRegex.test(passwordInput.value)) {
        document.getElementById("passwordAlert").classList.remove("d-none");
    } else {
        document.getElementById("passwordAlert").classList.add("d-none");
    }

    if (passwordInput.value !== repasswordInput.value) {
        document.getElementById("repasswordAlert").classList.remove("d-none");
    } else {
        document.getElementById("repasswordAlert").classList.add("d-none");
    }
}

nameInput.addEventListener("keyup", inputsValidation);
emailInput.addEventListener("keyup", inputsValidation);
phoneInput.addEventListener("keyup", inputsValidation);
ageInput.addEventListener("keyup", inputsValidation);
passwordInput.addEventListener("keyup", inputsValidation);
repasswordInput.addEventListener("keyup", inputsValidation);

submitBtn.addEventListener("click", function (event) {
    if (nameRegex.test(nameInput.value) &&
        emailRegex.test(emailInput.value) &&
        phoneRegex.test(phoneInput.value) &&
        ageRegex.test(ageInput.value) &&
        passwordRegex.test(passwordInput.value) &&
        passwordInput.value === repasswordInput.value) {
        submitBtn.disabled = true;

    } else {
        event.preventDefault();
    }
});

// =============JS EXAM END =====================//
