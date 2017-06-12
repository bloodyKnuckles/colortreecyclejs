import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
import onionify from 'cycle-onionify'
import FolderApp from './FolderApp'

const main = onionify(FolderApp)

run(main, {
  DOM: makeDOMDriver('#app')
})
