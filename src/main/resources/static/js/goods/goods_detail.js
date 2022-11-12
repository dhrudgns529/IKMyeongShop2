const orderbtn = document.querySelector(".btn_add_order");

orderbtn.onclick = () => {
    location.href = "/checkout"
}
    


class ProductApi {
    static #instance = null;
    static getInstace() {
        if(this.#instance == null) {
            this.#instance = new ProductApi();
        }
        return this.#instance;
    }

    getProductData() {
        let responseData = null;
        const url = location.href;
        const pdtId = url.substring(url.lastIndexOf("/") + 1);

        $.ajax({
            async: false,
            type: "get",
            url: "/api/product/" + pdtId,
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData;
    }

}

class ProductDetail {

    constructor() {
        const responseData = ProductApi.getInstace().getProductData();
        this.loadProductImgs(responseData);
        this.loadProductDetail(responseData);
        this.loadProductDesigns(responseData);
    }

    loadProductImgs(responseData) {
        const productImages = document.querySelector(".item_photo_view");
        productImages.innerHTML =``;

        responseData.pdtImgs.forEach(img => {
            productImages.innerHTML = `
            <div class="item_photo">
                <img src="/static/upload/product/${img}" alt="">
            </div>
            `;
        })
    }
    //upload/product/${img}

    loadProductDetail(responseData) {
        document.querySelector(".goods-title").textContent = responseData.pdtName;
        document.querySelector(".goods-price").textContent = responseData.pdtPrice + "원";
        document.querySelector(".goods-code").textContent = responseData.pdtId;
    }


    loadProductDesigns(responseData) {
        const productDesigns = document.querySelector(".option_bar");
        const productStock = document.querySelector(".product-stock");
        productDesigns.innerHTML = ``;
        
        // for(let i = 0; i < pdtDesign.length; i++) {
        //     document.querySelector(".product-stock") += value.pdtStock[i];
        //     console.log(productStock);
        // }
        let sumStock = 0;
        responseData.pdtDesign.forEach(value => {
            sumStock += value.pdtStock;
            productDesigns.innerHTML += `
            <option value="${value.pdtDtlId}">${value.pdtDesign} : ${value.pdtStock} 개 </option>
            `;
        })
        productStock.textContent = sumStock;
        console.log()
    }


}

window.onload = () => {
    console.log(ProductApi.getInstace().getProductData());
    new ProductDetail();
}