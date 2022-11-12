class Option {
  static #instance = null;

  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new Option();
    }
    return this.#instance;
  }

  constructor() {
    this.numCheck();
  }
  
  numCheck() {
    const price =  document.querySelectorAll(".numberChk")[0];
    const stock =  document.querySelectorAll(".numberChk")[1];

    price.oninput= () => {
      price.value = price.value.replace(/[^0-9]/g, '');
    } 
    stock.oninput= () => {
      stock.value = stock.value.replace(/[^0-9]/g, '');
    } 
  }
}

class CommonApi {
  static #instance = null;
  
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new CommonApi();
    }
    return this.#instance;
  }

  getProduct() {
    let responseResult = null;

    const url = location.href;
    let urlList = new Array();
    urlList = url.split("/");
    const pdtId = urlList[urlList.length-2];
    const pdtDesign = decodeURI(urlList[urlList.length-1]); 
    $.ajax ({
      async: false,
      type: "get",
      url: "/api/admin/product/" + pdtId + "/"+ pdtDesign,
      dataType: "json",
      success: (response) => {
        responseResult = response.data;
        console.log(responseResult);
      },
      error: (error) => {
        console.log(error);
      }
    });

    return responseResult;
  }

  updateApi(formData) {
    $.ajax({
        async: false,
        type: "post",
        url: "/api/admin/product/update",
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        data: formData,
        dataType: "json",
        success: (response) => {
            alert("상품 수정 완료");
            location.replace("/admin/product/1");
        },
        error: (error) => {
            alert("상품 등록 실패\n" + error.responseJSON.msg);
            console.log(error);
        }
    });
  }
}

class ProductService {
  static #instance = null;
  productData = null;

  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new ProductService();
    }
    return this.#instance;
  }

  constructor() {
    this.productData = CommonApi.getInstance().getProduct();
    this.readProduct();
  }

  readProduct() {
    const registHeader = document.querySelector(".regist-header");
    registHeader.innerHTML = `
    <input type="hidden" class="product-inputs" value=${this.productData.id}>
    <input type="hidden" class="product-inputs" value=${this.productData.pdtDtlId}>
    <div class="update-list">
    </div>
    <div class="update-list">
    </div>
    <div class="update-list">
    </div>
    `;
    const updateList = document.querySelectorAll(".update-list");
    updateList[0].innerHTML = "";
    updateList[0].innerHTML = ` 가격 :
    <input type="text" class="product-inputs numberChk" value=${this.productData.pdtPrice} placeholder="가격">`;
    updateList[1].innerHTML = "";
    updateList[1].innerHTML = ` 디자인 :
    <input type="text" class="product-inputs" value=${this.productData.pdtDesign} placeholder="디자인">`;
    updateList[2].innerHTML = "";
    updateList[2].innerHTML = ` 재고 :
    <input type="text" class="product-inputs numberChk" value=${this.productData.pdtStock} placeholder="재고">`;
    

    Option.getInstance();
  }
}



class ProductImgFile {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new ProductImgFile();
    }
    return this.#instance;
  }


  oldImgList;
  oldImgDeleteList;
  newImgList;
  newImgSrcList;

  constructor() {
    this.oldImgList = CommonApi.getInstance().getProduct().files;
    this.oldImgDeleteList = new Array();
    this.newImgList = new Array();
    this.loadOldImgs();
    this.addFileInputEvent();
    // this.sumbit();
  }

  loadOldImgs() {
    const fileList = document.querySelector(".old-file-list");
    fileList.innerHTML = "";
    console.log(this.oldImgList);
    this.oldImgList.forEach((imgFile, i) => {
        fileList.innerHTML += `
          <li class="file-info">
            <div class="file-img">
              <img src="/static/upload/product/${imgFile.save_name}" alt="">
            </div>
            <div class="file-name">${imgFile.origin_name}</div>
            <button type="button" class="btn old-delete-button">삭제</button>
          </li>
        `;
      });
      this.addDeleteEvent();
  }

  addFileInputEvent() {
    const filesInput = document.querySelector(".files-input");
    const imgAddButton = document.querySelector(".img-add-button");
    imgAddButton.onclick = () => {
      filesInput.click(); // 버튼 클릭시 input 이벤트 발생
    }
    filesInput.onchange = () => {
      const formData = new FormData(document.querySelector("form"));

      let changeFlag = false;

      formData.forEach(value => {
        if(value.size != 0) { // 취소하면 사이즈가 0이 나와서 그 경우를 제외
          this.newImgList.push(value);
          changeFlag = true;
        }
      });

      if(changeFlag) {
        this.loadImgs();
        filesInput.value = null;

      }
    }
  }

  loadImgs() {
    const fileList = document.querySelector(".file-list");
    fileList.innerHTML = "";

    this.newImgList.forEach((imgFile, i) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        fileList.innerHTML += `
          <li class="file-info">
            <div class="file-img">
              <img src="${e.target.result}" alt="">
            </div>
            <div class="file-name">${imgFile.name}</div>
            <button type="button" class="btn delete-button">삭제</button>
          </li>
        `;
      }
      //readAsDataURL(); 비동기처리... 순서대로 들어오지 않음.
      setTimeout(() => {
        reader.readAsDataURL(imgFile);
      }, i * 300); // 처리를 i * 200 늦게
    });

    setTimeout(() => {
      this.addDeleteEvent();
    }, this.newImgList.length * 300);
  }
  
  addDeleteEvent() {
    const oldDeleteButton = document.querySelectorAll(".old-delete-button");
    const deleteButtons = document.querySelectorAll(".delete-button");
    oldDeleteButton.forEach((deleteButton, i) => {
      deleteButton.onclick = () => {
        if (confirm("상품 이미지를 지우시겠습니까?")) {
            this.oldImgDeleteList.push(this.oldImgList[i]);
            this.oldImgList.splice(i, 1);
            this.loadOldImgs();
        }
      };
      });
    deleteButtons.forEach((deleteButton, i) => {
      deleteButton.onclick = () => {
        if (confirm("상품 이미지를 지우시겠습니까?")) {
          this.newImgList.splice(i, 1);
          this.loadImgs();
        }
      }
    });
  }
}

class NewFormData {

  oldImgDeleteList;
  newImgList;
  updateFormData;

  constructor() {
    this.oldImgDeleteList = ProductImgFile.getInstance().oldImgDeleteList;
    this.newImgList = ProductImgFile.getInstance().newImgList;
    this.updateFormData = new FormData();
    this.toUpdateFormData();
  }

  toUpdateFormData() {
      const productInputs = document.querySelectorAll(".product-inputs");

      this.updateFormData.append("id", productInputs[0].value);
      this.updateFormData.append("pdtDtlId", productInputs[1].value);
      this.updateFormData.append("pdtPrice", productInputs[2].value);
      this.updateFormData.append("pdtDesign", productInputs[3].value);
      this.updateFormData.append("pdtStock", productInputs[4].value);

      this.oldImgDeleteList.forEach(deleteImgFile => {
          this.updateFormData.append("deleteImgFiles", deleteImgFile.save_name);
      });

      this.newImgList.forEach(newImgFile => {
          this.updateFormData.append("files", newImgFile);
      });
      return this.updateFormData;
  }
} 

class UpdateEvent {

  oldImgDeleteList;
  newImgList;

  constructor() {
    this.oldImgDeleteList = ProductImgFile.getInstance().oldImgDeleteList;
    this.newImgList = ProductImgFile.getInstance().newImgList;
    this.getUpdateButton();
  }

  toUpdateFormData() {
    const productInputs = document.querySelectorAll(".product-inputs");

    let updateFormData = new FormData();

    updateFormData.append("id", productInputs[0].value);
    updateFormData.append("pdtDtlId", productInputs[1].value);
    updateFormData.append("pdtPrice", productInputs[2].value);
    updateFormData.append("pdtDesign", productInputs[3].value);
    updateFormData.append("pdtStock", productInputs[4].value);

    this.oldImgDeleteList.forEach(deleteImgFile => {
        updateFormData.append("deleteImgFiles", deleteImgFile.save_name);
    });

    this.newImgList.forEach(newImgFile => {
        updateFormData.append("files", newImgFile);
    });
  }

  getUpdateButton() {
    
    const uploadButton = document.querySelector(".upload-button");
    uploadButton.onclick = () => {
      const productInputs = document.querySelectorAll(".product-inputs");

      let updateFormData = new FormData();

      updateFormData.append("id", productInputs[0].value);
      updateFormData.append("pdtDtlId", productInputs[1].value);
      updateFormData.append("pdtPrice", productInputs[2].value);
      updateFormData.append("pdtDesign", productInputs[3].value);
      updateFormData.append("pdtStock", productInputs[4].value);

      this.oldImgDeleteList.forEach(deleteImgFile => {
          updateFormData.append("deleteImgFiles", deleteImgFile.save_name);
      });

      this.newImgList.forEach(newImgFile => {
          updateFormData.append("files", newImgFile);
      });
      CommonApi.getInstance().updateApi(updateFormData);
    }
  }
}
window.onload = () => {
  ProductService.getInstance();
  ProductImgFile.getInstance();
  new UpdateEvent;
}