const chosenContainer = document.querySelector(".chosen_container");
const chosenContainerNum = document.querySelector(".chosen_container_num");

chosenContainer.onclick = () => {
  chosenContainerNum.classList.toggle("chosen_container_num_invisible");
}