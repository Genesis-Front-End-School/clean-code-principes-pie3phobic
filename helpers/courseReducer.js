export function reducer(state, action) {
  switch (action.type) {
    case "setVideoUrl":
      return { ...state, videoUrl: action.payload };
    case "setNowPlaying":
      return { ...state, nowPlaying: action.payload };
    case "setLockedContent":
      return { ...state, lockedContent: action.payload };
    case "setIsPlaying":
      return { ...state, isPlaying: action.payload };
    case "setIsEnded":
      return { ...state, isEnded: action.payload };
    case "setIsReady":
      return { ...state, isReady: action.payload };
    default:
      throw new Error();
  }
}
