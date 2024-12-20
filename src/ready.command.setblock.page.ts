// @ts-ignore
$('#block input').on('input', (e: MccgTypes.EventTargetType<HTMLInputElement>) => {
    if (e.target.value === '')
        ($('#block input')[0] as HTMLInputElement).placeholder = '方块名';
    ($('#search-in-database')[0] as HTMLButtonElement).disabled = Boolean(e.target.value === '');
});

$('#search-in-database').on('click', async () => {
    mccg.cmdPage.setblock.blockSelectButtonClicked = true;
    $('#search-in-database')[0].innerHTML = '重新查询';
    const inputValue = ($('#block input') as JQuery<HTMLInputElement>).val();
    let selectedBlock = mccg.cmdPage.setblock.selectedBlock;
    if (selectedBlock === void 0)
        mccg.cmdPage.setblock.selectedBlock = {
            name: '',
            id: '',
            easterEgg: {
                times: 1,
                value: ''
            }
        };
    if (!mccg.cmdPage.setblock.idBlockMap) {
        let res: Awaited<typeof import('datas')>['idBlockMap'];
        try {
            res = (await import('datas')).idBlockMap;
        } catch (e) {
            console.group('失败原因');
            console.error(e);
            console.log('错误对象: ');
            console.dir(e);
            console.log('在控制台输入"copyError"并回车以复制错误报告寻求他人帮助而不是发送截图')
            console.groupEnd();
            alert('数据库加载失败, 打开控制台查看详情');
            mccg.temp.errorReport = mccg.generateErrorReport(e, 'Failed to load file (maybe because the network exception): datas.js')
            return;
        }
        mccg.cmdPage.setblock.idBlockMap = res;
    }
    const idBlockMap = mccg.cmdPage.setblock.idBlockMap;
    selectedBlock = mccg.cmdPage.setblock.selectedBlock;
    $('#block-reset')[0].hidden = false;
    if (Object.values(idBlockMap).includes(inputValue)) {
        selectedBlock.name = inputValue;
        selectedBlock.id = idBlockMap[($('#block input') as JQuery<HTMLInputElement>).val()];
        
        if (inputValue === selectedBlock.easterEgg.value) {
            selectedBlock.easterEgg.times++;
            if (selectedBlock.easterEgg.times >= 3) {
                alert('你按你妹呢');
                selectedBlock.easterEgg.times = 0;
                return;
            }
        }
        alert('成功');
    } else
        ($('#not-found-in-database')[0] as HTMLDialogElement).showModal();
    selectedBlock.easterEgg.value = inputValue;
});
$('#not-found-in-database-input-id').on('click', () => {
    ($('#not-found-in-database')[0] as HTMLDialogElement).close();
    mccg.cmdPage.setblock.inputNamespaceId();
});
$('#not-found-in-database-keep-search').on('click', () => {
    window.open(`http://mcid.lingningyu.cn/?searchName=${mccg.cmdPage.setblock.selectedBlock.name}`, '_blank');
    mccg.cmdPage.setblock.inputNamespaceId();
    const input = $('#block input')[0] as HTMLInputElement;
    input.placeholder = '哥们复制个ID啊别干愣着';
    input.style.width = '25ch';
    const pasteHandler = () => {
        input.style.removeProperty('width');
        $(input).off('paste', pasteHandler);
    };
    $(input).on('paste', pasteHandler);
    ($('#not-found-in-database')[0] as HTMLDialogElement).close();
});
$('#not-found-in-database-cancel').on('click', () => {
    ($('#not-found-in-database')[0] as HTMLDialogElement).close();
    ($('#block input')[0] as HTMLInputElement).value = '';
});
$('#directly-input-namespace-id').on('click', () => mccg.cmdPage.setblock.inputNamespaceId());
$('#block-reset').on('click', (e) => {
    const input = $('#block input')[0] as HTMLInputElement;
    const schInDatabase = $('#search-in-database')[0] as HTMLButtonElement;
    input.placeholder = '方块名';
    input.value = '';
    schInDatabase.hidden = false;
    schInDatabase.innerHTML = '在数据库里查询';
    schInDatabase.disabled = true;
    $('#directly-input-namespace-id')[0].hidden = false;
    mccg.cmdPage.setblock.blockSelectButtonClicked = false;
    e.target.hidden = true;
});
// @ts-ignore
$('#block-state-switch').on('change', (e: MccgTypes.EventTargetType<HTMLInputElement>) => {
    $('.block-state-input').each((i) => { $('.block-state-input')[i].hidden = !e.target.checked });
});
// @ts-ignore
$('#block-state-table tbody input').on('input', mccg.cmdPage.setblock.onBlockStateInput);

$('#block-state-add').on('click', () => {
    $('#block-state-table tbody')[0].appendChild(mccg.cmdPage.setblock.TRElement);
    mccg.cmdPage.setblock.TRElement = mccg.cmdPage.setblock.TRElement.cloneNode(true);
    mccg.cmdPage.setblock.TRElement.addEventListener('input', mccg.cmdPage.setblock.onBlockStateInput);
});