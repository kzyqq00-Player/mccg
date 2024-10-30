/// <reference types="jquery" />

/* function blockStateUListElementGenerator() {
    let result = document.createElement('ul');
    result.classList.add('no-prefix-list');
    for (let keyValuePairs of mcCmdGeneratorExternal.blockStates) {
        let li = document.createElement('li');
        /// @ts-expect-error
        li.innerHTML = `<section><input type="text" class="block-state-key" value="${keyValuePairs.key}"><input type="text" class="block-state-value" value="${keyValuePairs.value}"></section>`;
    }
    return result;
} */
$('#path img').on('click', () => mccg.backToHomePage.call(mccg));
$($('#path a')[0]).on('click', () => mccg.backToHomePage.call(mccg));