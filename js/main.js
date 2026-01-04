$(function () {
    const trigger = $('#stay').offset().top;

    $(window).on('scroll', function () {
        const scroll = $(window).scrollTop();

        if (scroll >= trigger) {
            $('.header').addClass('is-show');
        } else {
            $('.header').removeClass('is-show');
        }
    });
});