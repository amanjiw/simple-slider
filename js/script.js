"use strict";
const main = document.querySelector("#main");
const sliderSectin = document.querySelector("#slider");
const allSlides = document.querySelector("#slides");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector("#next");
const preBtn = document.querySelector("#previous");
const allSLD = document.querySelectorAll(".sld")
const btns = document.querySelector(".btns");
let translatee = 0, anime = false, mainAnime, activeSlide;

const goForward = function () {

    const lastSlide = allSlides.lastElementChild;

    if (translatee <= 800) {

        translatee = translatee + 10;
        lastSlide.style.transform = `translateX(${translatee}px)`;
        requestAnimationFrame(goForward);
        anime = true;
    } else {
        translatee = 0;
        lastSlide.style.transform = `translateX(0px)`;
        allSlides.insertAdjacentElement("afterbegin", lastSlide);
        activeSlide = allSlides.lastElementChild.dataset.slide;
        allSLD.forEach(slide => slide.classList.remove("active"));
        document.querySelector(`.slide${activeSlide}`).classList.add("active");
        mainAnime = setTimeout(goForward, 6000);
        anime = false;
    }
}


const goBackward = function () {


    const firstSlide = allSlides.firstElementChild;
    const currentSlide = allSlides.insertAdjacentElement("beforeend", firstSlide);

    translatee = 800;
    const goBack = function () {
        if (translatee >= 10) {
            translatee = translatee - 10;

            currentSlide.style.transform = `translateX(${translatee}px)`;
            requestAnimationFrame(goBack);
            anime = true;

        } else {
            anime = false;
            mainAnime = setTimeout(goForward, 6000)


            allSLD.forEach(slide => slide.classList.remove("active"));
            activeSlide = allSlides.lastElementChild.dataset.slide;
            document.querySelector(`.slide${activeSlide}`).classList.add("active")

        }

    }

    goBack();
}



if (!anime) mainAnime = setTimeout(goForward, 6000);


nextBtn.addEventListener("click", function (event) {
    if (!anime) {
        clearTimeout(mainAnime);
        requestAnimationFrame(goForward);
        anime = true;

    }

});


preBtn.addEventListener("click", function (event) {

    if (!anime) {
        clearTimeout(mainAnime);
        goBackward();
    }

});

btns.addEventListener("click", function (event) {

    const clickedBtn = event.target;
    if (clickedBtn.classList.contains("sld")) {
        allSLD.forEach(slide => slide.classList.remove("active"));
        clickedBtn.classList.add("active");

        const currSlide = document.querySelector(`.s${clickedBtn.dataset.btn}`)
        console.log(currSlide);

        if (!anime && currSlide != allSlides.lastElementChild) {
            clearTimeout(mainAnime);
            translatee = 800;

            const btnslide = function () {
                if (translatee >= 10) {
                    anime = true;
                    translatee = translatee - 10;
                    currSlide.style.transform = `translateX(${translatee}px)`
                    allSlides.insertAdjacentElement("beforeend", currSlide);
                    setTimeout(btnslide, 15);
                } else {
                    anime = false;
                    mainAnime = setTimeout(goForward, 6000)
                }
            }

            setTimeout(btnslide, 15);

        }
    }

})