// @ts-ignore
$('#block input').on('input', (e: MccgTypes.EventTargetType<HTMLInputElement>) => {
    if (mccg.cmdPage.setblock.blockSelectButtonClicked === true) 
        return;
    if (e.target.value === '')
        ($('#block input')[0] as HTMLInputElement).placeholder = '方块名';
    ($('#search-in-database')[0] as HTMLButtonElement).disabled = e.target.value === '' ? true : false;
});

$('#search-in-database').on('click', () => {
    mccg.cmdPage.setblock.blockSelectButtonClicked = true;
    $('#search-in-database')[0].innerHTML = '重新查询';
    const blockIdMap = mccg.cmdPage.setblock.blockIdMap;
    let selectedBlock = mccg.cmdPage.setblock.selectedBlock;
    if (selectedBlock === void 0)
        mccg.cmdPage.setblock.selectedBlock = {
            name: '',
            id: ''
        };
    selectedBlock = mccg.cmdPage.setblock.selectedBlock;
    $('#block-reset')[0].hidden = false;
    selectedBlock.name = ($('#block input') as JQuery<HTMLInputElement>).val();
    if (blockIdMap.has(($('#block input') as JQuery<HTMLInputElement>).val())) {
        selectedBlock.id = blockIdMap.get(($('#block input') as JQuery<HTMLInputElement>).val());
    } else
        ($('#not-found-in-database')[0] as HTMLDialogElement).showModal();
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