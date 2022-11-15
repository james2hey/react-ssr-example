import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {StaticRouter} from "react-router-dom/server";
import App from "./src/App";
import path from "path";
import fs from "fs";
import {ServerStyleSheet} from "styled-components";

const app = express();

// Don't send the default index.html
app.use(express.static('./build', { index: false }))

app.get('/*', (req, res) => {
    const sheet = new ServerStyleSheet();

    const reactApp = renderToString(
        sheet.collectStyles(
            <StaticRouter location={req.url}>
                <App />
            </StaticRouter>
        )
    );

    const templateFile = path.resolve('./build/index.html');
    fs.readFile(templateFile, 'utf8', (error, data) => {
        if (error) return res.status(500);
        return res.send(
            data
                .replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
                .replace('{{ styles }}', sheet.getStyleTags()))
    })
});

const port = 8080;

app.listen(port, () => {
    console.log(`Server is listening on ${port}.`);
})
