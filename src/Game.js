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
}
