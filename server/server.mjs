import { readFile } from 'fs/promises';
import mime from 'mime';
import http from 'http';
import chardet from 'chardet';
import {ServerResponse} from "node:http";

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

/**
 * @type {Record<string, <TServerResponse extends typeof ServerResponse = typeof ServerResponse>(path: string, searchParams: URLSearchParams, res: TServerResponse) => void>}
 */
const pathHandlers = {
    'block-name-id-map': async (path, searchParams, res) => {
        const name = searchParams.get('name');
        res.setHeader('Content-Type', 'application/json');
        if (!name) {
            res.statusCode = 400;
            res.end(JSONStringifyWithNonEnumerable({
                'msg': 'name is required'
            }));
        }

        const blockNameIdMap = JSON.parse((await readFile('block-name-id-map.json')).toString());
        if (blockNameIdMap[name]) {
            res.statusCode = 200;
            res.setHeader('Cache-Control', 'max-age=604800');
            res.end(JSONStringifyWithNonEnumerable({
                'id': blockNameIdMap[name]
            }));
        } else {
            res.statusCode = 404;
            res.end(JSONStringifyWithNonEnumerable({
                'msg': 'block not found'
            }));
        }
    },
}

process.on('uncaughtException', e => {
    if (globalRes) {
        reply500(globalRes, e);
    }
    console.error(e);
});

/**
 * @type {http.ServerResponse}
 */
let globalRes;
const server = http.createServer(async (req, res) => {
    globalRes = res;
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

    if (req.url.startsWith('/api/')) {
        const url = new URL(req.url, `http://${hostname}`);
        const path = url.pathname.slice(5);

        const handler = pathHandlers[path];
        if (handler) {
            handler(path, url.searchParams, res);
            return;
        } else {
            res.statusCode = 404;
            res.end(JSONStringifyWithNonEnumerable({
                'msg': 'unknown api path'
            }));
        }
    }

    res.end(await readFile('../' + filepath)
        .then(data => {
            const encoding = chardet.detect(data);

            res.setHeader('Content-Type', mime.getType(filepath).concat(encoding ? '; charset=' + encoding : ''));
            res.setHeader('Cache-Control', 'no-cache');

            return data;
        })
        .catch(e => {
            if (e.errno === -4058) {
                res.statusCode = 404;
            } else {
                reply500(res, e);
            }
        }));

    console.log(' |', res.statusCode);
    globalRes = null;
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});