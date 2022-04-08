const baseUrl = "http://makeup-api.herokuapp.com/api/v1/products.json";
const typesOfSearchParams = ['brand', 'product_type', 'product_tags']
const searchParamDatalist_innerHtml = {
    brand: `<option value="almay">
    <option value="alva">
    <option value="anna sui">
    <option value="annabelle">
    <option value="benefit">
    <option value="boosh">
    <option value="burt's bees">
    <option value="butter london">
    <option value="c'est moi">
    <option value="cargo cosmetics">
    <option value="china glaze">
    <option value="clinique">
    <option value="coastal classic creation">
    <option value="colourpop">
    <option value="covergirl">
    <option value="dalish">
    <option value="deciem">
    <option value="dior">
    <option value="dr. hauschka">
    <option value="e.l.f.">
    <option value="essie">
    <option value="fenty">
    <option value="glossier">
    <option value="green people">
    <option value="iman">
    <option value="l'oreal">
    <option value="lotus cosmetics usa">
    <option value="maia's mineral galaxy">
    <option value="marcelle">
    <option value="marienatie">
    <option value="maybelline">
    <option value="milani">
    <option value="mineral fusion">
    <option value="misa">
    <option value="mistura">
    <option value="moov">
    <option value="nudus">
    <option value="nyx">
    <option value="orly">
    <option value="pacifica">
    <option value="penny lane organics">
    <option value="physicians formula">
    <option value="piggy paint">
    <option value="pure anada">
    <option value="rejuva minerals">
    <option value="revlon">
    <option value="sally b's skin yummies">
    <option value="salon perfect">
    <option value="sante">
    <option value="sinful colours">
    <option value="smashbox">
    <option value="stila">
    <option value="suncoat">
    <option value="w3llpeople">
    <option value="wet n wild">
    <option value="zorah">
    <option value="zorah biocosmetiques">`,

    product_type: `<option value="Blush">
    <option value="Bronzer">
    <option value="Eyebrow">
    <option value="Eyeliner">
    <option value="Eyeshadow">
    <option value="Foundation">
    <option value="Lip liner">
    <option value="Lipstick">
    <option value="Mascara">
    <option value="Nail Polish">`,

    product_tags: `<option value="Canadian">
    <option value="CertClean">
    <option value="Chemical Free">
    <option value="Dairy Free">
    <option value="EWG Verified">
    <option value="EcoCert">
    <option value="Fair Trade">
    <option value="Gluten Free">
    <option value="Hypoallergenic">
    <option value="Natural">
    <option value="No Talc">
    <option value="Non-GMO">
    <option value="Organic">
    <option value="Peanut Free Product">
    <option value="Sugar Free">
    <option value="USDA Organic">
    <option value="Vegan">
    <option value="alcohol free">
    <option value="cruelty free">
    <option value="oil free">
    <option value="purpicks">
    <option value="silicone free">
    <option value="water free">`
};

async function getSearchResultsByParameter(searchParameter, searchString){
    let requestUrl = baseUrl;
    if(searchString != '*' && searchString.length != 0){
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
            resultDisplayDiv.appendChild(cardDiv);
        });
        document.getElementById('displayResultsDiv').append(resultDisplayDiv);
    }
    
}

function searchInputHandler(){
    console.log("Search initiated");
    let searchParamRadioGrp = document.getElementsByName('btnradio_srchParam');
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
            displayResults(displayResultsJson);
        });

}

document.getElementById('searchButton').addEventListener('click', searchInputHandler);

document.getElementById('searchField').addEventListener('keyup', function(event){
    if (event.key === "Enter") {
        console.log("Registered enter key press");
        //event.preventDefault();
        searchBtn.click();
    }
});

function srchRadioGrpDelegatedHandler(event){
    let target = event.target;
    const listIdentifier = 'list__' + target.id;

    searchField = document.getElementById('searchField');
    searchField.removeAttribute('list');
    searchField.setAttribute('list', listIdentifier);
    searchField.value = '';

    if(document.getElementById(listIdentifier) != null){
        document.getElementById(listIdentifier).remove(); //remove the stale datalist element if it already exists
    }

    tagDataList = document.createElement('datalist');
    tagDataList.id = listIdentifier;
    switch(target.id){
        case 'btnradio_brand':
            tagDataList.innerHTML = searchParamDatalist_innerHtml.brand;
            break;
        case 'btnradio_product_type':
            tagDataList.innerHTML = searchParamDatalist_innerHtml.product_type;
            break;
        case 'btnradio_product_tags':
            tagDataList.innerHTML = searchParamDatalist_innerHtml.product_tags;
            break;
        default:
            tagDataList.innerHTML = searchParamDatalist_innerHtml.brand;
            break;
    }
    searchField.parentElement.appendChild(tagDataList);
}

document.getElementById('btnRadioGrp_parentElem').addEventListener('click', srchRadioGrpDelegatedHandler);