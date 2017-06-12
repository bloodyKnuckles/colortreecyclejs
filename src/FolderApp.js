import xs from 'xstream';
import isolate from '@cycle/isolate';
import {div, h1} from '@cycle/dom';
import Header from './Header';
import Folder from './Folder';

export default function FolderApp (sources) {
  const initReducer$ = xs.of(function initReducer(prevState) {
    if (typeof prevState === 'undefined') {
      return {id: 0, removable: false, children: []}
    } else {
      return prevState
    }
  })

  const c1Lens = {
    get: state => state,
    set: (state, childState) => childState
  };

  const h1Sinks = isolate(Header, {onion: c1Lens})(sources);
  const h1VDom = h1Sinks.DOM;

  const children1Sinks = isolate(Folder, {onion: c1Lens})(sources)
  const children1VDom = children1Sinks.DOM;
  const children1Reducer$ = children1Sinks.onion;

  const vdom$ = xs.combine(h1VDom, children1VDom)
    .map(([h1VNode, c1VNode]) =>
      div([
        h1VNode,
        c1VNode
      ])
    );

  const reducer$ = xs.merge(initReducer$, children1Reducer$);

  return {
    DOM: vdom$,
    onion: reducer$,
  }
}
