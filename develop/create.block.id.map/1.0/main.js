// @ts-nocheck
/** @type {Map<string, string>} blockIdMap */
let blockIdMap = new Map();
let tbody = document.querySelector('table tbody');
let trs = tbody.querySelectorAll('tr');
let trlength = trs.length;
for (let i = 0; i < trlength; i++) {
    let td = trs[i].querySelectorAll('td');
    blockIdMap.set(td[1].querySelector('a').textContent, 'minecraft:' + td[2].querySelector('code').textContent);
}
console.log(blockIdMap);
console.log(JSON.stringify(Object.fromEntries(blockIdMap)));