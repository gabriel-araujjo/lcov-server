import React from 'react';
const vsctm = require('monaco-textmate');
import './fileView.css'

const includePlaceHolder = [ 'ph-8', 'ph-10' ];
const typeDeclarationPlaceHolder = [
  [ 'ph-4', 'ph-5', 'ph-4', 'ph-1' ],
  [ 'id-1', 'ph-4' ],
  [ 'id-1', 'ph-8' ],
  [ 'id-1', 'ph-6' ],
  [ 'id-1', 'ph-7' ],
  [ 'ph-2' ]
];

const bigFuncPlaceHolder = [
  [ 'ph-4', 'ph-14', 'ph-5', 'ph-3', 'ph-6', 'ph-1' ],
  [
    'id-1', 'ph-2', 'ph-5', 'ph-2', 'ph-13', 'ph-2', 'ph-5', 'ph-1', 'ph-1',
    'ph-2', 'ph-4', 'ph-2', 'ph-13', 'ph-2', 'ph-5', 'ph-1', 'ph-5'
  ],
  [ 'id-2', 'ph-9', 'ph-2', 'ph-3', 'ph-4', 'ph-2', 'ph-5' ],
  [ 'ph-0' ],
  [ 'id-1', 'ph-12', 'ph-1' ],
  [ 'id-1', 'ph-4', 'ph-10' ],
  [ 'id-2', 'ph-9', 'ph-2', 'ph-6', 'ph-5' ],
  [ 'id-2', 'ph-6' ],
  [ 'id-1', 'ph-4', 'ph-12' ],
  [ 'id-2', 'ph-9', 'ph-2', 'ph-6', 'ph-5' ],
  [ 'id-2', 'ph-6' ],
  [ 'id-1', 'ph-4', 'ph-14' ],
  [ 'id-2', 'ph-9', 'ph-2', 'ph-6', 'ph-5' ],
  [ 'id-2', 'ph-6' ],
  [ 'id-1', 'ph-8' ],
  [ 'id-2', 'ph-9', 'ph-2', 'ph-6', 'ph-5', 'ph-2', 'ph-8', 'ph-8', 'ph-2', 'ph-5' ],
  [ 'id-2', 'ph-6' ],
  [ 'id-1', 'ph-1' ],
  [ 'ph-1' ],
];

const smallFuncPlaceHolder = [
  [ 'ph-3', 'ph-6', 'ph-1' ],
  [ 'id-1', 'ph-10' ],
  [ 'id-1', 'ph-10' ],
  [ 'id-1', 'ph-10' ],
  [ 'id-1', 'ph-10' ],
  [ 'id-1', 'ph-10' ],
  [ 'id-1', 'ph-10' ],
  [ 'id-1', 'ph-6', 'ph-2' ],
  [ 'ph-1' ]
];

function *phLines() {
  yield includePlaceHolder;
  yield [];
  for (let i = 0; i < 3; ++i) {
    yield includePlaceHolder;
  }
  yield [];
  for (const line of typeDeclarationPlaceHolder) {
    yield line;
  }
  yield [];
  for (const line of bigFuncPlaceHolder) {
    yield line;
  }
  yield [];
  for (const line of smallFuncPlaceHolder) {
    yield line;
  }
  yield [];
}

export function FileView ({tokenizedFile, lineCoverage}) {
  function* lines() {
    for (const l of tokenizedFile) {
      yield renderLineOfCode(l);
    }
  }
  const rendered = [...renderLines(lines(), lineCoverage)];
  return <pre><code>{rendered}</code></pre>;
}

FileView.tokenizeFile = async function(blob) {
  const registry = await window.syntaxHighlightRegistry;
  const grammar = await registry.loadGrammar('source.cpp');
  return lines(grammar, blob);
}

export function FileViewPlaceHolder() {
  function* placeHolder() {
    for (const l of phLines()) {
      yield l.map(s => {
        const [className, width] = s.split('-');
        return <span className={className} data-ph-width={width}/>;
      });
    }
  }
  const rendered = [
    ...renderLines(placeHolder(), []),
    <span className='lnum ph-end' data-line-number='...'/>,
    <span className='line-hit ph-end'/>,
    <span className='lcode ph-end'/>,
  ];
  return <pre className='code-ph'><code>{rendered}</code><div className='ph-anim'/></pre>;
}

function* explodedLineCoverage(cov) {
  const itCov = cov[Symbol.iterator]();
  let lnum = -1;
  let cur = itCov.next();
  let begin = cur.value && cur.value[0];
  while (true) {
    ++lnum;
    const [clno, hit, bct, bex] = cur.value || [];
    if (cur.done || lnum != clno) {
      yield [];
      continue;
    }
    let className = bct != bex
      ? !bex ? 'mis' : 'par'
      : 'ok';
    cur = itCov.next();
    if (begin == clno) className += ' begin';
    if (!cur.value || cur.value[0] != clno + 1) {
      className += ' end';
      begin = cur.value && cur.value[0];
    }
    yield [hit, bct, bex, className];
  }
}

function* renderLines(lines, cov) {
  const itLines = lines[Symbol.iterator]();
  const itCoverage = explodedLineCoverage(cov)[Symbol.iterator]();
  let lnum = 0;

  while (true) {
    const line = itLines.next();
    let [hit, bct, bex, coverageStatus=''] = itCoverage.next().value;
    if (line.done) break;
    let hits = '';
    if (coverageStatus) {
      coverageStatus = ' ' + coverageStatus;
      hits = <span class='hit-bg'><span className='hit' data-hit={hit}/></span>;
    }
    yield <span className={`lnum${coverageStatus}`} data-line-number={lnum+1}/>;
    yield <span className={`line-hit${coverageStatus}`}>{hits}</span>;
    yield <span className={`lcode${coverageStatus}`}>
      {line.value}
      {
        bct != bex 
        ? <span className='count' data-bct={bct} data-bex={bex} />
        : []
      }
      {'\n'}
    </span>;
    ++lnum;
  }
}

function* renderLineOfCode(line) {
  let content, className;
  const rendered = () => {
    if (!className) return content;
    return <span className={`${className}`}>{content}</span>;
  }
  for (const [elContent, elClassName] of line) {
    if (className == elClassName) {
      content += elContent;
      continue;
    }
    if (content) yield rendered();
    content = elContent;
    className = elClassName;
  }
  if (content) yield rendered();
}

const styleMap = {
  character: 'a',
  class: 'b',
  constant: 'c',
  comment: 'd',
  entity: 'e',
  name: 'g',
  storage: 'h',
  'inherited-class': 'i',
  support: 'j',
  keyword: 'k',
  language: 'l',
  tag: 'm',
  numeric: 'n',
  other: 'o',
  parameter: 'p',
  'scope-resolution': 'q',
  string: 's',
  type: 't',
  variable: 'v'
};

const validKeys = new Set(Object.keys(styleMap));

function rationalizeTokens(tokens) {
  const set = new Set();
  let i;
  for (i = 1; i < tokens.length; ++i) {
    for (let token of tokens[i].split('.')) {
      if (validKeys.has(token)) set.add(token);
    }
  }
  return [...set].map(t => styleMap[t] || t).sort().join(' ');
}

function* lines(grammar, file) {
  let ruleStack = vsctm.INITIAL;
  for (const line of file.split(/\n|\r\n|\r/)) {
    const lineTokens = grammar.tokenizeLine(line, ruleStack);
    yield lineTokens.tokens.map(
        token => [line.substring(token.startIndex, token.endIndex),
                  rationalizeTokens(token.scopes)]);
    ruleStack = lineTokens.ruleStack;
  }
}
