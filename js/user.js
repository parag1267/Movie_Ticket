var swiper = new Swiper(".mySwiper", {
    spaceBetween: 40,
    centeredSlides: true,
    autoplay: {
        delay: 2600,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});