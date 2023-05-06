import VideoPlayer from "../VideoPlayer";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import React, { useRef, useState, useReducer, useCallback } from "react";

import { Action, State, reducer } from "../../helpers/courseReducer";

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

const initialState = {
  videoUrl: "some-url",
  nowPlaying: "Course Intro",
  lockedContent: false,
  isPlaying: true,
  isEnded: false,
  isReady: false,
};

jest.mock("react-player", () => {
  const mockPlayer = ({
    url,
    onEnded,
    playing,
    onReady,
    muted,
    controls,
    onProgress,
    getDuration,
  }) => {
    const duration = 10; // set a mock duration value
    return (
      <div data-testid="react-player-mock">
        <p>url: {url}</p>
        <p>playing: {playing.toString()}</p>
        <p>muted: {muted.toString()}</p>
        <p>controls: {controls.toString()}</p>
        <p>duration: {duration}</p> {/* display the mock duration */}
      </div>
    );
  };

  return mockPlayer;
});

describe("VideoPlayer", () => {
  test("renders the ReactPlayer with correct props", () => {
    interface PlayerElement extends HTMLVideoElement {
      seekTo: (timestamp: number) => void;
    }
    const url = "https://example.com/video.mp4";
    const { getByTestId } = render(
      <VideoPlayer url={url} initialState={initialState} />
    );
    const reactPlayerMock = getByTestId("react-player-mock");
    expect(reactPlayerMock).toBeInTheDocument();
    expect(reactPlayerMock).toHaveTextContent(`url: ${url}`);
    expect(reactPlayerMock).toHaveTextContent("playing: true");
    expect(reactPlayerMock).toHaveTextContent("muted: false");
    expect(reactPlayerMock).toHaveTextContent("controls: true");
  });
  //   test("stores and retrieves video duration from localStorage", async () => {
  //     const url = "https://example.com/video.mp4";
  //     const duration = 10;

  //     // Mock the getDuration method of the playerRef
  //     const getDurationMock = jest.fn(() => duration);
  //     const playerRef = {
  //       current: {
  //         props: { url },
  //         getDuration: getDurationMock,
  //         seekTo: jest.fn(),
  //         play: jest.fn(),
  //       },
  //     };

  //     // Render the VideoPlayer component
  //     const { getByTestId } = render(
  //       <VideoPlayer url={url} initialState={initialState} />
  //     );

  //     // Wait for the component to be ready
  //     await waitFor(() => {
  //       expect(playerRef.current).toBeDefined();
  //       expect(playerRef.current.getDuration).toBe(getDurationMock);
  //     });

  //     // Seek to a timestamp and trigger the onProgress callback
  //     const timestamp = 5;
  //     act(() => {
  //       console.log(playerRef.current);
  //       playerRef.current.seekTo(timestamp, "seconds");
  //       fireEvent(
  //         playerRef.current,
  //         new Event("progress", {
  //           bubbles: true,
  //           cancelable: true,
  //         })
  //       );
  //     });

  //     // Check if the video duration was stored in localStorage
  //     const storedDurations = JSON.parse(
  //       window.localStorage.getItem("videoDurations")
  //     );
  //     expect(storedDurations[url]).toBe(timestamp);

  //     // Reload the component
  //     render(<VideoPlayer url={url} initialState={initialState} />);

  //     // Wait for the component to be ready
  //     await waitFor(() => {
  //       expect(playerRef.current).toBeDefined();
  //       expect(playerRef.current.getDuration).toBe(getDurationMock);
  //     });

  //     // Check if the video duration was retrieved from localStorage
  //     expect(playerRef.current.seekTo).toHaveBeenCalledWith(timestamp, "seconds");
  //     expect(playerRef.current.play).toHaveBeenCalled();
  //   });

    // test("onEnded callback sets isEnded to true if video has ended", () => {
    //   const mockDispatch = jest.fn();
    //   const { getByTestId } = render(
    //     <VideoPlayer
    //       url="test.mp4"
    //       initialState={initialState}
    //       // dispatch={mockDispatch}
    //     />
    //   );
    //   const reactPlayerMock = getByTestId("react-player-mock");

    //   // Trigger the onEnded callback
    //   act(() => {
    //     fireEvent(reactPlayerMock, new Event("ended"), { currentTime: 10 });
    //   });

    //   // Assert that setIsEnded was called with the expected payload
    //   expect(mockDispatch).toHaveBeenCalledWith({
    //     type: "setIsEnded",
    //     payload: true,
    //   });
    //   // Assert that the console.log statement outputs the expected value
    //   expect(console.log).toHaveBeenCalledWith(true);
    // });
  //   test("onReady callback sets isReady to true and seeks to the correct timestamp", async () => {
  //     // Mock the localStorage to store the video duration
  //     const videoDurations = { "https://example.com/video.mp4": 20 };
  //     window.localStorage.setItem(
  //       "videoDurations",
  //       JSON.stringify(videoDurations)
  //     );

  //     // Render the VideoPlayer component
  //     const url = "https://example.com/video.mp4";
  //     const playerRef = { current: null };
  //     const dispatch = jest.fn();
  //     const onReady = jest.fn();
  //     const { getByTestId } = render(
  //       <VideoPlayer
  //         url={url}
  //         playerRef={playerRef}
  //         initialState={initialState}
  //       />
  //     );

  //     // Wait for the video player to be ready
  //     await waitFor(() =>
  //       expect(screen.getByTestId("react-player-mock")).toBeInTheDocument()
  //     );

  //     // Check that setIsReady was called with the correct payload
  //     expect(dispatch).toHaveBeenCalledWith({
  //       type: "setIsReady",
  //       payload: true,
  //     });

  //     // Check that the player seeked to the correct timestamp
  //     expect(playerRef.current?.seekTo).toHaveBeenCalledWith(20, "seconds");
  //   });
});
