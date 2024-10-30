// @ts-ignore
$('#block input').on('input', (e: EleEve<HTMLInputElement>) => {
    if (mccg.cmdPage.setblock.blockSelectButtonClicked == true) 
        return;
    if (e.target.value === '')
        ($('#block input')[0] as HTMLInputElement).placeholder = '方块名';
    ($('#search-in-database')[0] as HTMLButtonElement).disabled = e.target.value === '' ? true : false;
});

$('#search-in-database').on('click', () => {
    mccg.cmdPage.setblock.selectedBlock.name = ($('#block input') as JQuery<HTMLInputElement>).val();
    mccg.cmdPage.setblock.blockSelectButtonClicked = true;
    $('#search-in-database')[0].innerHTML = '重新查询';
    const blockIdMap = mccg.cmdPage.setblock.blockIdMap;
    $('#block-reset')[0].hidden = false;
    if (blockIdMap.has(($('#block input') as JQuery<HTMLInputElement>).val()))
        mccg.cmdPage.setblock.selectedBlock.id = blockIdMap.get(($('#block input') as JQuery<HTMLInputElement>).val());
    else
        ($('#not-found-in-database')[0] as HTMLDialogElement).showModal();
});
$('#not-found-in-database-input-id').on('click', () => {
    ($('#not-found-in-database')[0] as HTMLDialogElement).close();
    mccg.cmdPage.setblock.inputNamespaceId.call(mccg);
});
$('#not-found-in-database-cancel').on('click', () => {
    ($('#not-found-in-database')[0] as HTMLDialogElement).close();
    ($('#block input')[0] as HTMLInputElement).value = '';
});
$('#directly-input-namespace-id').on('click', () => mccg.cmdPage.setblock.inputNamespaceId.call(mccg));
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
/* $('#block-state-switch').on('change', (e) => {
    if (e.target.checked == true) {
        let result = mcCmdGenerator.cmdPage.setblock.blockStatesDivElementCache;
        for (let index = 0; index < mcCmdGenerator.cmdPage.setblock.blockStates.length; index++) {
            const element = mcCmdGenerator.cmdPage.setblock.blockStates[index];
            
        }
        if (mcCmdGenerator.cmdPage.setblock.blockStates.length == 0) {
            result.innerHTML =
            `键：<input type="text" class="block-states-keys block-states-inputs">
            值：<input type="text" class="block-states-values block-states-inputs">`;
        }
        for (let key of mcCmdGenerator.cmdPage.setblock.blockStates) {
            
        }
    }
}); */