class GoodsApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new GoodsApi();
        }
        return this.#instance;
    }

    getGoods(page, limitCount) {
        let responseData = null;

        const url = location.href;
        const category = url.substring(url.lastIndexOf("/") + 1);

        $.ajax({
            async: false,
            type: "get",
            url: "/api/goods/" + category,
            data: {
                "page": page,
                "limitCount": limitCount
            },
            dataType: "json",
            success: (response) => {
                responseData = response.data;
                console.log(responseData);
            },
            error: (error) => {
                console.log(error);
            }
        });
        console.log(limitCount);
        return responseData;
    }
}

class PageNumber {
    #page = 0;
    #maxPageNumber = 0;
    #pageNumberList = null;
    #totalCount = 0;
    #limitCount = 0;
    constructor(page, totalCount, limitCount) {
        this.#limitCount = limitCount
        this.#page = page;
        this.#maxPageNumber = totalCount % GoodsService.getInstance().goodsEntity.limitCount == 0 ? Math.floor(totalCount / GoodsService.getInstance().goodsEntity.limitCount) : Math.floor(totalCount / GoodsService.getInstance().goodsEntity.limitCount) + 1;
        this.#pageNumberList = document.querySelector(".page-number-list");
        this.#pageNumberList.innerHTML = "";
        this.#totalCount = totalCount;
        this.loadPageNumber();
    }

    loadPageNumber() {
        this.createPreButton();
        this.createNumberButtons();
        this.createNextButton();
        this.addPageButtonEvent();
        this.getPickListNum();
    }

    createPreButton() {
        if(this.#page != 1) {
            this.#pageNumberList.innerHTML += `
                <a href="javascript:void(0)"><li>&#60;</li></a>
            `;
        }
    }

    
    createNumberButtons() {
        const startIndex = this.#page % 5== 0 ? this.#page - 4 : this.#page - (this.#page % 5) + 1;
        const endIndex = startIndex + 4 <= this.#maxPageNumber ? startIndex + 4 : this.#maxPageNumber;

        for(let i = startIndex; i <= endIndex; i++) {
            this.#pageNumberList.innerHTML += `
                <a href="javascript:void(0)"><li>${i}</li></a>
            `;
        }
    }

    createNextButton() {
        if(this.#page != this.#maxPageNumber) {
            this.#pageNumberList.innerHTML += `
                <a href="javascript:void(0)"><li>&#62;</li></a>
            `;
        }
    }

    addPageButtonEvent() {
        const pageButtons = this.#pageNumberList.querySelectorAll("li");
        pageButtons.forEach(button => {
            button.onclick = () => {
                if(button.textContent == "<") {
                    const nowPage = GoodsService.getInstance().goodsEntity.page;
                    GoodsService.getInstance().goodsEntity.page = Number(nowPage) - 1;
                    GoodsService.getInstance().loadGoods();

                }else if(button.textContent == ">") {
                    const nowPage = GoodsService.getInstance().goodsEntity.page;
                    GoodsService.getInstance().goodsEntity.page = Number(nowPage) + 1;
                    GoodsService.getInstance().loadGoods();

                }else {
                    const nowPage = GoodsService.getInstance().goodsEntity.page;
                    if(button.textContent != nowPage){
                        GoodsService.getInstance().goodsEntity.page = button.textContent;
                        GoodsService.getInstance().loadGoods();
                    }
                }
            }
        });
    }

    getPickListNum() {
      const pickListNum = document.querySelector(".pick_list_num");
      pickListNum.innerHTML = "";
      console.log(this.#totalCount);
      pickListNum.innerHTML = `
      <h4>상품 ${this.#totalCount} 개</h4>
      `;
    }
}

class GoodsService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new GoodsService();
        }
        return this.#instance;
    }

    pdtIdList = null;
    
    constructor() {
        this.pdtIdList = new Array();
               
    }
    // pdtList = null;

    goodsEntity = {
        page: 1,
        totalCount: 0,
        limitCount: 16
    }

    getChoseNum() {
        const chosenContainer = document.querySelector(".chosen_container");
        let i  = 0;

        chosenContainer.onchange = () => {
            i = chosenContainer.value;
            this.goodsEntity.limitCount = i;

            GoodsService.getInstance().loadGoods();
        }

    }

    // constructor() {
    //     this.pdtList = new Array();
    // }

    loadGoods() {
        const responseData = GoodsApi.getInstance().getGoods(this.goodsEntity.page, this.goodsEntity.limitCount);
        if(responseData.length > 0) {
            this.goodsEntity.totalCount = responseData[0].productTotalCount;
            new PageNumber(this.goodsEntity.page, this.goodsEntity.totalCount);
            this.getGoods(responseData);
        }else {
            alert("해당 카테고리에 등록된 상품 정보가 없습니다.");
            location.href = "/goods/all"
        }
    }

    getGoods(responseData){
        const goodProducts = document.querySelector(".goods-products");
        goodProducts.innerHTML = '';

        responseData.forEach(product => {
            this.pdtIdList.push(product.productId);
            // this.pdtIdList.push(product.productId);
            goodProducts.innerHTML += `
            <li class="goods-product">
                <div class="product-img">
                    <img src="/static/img/goods/goods_list/cup.jpg">
                </div>
                <div class="product-name">${product.productName}</div>
                <div class="product-price">${product.productPrice}</div>
            </li>
            `;
            
        });
        this.addGoodsListEvent(responseData);
    }

    //상품 등록 시 해당 주소 가져오기, 팀원 작업 마무리 후 href 수정필요

    addGoodsListEvent() {
        const goodProduct = document.querySelectorAll(".goods-product");

        goodProduct.forEach((product, index) => {
            product.onclick = () => {
                location.href = "/product/" + this.pdtIdList[index];
            }
        });
    }

    // addGoodsListEvent() {
    //     const goodsProducts = document.querySelectorAll(".goods-product");

    //     goodsProducts.forEach((product, index) => {
    //         product.onclick = () => {
    //             location.href = "/product/" + this.pdtIdList[index];
    //         }
    //     })
    // }
}

class CategoryName {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new CategoryName();
        }
        return this.#instance;
    }

    getCategoryName() {
        const locationTit = document.querySelector(".location_tit");
        const goodsList = document.querySelector(".goods_list");
        
        const url = location.href;
        const categoryName = decodeURI(url.substring(url.lastIndexOf("/") + 1));
        locationTit.innerHTML = "";
        goodsList.innerHTML = "";

        locationTit.innerHTML = `
        <a href="#">${categoryName}</a>
        `;

        goodsList.innerHTML = `
        <h2>${categoryName}</h2>
        `;
        console.log(categoryName);
    }

}




window.onload = () => {
    GoodsService.getInstance().loadGoods();
    CategoryName.getInstance().getCategoryName();
    GoodsService.getInstance().getChoseNum();

}