import { Lightning } from '@lightningjs/sdk'

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
}
