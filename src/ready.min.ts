(function(obj) {
    obj.footer = $(($('#main-page')[0] as HTMLTemplateElement).content).children('footer')[0];
    obj.homePage = document.createElement('body');
    obj.homePage.innerHTML = $('#main-page').html();

    document.body = obj.homePage;
    obj.showingCmdPage.showing = false;
    obj.showingCmdPage.showingPage = 'home-page';

    obj.commandPage();
})(mccg);
if (location.hash === '') {
    ($('#theme-select').children(`[value=${mccg.theme.value}]`)[0] as HTMLOptionElement).selected = true;
    mccg.theme.value = $('#theme-select').val() as sTheme;
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
    mccg.theme.value = $('#theme-select').val() as sTheme
);
window.addEventListener('hashchange', () => mccg.commandPage());
window.addEventListener('beforeunload', () =>
    localStorage['theme'] = mccg.theme.value // 保存主题
);
/* $(window).on('beforeunload', (e) => {
    e.preDefault();
    return e.
}); */