import xs from 'xstream'
import {h1} from '@cycle/dom'

function getLastChildColor (tree) {
  return (tree.children && tree.children.length && getLastChildColor(tree.children[0])) || tree.color
}

function view(state$) {
  return state$
    .map((state) => {
//console.log(state)
      var cc = getLastChildColor(state)
      localStorage.setItem('lastcolor', localStorage.getItem('lastcolor') + ',' + cc)
      return h1('color: ' + cc + ' ' + state.viewcolor)
    })
}

export default function Header(sources) {
  const state$ = sources.onion.state$
  const vdom$ = view(state$)
  return {
    DOM: vdom$,
  }
}
