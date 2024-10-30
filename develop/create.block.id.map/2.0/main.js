document.querySelector('form').addEventListener('submit', (e) => {
    e.preDefault();
    /** @type {Array} arr */
    let arr = JSON.parse(document.querySelector('input').value);
    let result = new Map();
    arr.forEach((value) => {
        result.set(value.name, value.ID);
    });
    console.log(result);
});