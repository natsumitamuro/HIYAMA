$(function () {
    const trigger = $('#intro').offset().top;

    $(window).on('scroll', function () {
        const scroll = $(window).scrollTop();

        if (scroll >= trigger) {
            $('.header').addClass('is-show');
        } else {
            $('.header').removeClass('is-show');
        }
    });


    const logo = document.querySelector('.logo');
    const intro = document.querySelector('#intro');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const introTop = intro.offsetTop;

        // 0〜1 の間に収める
        const fadeProgress = scrollY / introTop;

        logo.style.opacity = Math.max(0, 1 - fadeProgress);
    });
});