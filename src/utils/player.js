export const AUDIOS = {
  winner: '/audio/winner.wav',
  circle: '/audio/circle.wav',
  cross: '/audio/cross.wav',
  tie: '/audio/tie.wav',
  reset: '/audio/whip.wav'
}

export const playSound = audio => {
  try {
    // eslint-disable-next-line no-undef
    const sound = new Audio(audio)
    sound.play()
  } catch (error) {
    console.log(error)
  }
}
