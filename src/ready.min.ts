(function(obj) {
    obj.footer = $(($('#main-page')[0] as HTMLTemplateElement).content).children('footer')[0];
    obj.homePage = document.createElement('body');
    obj.homePage.innerHTML = $('#main-page').html();

    document.body = obj.homePage;
    obj.showingCmdPage.showing = false;
    obj.showingCmdPage.showingPage = 'home-page';
    history.replaceState(null, '', location.pathname + location.search);
})(mccg);
if (location.hash === '') {
    ($('#theme-check').children(`[value=${mccg.theme.value}]`)[0] as HTMLOptionElement).selected = true;
    mccg.theme.value = $('#theme-check').val() as sTheme;
}

$('.left-menu li').on('click', (e) => {
    let dataset = e.target.dataset;
    if (!dataset.selected) {
        dataset.selected = '';
        dataset.leftMenuSelectedTemp = 'true';
        $('.left-menu li').each((_i, ele) => {
            if (ele.dataset.leftMenuSelectedTemp !== 'true' && ele.dataset.selected == '')
                delete ele.dataset.selected
        });
        delete dataset.leftMenuSelectedTemp;
    }
}); // 左侧菜单栏选项选中
$('#theme-check').on('change', () =>
    mccg.theme.value = $('#theme-check').val() as sTheme
);
window.addEventListener('hashchange', (e) => { // 合着jq就不行是吧
    new URL(e.newURL).hash !== '' && (mccg.showingCmdPage.showing = true);
    mccg.commandPage.call(mccg);
});
window.addEventListener('beforeunload', () =>
    localStorage['theme'] = mccg.theme.value // 保存主题
);
/* $(window).on('beforeunload', (e) => {
    e.preDefault();
    return e.
}); */