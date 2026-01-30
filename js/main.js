$(function () {
    // =========================
    // ハンバーガーメニュー
    // =========================
    $(".header__hamburger").on("click", function () {
        $(".header").toggleClass("is-open");
    });

    // =========================
    // フェードイン
    // =========================
    $('.fadeIn_up').on('inview', function (event, isInView) {
        if (isInView) {
            $(this).addClass('is-show');
        }
    });
    
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

        // 3. onsenセクション 切り替え
        const $onsen = $('#onsen');
        const onsenTop = $onsen.offset().top;
        const windowHeight = $(window).height();

        // sticky 開始後のスクロール量
        const progress = scrollTop - onsenTop;

        if (progress < 0) return;

        const index = Math.floor(progress / windowHeight);
        const maxIndex = $('.onsen__item').length - 1;
        const currentIndex = Math.min(index, maxIndex);

        $('.onsen__item, .onsen__img').removeClass('is-active');
        $('.onsen__item').eq(currentIndex).addClass('is-active');
        $('.onsen__img').eq(currentIndex).addClass('is-active');

    });

    // =========================
    // Info クリック
    // =========================
    document.querySelectorAll('.info__menu-item').forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;

            // すべてのボタンとパネルからis-activeを外す
            document.querySelectorAll('.info__menu-item').forEach(b => b.classList.remove('is-active'));
            document.querySelectorAll('.info__panel').forEach(p => p.classList.remove('is-active'));

            // クリックされたものにis-activeを付与
            button.classList.add('is-active');
            document.getElementById(target).classList.add('is-active');
        });
    });


    // =========================
    // Location スライダー
    // =========================
    // 1. 背景用の要素を全て取得
    const bgItems = document.querySelectorAll('.bg-slider__item');
    // ▼ 一時リリース用に追加
    const textItems = document.querySelectorAll('.location__text__slider__item');
    // ▲ 一時リリース用に追加

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

            // ▼ 一時リリース用に追加
            textItems.forEach(item => {
                item.classList.remove('is-active');
            });
            textItems[index].classList.add('is-active');
            // ▲ 一時リリース用に追加
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
    // Plan：表切り替え
    // =========================
    const tabs = document.querySelectorAll('.plan__tab');
    const contents = document.querySelectorAll('.plan__content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('is-active'));
            contents.forEach(c => c.classList.remove('is-active'));

            tab.classList.add('is-active');
            document
                .querySelector(`.plan__content[data-content="${target}"]`)
                .classList.add('is-active');
        });
    });

    // =========================
    // News：カテゴリ切り替え
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

    // =========================
    // footer:アコーディオン
    // =========================
    $(".footer__access-toggle").on("click", function () {
        $(this).toggleClass("is-open");
        $(this).next().slideToggle();
    });

    // =========================
    // footer:西暦取得
    // 現在の西暦を取得して、HTMLの .js-year に入れる
    // =========================
    const currentYear = new Date().getFullYear();
    $(".js-year").text(currentYear);

    // =========================
    // スムーススクロール
    // =========================
    $('a[href^="#"]').click(function () {
        // クリックしたaタグのリンクを取得
        let href = $(this).attr("href");
        // ジャンプ先のid名をセット hrefの中身が#もしくは空欄なら,htmlタグをセット
        let target = $(href == "#" || href == "" ? "html" : href);
        // ページトップからジャンプ先の要素までの距離を取得
        let position = target.offset().top;
        // animateでスムーススクロールを行う   ページトップからpositionだけスクロールする
        // 600はスクロール速度で単位はミリ秒  swingはイージングのひとつ
        $("html, body").animate({ scrollTop: position }, 600, "swing");
        // urlが変化しないようにfalseを返す
        return false;
    });

});