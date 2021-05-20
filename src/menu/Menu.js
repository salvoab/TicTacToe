import { Lightning } from '@lightningjs/sdk'
import Item from './Item'

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      // we define a empty holder for our items and
      // position it 40px relative to the component position
      // so we have some space for our focus indicator
      Items: {
        x: 40,
      },
      // Create a text component that indicates which item has focus
      FocusIndicator: { y: 5, text: { text: '>', fontFace: 'Regular' } },
    }
  }

  // Hooks: _init = componente appena caricato, _active = componente attivo e visibile a schermo, _inactive = quando il componente non è attivo
  _init() {
    // create a blinking animation
    this._blink = this.tag('FocusIndicator').animation({
      duration: 0.5,
      repeat: -1,
      actions: [{ p: 'x', v: { 0: 0, 0.5: -40, 1: 0 } }],
    })

    // current focused menu index
    this._index = 0
  }

  _active() {
    this._blink.start()
  }

  _inactive() {
    this._blink.stop()
  }

  // creazione degli items
  set items(v) {
    // this.tag('Items').children mette l'array di oggetti creato con map all'interno del componente contenitore Items (a riga 10)
    this.tag('Items').children = v.map((el, idx) => {
      return { type: Item, action: el.action, label: el.label, y: idx * 90 }
    })
  }

  // restituisce il riferimento all'array di items contenuti nel componente contenitore Items
  get items() {
    return this.tag('Items').children
  }

  // restituisce l'item attivo ovvero quello a cui punta l'indice this._index
  get activeItem() {
    return this.items[this._index]
  }

  // metodo per settare l'indice dell'item su cui si vuole spostare il Focus
  _setIndex(idx) {
    // since it's a one time transition we use smooth
    this.tag('FocusIndicator').setSmooth('y', idx * 90 + 5)

    // store new index
    this._index = idx
  }

  _handleUp() {
    this._setIndex(Math.max(0, --this._index))
  }

  _handleDown() {
    this._setIndex(Math.min(++this._index, this.items.length - 1))
  }
}
