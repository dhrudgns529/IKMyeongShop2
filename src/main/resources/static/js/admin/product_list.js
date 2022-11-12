class CollectionsApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new CollectionsApi();
        }
        return this.#instance;
    }

    getCollections(page) {
        let responseData = null;

        const url = location.href;
        const category = url.substring(url.lastIndexOf("/") + 1);

        $.ajax({
            async: false,
            type: "get",
            url:  "/api/v1/product/" + page,
            dataType: "json",
            success: (response) => {
                responseData = response.data;
                console.log(responseData);
            },
            error: (error) => {
                console.log(error);
            }
        });
        console.log(responseData);

        return responseData;

    }
}

class Collections{

    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new Collections();
        }
        return this.#instance;
    }
    collectionsEntity = {
        page: 1
    }
    loadCollections(){
        const responseData = CollectionsApi.getInstance().getCollections(this.collectionsEntity.page);
        console.log(responseData)
        if(responseData.length < 0) {
            alert("해당 카테고리에 등록된 상품 정보가 없습니다.");
        }
    }
    getCollections(){
        const responseData = CollectionsApi.getInstance().getCollections(this.collectionsEntity.page);
        console.log(responseData)

        const collectionProducts = document.querySelector(".item_list");
        
        console.log(collectionProducts)

        collectionProducts.innerHTML += ``;

        responseData.forEach(product =>{

            collectionProducts.innerHTML += `
            <tr>
                <th>${product.productId}</th>
                <th>${product.categoryName}</th>
                <th>${product.productName}</th>
                <th class ="design">${product.productDesign}</th>
                <th>${product.productPrice}</th>
                <th><button>보기</button></th>
                <th><button>수정</button></th>
                <th><button>삭제</button></th>
            </tr>
            `;

        });
    }
}

window.onload= () => {
    CollectionsApi.getInstance().getCollections(1);
    Collections.getInstance().loadCollections();
    Collections.getInstance().getCollections();
  }
