// @ts-ignore
$('#block input').on('input', (e: EventTargetType<HTMLInputElement>) => {
    if (mccg.cmdPage.setblock.blockSelectButtonClicked == true) 
        return;
    if (e.target.value === '')
        ($('#block input')[0] as HTMLInputElement).placeholder = '方块名';
    ($('#search-in-database')[0] as HTMLButtonElement).disabled = e.target.value === '' ? true : false;
});

$('#search-in-database').on('click', () => {
    mccg.cmdPage.setblock.blockSelectButtonClicked = true;
    $('#search-in-database')[0].innerHTML = '重新查询';
    const blockIdMap = mccg.cmdPage.setblock.blockIdMap;
    $('#block-reset')[0].hidden = false;
    if (blockIdMap.has(($('#block input') as JQuery<HTMLInputElement>).val())) {
        mccg.cmdPage.setblock.selectedBlock.id = blockIdMap.get(($('#block input') as JQuery<HTMLInputElement>).val());
        mccg.cmdPage.setblock.selectedBlock.name = ($('#block input') as JQuery<HTMLInputElement>).val();
    } else
        ($('#not-found-in-database')[0] as HTMLDialogElement).showModal();
});
$('#not-found-in-database-input-id').on('click', () => {
    ($('#not-found-in-database')[0] as HTMLDialogElement).close();
    mccg.cmdPage.setblock.inputNamespaceId();
});
$('#not-found-in-database-cancel').on('click', () => {
    ($('#not-found-in-database')[0] as HTMLDialogElement).close();
    ($('#block input')[0] as HTMLInputElement).value = '';
});
$('#directly-input-namespace-id').on('click', () => mccg.cmdPage.setblock.inputNamespaceId());
$('#block-reset').on('click', (e) => {
    let input: HTMLInputElement = $('#block input')[0] as HTMLInputElement;
    let schInDatabase: HTMLButtonElement = $('#search-in-database')[0] as HTMLButtonElement;
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
$('#block-state-switch').on('change', (e: EventTargetType<HTMLInputElement>) => {
    $('.block-state-input').each((i) => { $('.block-state-input')[i].hidden = !e.target.checked });
});
// @ts-ignore
$('#block-state-table tbody input').on('input', mccg.cmdPage.setblock.onBlockStateInput);

$('#block-state-add').on('click', () => {
    $('#block-state-table tbody')[0].appendChild(mccg.cmdPage.setblock.TRElement);
    mccg.cmdPage.setblock.TRElement = mccg.cmdPage.setblock.TRElement.cloneNode(true) as any;
});