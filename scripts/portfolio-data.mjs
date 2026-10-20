import {readFileSync} from 'node:fs';
/** Read the explicitly JSON-formatted data literals without evaluating TypeScript. */
export function readPortfolioLiteral(file,name){
 const text=readFileSync(new URL('../src/data/'+file,import.meta.url),'utf8');
 const start=text.indexOf('export const '+name);if(start<0)throw Error('Missing '+name);
 const equals=text.indexOf('=',start),end=text.indexOf(';\n',equals);
 if(end<0)throw Error('Missing data terminator for '+name);
 return JSON.parse(text.slice(equals+1,end));
}
export const portfolioProjects=readPortfolioLiteral('portfolio.ts','portfolioProjects');
export const projectResearch=readPortfolioLiteral('portfolio-research.ts','PROJECT_RESEARCH');
