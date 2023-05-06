export function handleUnlockedVideo(dispatch, lessonRef) {
  dispatch({ type: "setVideoUrl", payload: lessonRef.current.link });
  dispatch({ type: "setIsEnded", payload: false });
  dispatch({ type: "setLockedContent", payload: false });
}

export function handleLockedVideo(dispatch) {
  dispatch({ type: "setIsLocked", payload: true });
  dispatch({ type: "setIsEnded", payload: false });
  dispatch({ type: "setVideoUrl", payload: "" });
}
