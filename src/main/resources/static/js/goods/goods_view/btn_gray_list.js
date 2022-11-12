const btn1 = document.querySelectorAll(".btn_gray_list")[0];
const layer1 = document.querySelectorAll(".layer_area")[0];
const cloes1 = document.querySelectorAll(".ly_close")[0];

const btn2 = document.querySelectorAll(".btn_gray_list")[1];
const layer2 = document.querySelectorAll(".layer_area")[1];
const cloes2 = document.querySelectorAll(".ly_close")[1];

btn1.onclick = () => {
    layer1.classList.toggle("layer_area_invisible");
}

btn2.onclick = () => {
    layer2.classList.toggle("layer_area_invisible");
}

cloes1.onclick = () => {
    layer1.classList.toggle("layer_area_invisible")
}

cloes2.onclick = () => {
    layer2.classList.toggle("layer_area_invisible")
}