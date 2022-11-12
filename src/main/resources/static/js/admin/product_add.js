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
    this.setCategorySelectOptions();
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

  setCategorySelectOptions() {


    const categorySelect = document.querySelector(".cagetory-select");
    categorySelect.innerHTML = `<option value="none">카테고리</option>`;
  
    const responseData = CommonApi.getInstance().getCategoryList();
    if(responseData != null) {
      if (responseData.length > 0) {
        responseData.forEach(product => {
          categorySelect.innerHTML += `
            <option value="${product.id}">${product.name}</option>
          `;
        });
      }
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

  getCategoryList() {
    let responseResult = null;

    $.ajax ({
      async: false,
      type: "get",
      url: "/api/admin/product/category",
      dataType: "json",
      success: (response) => {
        responseResult = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });

    return responseResult;
  }

  registerApi(formData) {
    $.ajax({
        async: false,
        type: "post",
        url: "/api/admin/product/register",
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        data: formData,
        dataType: "json",
        success: (response) => {
            alert("상품 등록 완료");
            location.replace("/admin/product/register");
        },
        error: (error) => {
            alert("상품 등록 실패\n" + error.responseJSON.msg);
            console.log(error);
        }
    });
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

  newImgList = new Array();


  constructor() {
    this.addFileInputEvent();
    this.sumbit();
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
    const deleteButtons = document.querySelectorAll(".delete-button");

    deleteButtons.forEach((deleteButton, i) => {
      deleteButton.onclick = () => {
        if (confirm("상품이미지를 지우시겠습니까?")) {
          this.newImgList.splice(i, 1);
          this.loadImgs();
        }
      }
    });
  }
  
  sumbit() {
    const registerButton = document.querySelector(".upload-button");
    registerButton.onclick = () => {
        const productInputs = document.querySelectorAll(".product-inputs");
        
        let formData = new FormData();

        formData.append("categoryId", productInputs[0].value);
        formData.append("name", productInputs[1].value);
        formData.append("price", productInputs[2].value);
        formData.append("design", productInputs[3].value);
        formData.append("stock", productInputs[4].value);
        
        this.newImgList.forEach((file) => {
            formData.append("files", file);
        });

        CommonApi.getInstance().registerApi(formData);
    }        
  }
}


window.onload = () => {
  Option.getInstance();
  ProductImgFile.getInstance();
}