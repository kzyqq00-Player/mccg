import { readFile } from 'fs/promises';
import mime from 'mime';
import http from 'http';
import chardet from 'chardet';

const hostname = '127.0.0.1';
const port = 3000;

/**
 * @param {http.ServerResponse} res
 * @param {object} e
 */
function reply500(res, e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSONStringifyWithNonEnumerable(Object.assign(e, { '': 'Server Internal Throws Error' })));

    console.error(e);
}

/**
 * @param {object} obj
 */
function JSONStringifyWithNonEnumerable(obj) {
    let allProps = {};
    let keys = Reflect.ownKeys(obj);
    for (let key of keys) {
        allProps[key] = obj[key];
    }
    return JSON.stringify(allProps);
}

const server = http.createServer(async (req, res) => {
    try {
        const filepath = req.url.slice(1);
        process.stdout.write(req.method + ' ' + req.url);
        res.statusCode = 200;
    
        if (req.url === '/' || req.url === '') {
            res.statusCode = 302;
            res.setHeader('Location', '/index.html');
            res.end();
            console.log(' |', res.statusCode);
            return;
        }

        res.end(await readFile(filepath)
            .then(data => {
                const encoding = chardet.detect(data);

                res.setHeader('Content-Type', mime.getType(filepath).concat(encoding ? '; charset=' + encoding : ''));
                res.setHeader('Cache-Control', 'no-cache');

                return data;
            })
            .catch(e => {
                if (e.errno = -4058) {
                    res.statusCode = 404;
                } else {
                    reply500(res, e);
                }
            }));
        
        console.log(' |', res.statusCode);
    } catch (e) {
        reply500(res, e);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});