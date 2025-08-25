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
    if (selectedBlock === null)
        mccg.cmdPage.setblock.selectedBlock = {
            name: '',
            id: '',
            easterEgg: {
                times: 1,
                value: ''
            }
        };

    let found = true;
    let result: string;

    try {
        result = (await fetch(`/api/block-name-id-map?name=${inputValue}`).then(resp => {
            if (resp.status === 404) {
                found = false;
            } else if (resp.status !== 200) {
                throw new Error(`Failed to fetch api: block-name-id-map, status code: ${resp.status}`);
            } else {
                return resp.json();
            }
        }))?.id;
    } catch (e) {
        console.group('失败原因');
        console.error(e);
        console.log('错误对象: ');
        console.dir(e);
        console.log('在控制台输入"copyError"并回车以复制错误报告寻求他人帮助而不是发送截图')
        console.groupEnd();
        alert('api请求失败，请查看控制台以获取更多信息');
        mccg.temp.errorReport = mccg.generateErrorReport(e, 'Failed to fetch api (maybe because the network exception): block-name-id-map');
        return;
    }

    if (!found) {
        ($('#not-found-in-database')[0] as HTMLDialogElement).showModal();
        return;
    }
    selectedBlock = mccg.cmdPage.setblock.selectedBlock;
    $('#block-reset')[0].hidden = false;
    selectedBlock.name = inputValue;
    selectedBlock.id = result;

    if (inputValue === selectedBlock.easterEgg.value) {
        selectedBlock.easterEgg.times++;
        if (selectedBlock.easterEgg.times >= 3) {
            alert('你按你妹呢');
            selectedBlock.easterEgg.times = 0;
            return;
        }
    }
    alert('成功');
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