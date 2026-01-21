$(function () {
    let cardsShown = false; //カード出現動作しなかったらいらない

    // =========================
    // スクロール関連
    // =========================
    $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();

        // 1. サイトロゴをスクロール量に応じて薄く
        const aboutTop = $('#about').offset().top;
        const fadeProgress = scrollTop / aboutTop;
        $('.logo').css('opacity', Math.max(0, 1 - fadeProgress));

        // 2. about 以降でヘッダを表示
        if (scrollTop >= aboutTop) {
            $('.header').addClass('is-show');
        } else {
            $('.header').removeClass('is-show');
        }

        // 3. locationカード出現
        // const sectionTop = $('#location').offset().top;
        // const windowH = $(window).height();

        // if (!cardsShown && scrollTop + windowH > sectionTop + 500) {
        //     cardsShown = true; // 一度だけ
        //     $('.cards .card').addClass('is-show'); // 4枚まとめて表示
        // }
    });

    // =========================
    // Location スライダー
    // =========================
    // 1. 背景用の要素を全て取得
    const bgItems = document.querySelectorAll('.bg-slider__item');

    // 2. location__slider と同じ画像を背景用にセット
    $('.location__slider img').each(function (index) {
        const src = $(this).attr('src');
        bgItems[index].style.backgroundImage = `url(${src})`;
    });

    // 3. slick 起動時の処理
    $('.location__slider').on(
        'init beforeChange',
        function (event, slick, currentSlide, nextSlide) {

            // 1) 背景切り替え
            const index = nextSlide !== undefined ? nextSlide : 0;

            bgItems.forEach(item => {
                item.classList.remove('is-active');
            });
            bgItems[index].classList.add('is-active');
        }
    );

    // 4. slick 起動
    $('.location__slider').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1200,
        arrows: false,
        dots: false,
        fade: true
    });

    // =========================
    // News カテゴリ切り替え
    // =========================
    const $tabs = $('.news__tab');
    const $items = $('.news__item');
    const FADE_TIME = 300;

    $tabs.on('click', function () {
        const category = $(this).data('category');

        // tab active
        $tabs.removeClass('is-active');
        $(this).addClass('is-active');

        // ① 全部フェードアウト
        $items.removeClass('is-fade-in').addClass('is-fade-out');

        setTimeout(() => {
            // ② 一旦全部非表示
            $items.addClass('is-hidden').removeClass('is-fade-out');

            // ③ 表示対象だけ復活
            $items.each(function () {
                const itemCategory = $(this).data('category');

                if (category === 'all' || itemCategory === category) {
                    $(this)
                        .removeClass('is-hidden')
                        .addClass('is-fade-in');

                    // ④ 次のフレームでopacity戻す
                    requestAnimationFrame(() => {
                        $(this).removeClass('is-fade-in');
                    });
                }
            });
        }, FADE_TIME);
    });


});

