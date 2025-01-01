(function(mccg) {
    mccg.footer = $(($('#main-page')[0] as HTMLTemplateElement).content).children('footer')[0];
    mccg.homePage = document.createElement('body');
    mccg.homePage.innerHTML = $('#main-page').html();

    document.body = mccg.homePage;
    mccg.showingCmdPage.showing = false;
    mccg.showingCmdPage.showingPage = 'home-page';

    mccg.commandPage();
})(mccg);
if (location.hash === '') {
    ($('#theme-select').children(`[value=${mccg.theme.value}]`)[0] as HTMLOptionElement).selected = true;
    mccg.theme.value = $('#theme-select').val() as MccgTypes.STheme;
}

$('.left-menu li').on('click', (e) => {
    const dataset = e.target.dataset;
    if (!dataset.selected) {
        dataset.selected = '';
        dataset.leftMenuSelectedTemp = 'true';
        $('.left-menu li').each((_i, ele) => {
            if (ele.dataset.leftMenuSelectedTemp !== 'true' && ele.dataset.selected === '')
                delete ele.dataset.selected
        });
        delete dataset.leftMenuSelectedTemp;
    }
}); // 左侧菜单栏选项选中
$('#theme-select').on('change', () =>
    mccg.theme.value = $('#theme-select').val() as MccgTypes.STheme
);
window.addEventListener('hashchange', () => mccg.commandPage());
window.addEventListener('beforeunload', () =>
    localStorage.setItem('theme', mccg.theme.value) // 保存主题
);
/* $(window).on('beforeunload', (e) => {
    e.preDefault();
    return e.
}); */