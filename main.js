const slideList = [
  {
    vid: "Videos/1.mp4",
    text: "Wygoda",
  },
  {
    vid: "Videos/2.mp4",
    text: "Niezawodność",
  },
  {
    vid: "Videos/3.mp4",
    text: "Styl",
  },
  {
    vid: "Videos/4.mp4",
    text: "Pospiesz się! Ilość produktów ograniczona!",
  },
];

const slideText = document.getElementById("text");
const buyBtm = document.getElementById("buyNow");
const video = document.getElementById("video");
const counterOne = document.getElementById("counterOne");
const counterTwo = document.getElementById("counterTwo");
const counterThree = document.getElementById("counterThree");

let active = 0;
const time = 4000;

let countOne = (countTwo = countThree = 0);
counterOne.textContent = ` ${countOne} `;
counterTwo.textContent = ` ${countTwo} `;
counterThree.textContent = ` ${countThree} `;

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navBar").style.top = "0";
  } else {
    document.getElementById("navBar").style.top = "-140px";
  }
  prevScrollpos = currentScrollPos;
};

const changeSlide = () => {
  active++;
  if (active == slideList.length) {
    active = 0;
  }
  video.src = slideList[active].vid;
  slideText.textContent = slideList[active].text;
};

const keyChangeSlide = (e) => {
  const key = e.keyCode;
  if (key === 39 && active < slideList.length - 1) {
    active++;
    video.src = slideList[active].vid;
    slideText.textContent = slideList[active].text;
    clearInterval(keyInterval);
  } else if (key === 39 && active === slideList.length - 1) {
    active = 0;
    video.src = slideList[active].vid;
    slideText.textContent = slideList[active].text;
    clearInterval(keyInterval);
  } else if (key === 37 && active > 0) {
    active--;
    video.src = slideList[active].vid;
    slideText.textContent = slideList[active].text;
    clearInterval(keyInterval);
  } else if (key === 37 && active === 0) {
    active = slideList.length - 1;
    video.src = slideList[active].vid;
    slideText.textContent = slideList[active].text;
    clearInterval(keyInterval);
  }
  clearInterval(keyInterval);
  keyInterval = setInterval(changeSlide, time);
};

const sellProducts = () => {
  productsInterval = setInterval(() => {
    if (countOne < 23000) {
      countOne += 50;
      counterOne.textContent = `${countOne}`;
    } else clearInterval(productsInterval);
  }, 1);
};

const happyClients = () => {
  clientsInterval = setInterval(() => {
    if (countTwo < 99) {
      countTwo += 1;
      counterTwo.textContent = `${countTwo}%`;
    } else clearInterval(clientsInterval);
  }, 35);
};

const dealers = () => {
  dealersInterval = setInterval(() => {
    if (countThree < 1000) {
      countThree += 10;
      counterThree.textContent = `${countThree}`;
    } else clearInterval(dealersInterval);
  }, 50);
};

const observer = new IntersectionObserver(
  function (entries) {
    if (entries[0].isIntersecting === true) {
      sellProducts();
      happyClients();
      dealers();
    } else {
      countOne = 0;
      countTwo = 0;
      countThree = 0;
    }
  },
  { threshold: [0] }
);

let keyInterval = setInterval(changeSlide, time);

observer.observe(document.getElementById("counter"));
window.addEventListener("keydown", keyChangeSlide);
