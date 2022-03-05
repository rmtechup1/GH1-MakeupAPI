const baseUrl = "http://makeup-api.herokuapp.com/api/v1/products.json";


async function fetchAllRawData(baseUrl){
    try{
        const fetch_init = { method: 'GET' };
        const response = await fetch(baseUrl, fetch_init);
        console.log("fetchAllRawData response: ");
        console.log(response);
        return response
    }
    catch(error){
        console.log("fetchAllRawData error: ")
        console.log(error);
    }
}

async function convertAllRawDataToCardArray(baseUrl){
    const response = await fetchAllRawData(baseUrl);
    if(response.status === 200 && !response.redirected == true){
        let cardarrayDiv = document.createElement('div');
        cardarrayDiv.className = 'row';

        response.forEach(mkupItem => {        
            let imageDiv = document.createElement('div');
            //imageDiv.className = 'imageDiv';
            let imgElem = document.createElement('img');
            imgElem.src = mkupItem.image_link;
            imgElem.alt = mkupItem.brand + " " + mkupItem.name;
            imgElem.width = 500;
            imgElem.height = 500;
            imageDiv.appendChild(imgElem);

            let brandDiv = document.createElement('div');
            let brandTxt = document.createElement('h3');
            brandTxt.innerHTML = mkupItem.brand;
            brandDiv.appendChild(brandTxt);

            let productnameDiv = document.createElement('div');
            let productnameTxt = document.createElement('h3');
            productnameTxt.innerHTML = mkupItem.name;
            productnameDiv.appendChild(productnameTxt);

            let colorsDiv = document.createElement('div');
            let colorsCount = document.createElement('h3');
            colorsCount.innerHTML = mkupItem.product_colors.length;
            colorsDiv.appendChild(colorsCount);

            let priceDiv = document.createElement('div');
            let priceValue = document.createElement('h3');
            priceValue.innerHTML = `${mkupItem.price_sign}${mkupItem.price} (${mkupItem.currency})`;
            priceDiv.appendChild(priceValue);

            let detailsDiv = document.createElement('div'); 
            detailsDiv.appendChild(brandDiv);
            detailsDiv.appendChild(productnameDiv);
            detailsDiv.appendChild(colorsDiv);
            detailsDiv.appendChild(priceDiv);

            let cardDiv = document.createElement('div');
            cardDiv.appendChild(imageDiv);
            cardDiv.appendChild(detailsDiv);
            cardDiv.className = "col-sm-12 col-md-6 col-lg-4";
            
            cardarrayDiv.appendChild(cardDiv);
        });

        return cardarrayDiv;
    }
    else{
        console.log("convertAllRawDataToCardArray - something not ok")
        return null;
    }
}

async function displayHomePage(baseUrl){
    let containerDiv = document.createElement('div');
    containerDiv.className = 'container';
    containerDiv.id = 'displayRoot';

    search_dataList = document.createElement('datalist');
    const response = await fetchAllRawData(baseUrl);
    if(response.status === 200 && !response.redirected == true){
        
    }
    else{
        console.log("populating datalist failed - 1646520269")
    }

    let searchcolDiv = document.createElement('div');
    searchcolDiv.className = 'col';





    let searchrowDiv = document.createElement('div');
    searchrowDiv.className = 'row'
}