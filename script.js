const baseUrl = "http://makeup-api.herokuapp.com/api/v1/products.json";
const typesOfSearchParams = ['brand', 'product_type', 'product_tags']


async function getSearchResultsByParameter(searchParameter, searchString){
    let requestUrl = baseUrl;
    if(searchString != '*'){
        switch (searchParameter){
            case typesOfSearchParams[0]:
                requestUrl += ('?' + typesOfSearchParams[0] + '=' + searchString);
                break;
            case typesOfSearchParams[1]:
                requestUrl += ('?' + typesOfSearchParams[1] + '=' + searchString);
                break;
            case typesOfSearchParams[2]:
                requestUrl += ('?' + typesOfSearchParams[2] + '=' + searchString);
                break;
            default:
                requestUrl += ('?' + typesOfSearchParams[0] + '=' + searchString);
                break;
        }
    }
    try{
        console.log("Hitting the URL: " + requestUrl);
        const response = await fetch(requestUrl, { method: 'GET', mode: "cors"});
        console.log(response);
        let respJson = await response.json();
        console.log(respJson);
        return respJson;
    }
    catch(error){
        console.log("error: " + error);
        return null;
    }
}

function displayResults(responseJson){
    if(responseJson.length === 0){
        alert("No matching results found, please try with a different input!");
    }
    else{
        if(document.getElementById('displayArea') != null){
            document.getElementById('displayArea').remove();
        }
        
        let resultDisplayDiv = document.createElement('div');
        resultDisplayDiv.className = 'row';
        resultDisplayDiv.id = 'displayArea'
        console.log(responseJson.length);
        responseJson.forEach((mkupItem) => {        
            let cardDiv = document.createElement('div');
            cardDiv.className = 'cardDiv col-sm-12 col-md-6 col-lg-4';
            let priceDivText = '';
            if(mkupItem.price_sign == null){
                if(mkupItem.currency == null){
                    priceDivText = mkupItem.price;
                }
                else{
                    priceDivText = mkupItem.price + ' (' + mkupItem.currency + ')';
                }
            }
            else{
                if(mkupItem.currency == null){
                    priceDivText = mkupItem.price_sign + mkupItem.price;
                }
                else{
                    priceDivText = mkupItem.price_sign + mkupItem.price + ' (' + mkupItem.currency + ')';
                }
            }
            cardDiv.innerHTML = 
                `<div class = "imageDiv">
                    <img src=${mkupItem.image_link} alt="Image Alt Text: ${mkupItem.brand + " " + mkupItem.name}" width="250" height="250">
                </div>
                <div class="detailsDiv">
                    <div class="brandDiv row">
                        <h6 class="col-4">Brand Name: </h6>
                        <h6 class="col-8">${mkupItem.brand}</h6>
                    </div>
                    <div class="itemDiv row">
                        <h6 class="col-4">Item Name: </h6>
                        <h6 class="col-8">${mkupItem.name}</h6>
                    </div>
                    <div class="colorCountDiv row">
                        <h6 class="col-4">Shades available: </h6>
                        <h6 class="col-8">${mkupItem.product_colors.length}</h6>
                    </div>
                    <div class="priceDiv row">
                        <h6 class="col-4">Price: </h6>
                        <h6 class="col-8">${priceDivText}</h6>
                    </div>
                </div>`;
                //console.log(priceDivText);
            resultDisplayDiv.appendChild(cardDiv);
        });
        document.getElementById('displayResultsDiv').append(resultDisplayDiv);
    }
    
}

function searchInputHandler(){
    console.log("Search initiated");
    let searchParamRadioGrp = document.getElementById('btnGrpRadio_searchParameters');
    let selectedOption = 0;
    for(i=0; i< searchParamRadioGrp.length; i++){
        if(searchParamRadioGrp[i].checked){
            selectedOption = i;
            break;
        }
    }
    const searchString = document.getElementById('searchField').value;
    console.log("Selected Search Param: " + typesOfSearchParams[selectedOption]);
    
    getSearchResultsByParameter(typesOfSearchParams[selectedOption], searchString)
        .then((displayResultsJson) => {
            console.log('displayResultsJson');
            console.log(displayResultsJson);
            displayResults(displayResultsJson);
        });

}

searchBtn = document.getElementById('searchButton');
searchBtn.addEventListener('click', searchInputHandler);
document.getElementById('searchField').addEventListener('keyup', function(event){
    if (event.key === "Enter") {
        console.log("Registered enter key press");
        //event.preventDefault();
        searchBtn.click();
    }
});
