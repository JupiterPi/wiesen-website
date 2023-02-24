// ---------- copied from code repository from https://medium.com/wizdm-genesys/rendering-markdown-in-angular-37750d124247 ----------

const unified = require('unified');
const parse = require('remark-parse');
const subSuper = require('remark-sub-super');
const align = require('remark-align');

export function reparseFactory(options: any) {
  return unified.unified()
    .use(parse, options)
    .use(subSuper)
    .use(align)
    .freeze();
}
