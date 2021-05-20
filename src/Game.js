import { Lightning } from '@lightningjs/sdk'

export default class Game extends Lightning.Component {
  static _template() {
    return {
      Game: {
        PlayerPosition: {
          rect: true,
          w: 250,
          h: 250,
          color: 0x40ffffff,
          x: 425,
          y: 125,
        },
        Field: {
          x: 400,
          y: 100,
          children: [
            { rect: true, w: 1, h: 5, y: 300 },
            { rect: true, w: 1, h: 5, y: 600 },
            { rect: true, h: 1, w: 5, x: 300, y: 0 },
            { rect: true, h: 1, w: 5, x: 600, y: 0 },
          ],
        },
        Markers: {
          x: 400,
          y: 100,
        },
        ScoreBoard: {
          x: 100,
          y: 170,
          Player: {
            text: { text: 'Player 0', fontSize: 29, fontFace: 'Regular' },
          },
          Ai: { y: 40, text: { text: 'Computer 0', fontSize: 29, fontFace: 'Regular' } },
        },
      },
      Notification: {
        x: 100,
        y: 170,
        text: { fontSize: 70, fontFace: 'Regular' },
        alpha: 0,
      },
    }
  }

  // Lifecycle event _construct
  _construct() {
    // current player tile index
    this._index = 0

    // computer score
    this._aiScore = 0

    // player score
    this._playerScore = 0
  }

  // The lifecycle event active will be called when a component visible property is true,
  // alpha higher then 0 and positioned in the renderable screen.
  _active() {
    this._reset()

    // we iterate over the outlines of the field and do a nice
    // transition of the width / height, so it looks like the
    // lines are being drawn realtime.

    this.tag('Field').children.forEach((el, idx) => {
      el.setSmooth(idx < 2 ? 'w' : 'h', 900, { duration: 0.7, delay: idx * 0.15 })
    })
  }

  // Metodi

  _reset() {
    // reset tiles
    this._tiles = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']

    // force render
    this.render(this._tiles)

    // change back to rootstate
    this._setState('')
  }

  render(tiles) {
    this.tag('Markers').children = tiles.map((el, idx) => {
      return {
        x: (idx % 3) * 300 + 110,
        // Nota: ~~ equivale ad un Math.floor() per numeri positivi
        y: ~~(idx / 3) * 300 + 90,
        text: { text: el === 'e' ? '' : `${el}`, fontSize: 100 },
      }
    })
  }

  // On remotecontrol up
  _handleUp() {
    let idx = this._index
    if (idx - 3 >= 0) {
      this._setIndex(idx - 3)
    }
  }

  // On remotecontrol down
  _handleDown() {
    let idx = this._index
    if (idx + 3 <= this._tiles.length - 1) {
      this._setIndex(idx + 3)
    }
  }

  // On remotecontrol left
  _handleLeft() {
    const idx = this._index
    if (idx % 3) {
      this._setIndex(idx - 1)
    }
  }

  // On remotecontrol right
  _handleRight() {
    const newIndex = this._index + 1
    if (newIndex % 3) {
      this._setIndex(newIndex)
    }
  }

  // Metodo
  _setIndex(idx) {
    this.tag('PlayerPosition').patch({
      smooth: {
        x: (idx % 3) * 300 + 425,
        y: ~~(idx / 3) * 300 + 125,
      },
    })
    this._index = idx
  }

  // On remotecontrol enter
  _handleEnter() {
    if (this._tiles[this._index] === 'e') {
      if (this.place(this._index, 'X')) {
        this._setState('Computer')
      }
    }
  }

  //Metodo
  place(index, marker) {
    this._tiles[index] = marker
    this.render(this._tiles)

    const winner = Utils.getWinner(this._tiles)
    if (winner) {
      this._setState('End.Winner', [{ winner }])
      return false
    }

    return true
  }
}
