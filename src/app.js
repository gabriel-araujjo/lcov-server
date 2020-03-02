import 'normalize.css';
import './style.css';
import {loadWASM} from 'onigasm'
const vsctm = require('monaco-textmate');

window.syntaxHighlightRegistry = (async () => {
  // load onigasm
  await loadWASM('/onigasm.wasm')

  // create registry
  const registry = new vsctm.Registry({
    getGrammarDefinition : async scopeName => {
      let grammar;
      switch (scopeName) {
      case 'source.cpp':
        grammar = '/cpp.tmLanguage.json';
        break;
      case 'source.cpp.embedded.macro':
        grammar = '/cpp.embedded.macro.tmLanguage.json';
        break;
      default:
        // ivalid language
        return null;
      }
      const resp = await fetch(grammar);
      const grammarContent = await resp.json();
      return {format : 'json', content : grammarContent};
    }
  });

  // Warm up registry
  await registry.loadGrammar('source.cpp');
  console.log('CPP Grammar pre-loaded');
  return registry;
})();

import {render} from 'react-dom';
import routes from './router';

render(routes, document.querySelector('#root'));
