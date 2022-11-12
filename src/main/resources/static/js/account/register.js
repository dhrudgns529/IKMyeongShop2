class Option {
  static #instance = null;

  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new Option();
    }
    return this.#instance;
  }

  constructor() {
    this.getEmail();
    this.phoneNumCheck();
    this.getAddress();
    this.cancel();
  }

  getEmail() {
    const emailSelect = document.querySelector(".chosen-select");

    emailSelect.onchange = () => {
      const inputEmail = document.querySelectorAll(".register-inputs")[4].value;
      if (inputEmail.includes('@')) {
        document.querySelectorAll(".register-inputs")[4].value = inputEmail.substr(0,inputEmail.indexOf("@")) + emailSelect.value;
      }else {
        document.querySelectorAll(".register-inputs")[4].value += emailSelect.value;
      }
    }   
  }

  phoneNumCheck() {
    const phone =  document.querySelectorAll(".register-inputs")[5];

    phone.oninput= () => {
      phone.value = phone.value.replace(/[^0-9]/g, '');
    } 
  }

  getAddress() {
    const addressbtn = document.querySelector(".btn_post_search");

    addressbtn.onclick = () => {
      new daum.Postcode({
        oncomplete: function(data) {
            var addr = '';
    
            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }
            
            document.getElementById("postcode").value = data.zonecode;
            document.getElementById("address").value = addr;
    
            document.getElementById("addressSub").focus();
        }
      }).open();
    }
  }

  cancel() {
    const cancelButton = document.querySelector(".btn-member-cancel");

    cancelButton.onclick = () => {
      location.href = "/index";
    }
  }
}

class InputData {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new InputData();
    }
    return this.#instance;
  }

  getRegisterApi() {
    const registerButton = document.querySelector(".js_btn_join");

    registerButton.onclick = () => {
      errorMessage.getInstance().nonError();
      errorMessage.getInstance().nonErrorMessage();

      const userData = {
        "userName" : document.querySelectorAll(".register-inputs")[0].value,
        "password" : document.querySelectorAll(".register-inputs")[1].value,
        "passwordChk" : document.querySelectorAll(".register-inputs")[2].value,
        "name" : document.querySelectorAll(".register-inputs")[3].value,
        "email" : document.querySelectorAll(".register-inputs")[4].value,
        "phone" : document.querySelectorAll(".register-inputs")[5].value,
        "postCode" : document.querySelectorAll(".register-inputs")[6].value,
        "address" : document.querySelectorAll(".register-inputs")[7].value,
        "addressSub" : document.querySelectorAll(".register-inputs")[8].value
      }

      $.ajax({
        async: false,                   
        type: "post",                   // post 생성, get 조회
        url: "/api/account/register",   
        contentType: "application/json",// 전송할 데이터가 json인 경우
        data: JSON.stringify(userData), // 전송할 데이터가 있으면
        // JSON.stringify() - js 객체를 JSON 문자열로 변환
        // JSON.parse()     - JSOn 문자열을 js 객체로 변환
        dataType: "json",               
        success: (response, textStatus, request) => {        
          console.log(response);
          const successURI = request.getResponseHeader("Location");
          location.replace(successURI + "?username=" + response.data); // Location 지정한 곳 + response.data까지
        },
        error: (error) => {
          console.log(error.responseJSON.data);
          errorMessage.getInstance().getErrorMessage(error.responseJSON.data);
        }
      });
    }
  }
}

class errorMessage {
  static #instance = null;

  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new errorMessage();
    }
    return this.#instance;
  }

  getErrorMessage(error) {
    const errorKeys = Object.keys(error);
    const errorValues = Object.values(error);

    for(let i=0; i<errorKeys.length; i++) {
      if (errorKeys[i] == "userName"){
        const userNameError = document.querySelectorAll(".register-inputs")[0];
        userNameError.classList.add("inputs-invisible");
        
        const userNameErrorMsg = document.querySelectorAll(".error-message")[0];
        userNameErrorMsg.innerHTML = `${errorValues[i]}`;
      }else if (errorKeys[i] == "password") {
        const passwordError = document.querySelectorAll(".register-inputs")[1];
        passwordError.classList.add("inputs-invisible");
        
        const passwordErrorMsg = document.querySelectorAll(".error-message")[1];
        passwordErrorMsg.innerHTML = `${errorValues[i]}`;
      }else if (errorKeys[i] == "passwordChk") {
        const passwordChkError = document.querySelectorAll(".register-inputs")[2];
        passwordChkError.classList.add("inputs-invisible");
        
        const passwordChkErrorMsg = document.querySelectorAll(".error-message")[2];
        passwordChkErrorMsg.innerHTML = `${errorValues[i]}`;
      }else if (errorKeys[i] == "name") {
        const nameError = document.querySelectorAll(".register-inputs")[3];
        nameError.classList.add("inputs-invisible");
        
        const nameErrorMsg = document.querySelectorAll(".error-message")[3];
        nameErrorMsg.innerHTML = `${errorValues[i]}`;
      }else {
        const emailError = document.querySelectorAll(".register-inputs")[4];
        emailError.classList.add("inputs-invisible");
        
        const emailErrorMsg = document.querySelectorAll(".error-message")[4];
        emailErrorMsg.innerHTML = `${errorValues[i]}`;
      }
    }
  }

  nonError() {
    const userNameError = document.querySelectorAll(".register-inputs")[0];
    const passwordError = document.querySelectorAll(".register-inputs")[1];
    const passwordChkError = document.querySelectorAll(".register-inputs")[2];
    const nameError = document.querySelectorAll(".register-inputs")[3];
    const emailError = document.querySelectorAll(".register-inputs")[4];

    userNameError.classList.remove("inputs-invisible");
    passwordError.classList.remove("inputs-invisible");
    passwordChkError.classList.remove("inputs-invisible");
    nameError.classList.remove("inputs-invisible");
    emailError.classList.remove("inputs-invisible");
  }

  nonErrorMessage() {
    const userNameErrorMsg = document.querySelectorAll(".error-message")[0];
    const passwordErrorMsg = document.querySelectorAll(".error-message")[1];
    const passwordChkErrorMsg = document.querySelectorAll(".error-message")[2];
    const nameErrorMsg = document.querySelectorAll(".error-message")[3];
    const emailErrorMsg = document.querySelectorAll(".error-message")[4];

    userNameErrorMsg.innerHTML = "";
    passwordErrorMsg.innerHTML = "";
    passwordChkErrorMsg.innerHTML = "";
    nameErrorMsg.innerHTML = "";
    emailErrorMsg.innerHTML = "";
  }

}

window.onload = () => {
  Option.getInstance();
  InputData.getInstance().getRegisterApi();
  
}