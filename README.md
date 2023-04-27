[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/SJ5YWrI-)

# SOLID

1. Refactored MiddleCard component so it`s not static and can be dinamically changed by passing different props.
2. Refactored Course.js page component, because it`s previous realisation was violating the SRP (single responcibility principle) as the page was responcible for managing the state of the video player as well as rendering the course data. Therefore, it should be separated into smaller components.

### **Changes to solve this problem:**

**1. Extracted the reducer function reducer(state, action) into a separate module (helpers/codeReducers.js), so that it can be reused in other parts of the application. This would make the Course component more focused on its primary responsibility of rendering the course content, and delegate the state management responsibility to the reducer function.**

```
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
```

**2. Extracted the handleUnlockedVideo and handleLockedVideo functions into a separate module (helpers/videoUtils.js), as they are responsible for handling the state changes related to locked and unlocked videos.**

```
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

```

**3. Extracted VideoPlayer component from Course.js page. It is responsible for rendering a ReactPlayer component and providing its functionality. It doesn't contain any additional logic that is not related to its main responsibility.**

```
import React, { useRef, useState, useReducer, useCallback } from "react";
import ReactPlayer from "react-player";
import { reducer } from "../helpers/courseReducer";

const VideoPlayer = ({ url, initialState }) => {
  const [played, setPlayed] = useState(0);
  const playerRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const onEnded = useCallback(() => {
    if (!state.isEnded) {
      if (playerRef.current.getDuration() === played) {
        dispatch({ type: "setIsEnded", payload: true });
        console.log(state.isEnded);
      }
    }
  }, [state.isEnded, state.played]);

  const onReady = useCallback(() => {
    const videoDurations =
      JSON.parse(window.localStorage.getItem("videoDurations")) || {};
    if (JSON.stringify(videoDurations) !== "{}") {
      let timestamp = videoDurations[playerRef.current.props.url];
      if (timestamp > 0) {
        playerRef.current.seekTo(timestamp, "seconds");
        playerRef.current.play();
      }
    }
    dispatch({ type: "setIsReady", payload: true });
  }, []);

  return (
    <ReactPlayer
      ref={playerRef}
      url={url}
      width="100%"
      onEnded={onEnded}
      playing={state.isPlaying}
      onReady={onReady}
      muted={false}
      controls={true}
      onProgress={(progress) => {
        setPlayed(progress.playedSeconds);
        const videoDurations =
          JSON.parse(window.localStorage.getItem("videoDurations")) || {};
        videoDurations[url] = played;
        window.localStorage.setItem(
          "videoDurations",
          JSON.stringify(videoDurations)
        );
      }}
    />
  );
};

export default VideoPlayer;

```

## Results:

By breaking down the responsibilities of the Course component into smaller, more focused modules or functions, I improved the readability, maintainability, and reusability of the codebase.

- handleUnlockedVideo() and handleLockedVideo() have a specific responsibility of updating the state based on whether the video is unlocked or locked.
- The Course component is responsible for rendering the course information and video player, and LessonCard is responsible for rendering the individual lesson information.
- The api and reducer files are also separated out and have their own specific responsibilities.

# GOF Patterns

### Changes in the fetchData.js:

**1. Implemented **Singleton** pattern with a **Factory method** used to create the singleton instance if it does not exist for API calls - before function fetchData() used to fetch accessToken every time we went to the courses.js page. Now we use 'ApiClient' class than will ensure that we have created only one instance of this class and every single time we have to make an API call the code will check if the instance of 'ApiClient' exists, if yes, the program is going to use it, if no, it will be created.**

**2. The 'getInstance' method is used to retrieve the same instance of the ApiClient class each time it's called. The getInstance() method can also be counted as a factory method because it creates an instance of the ApiClient class if one does not already exist.
The 'instance' property is used to store the singleton instance.**

```
import fetchAccessToken from "./accessToken";

class ApiClient {
  static instance;
  accessToken;
  refreshTokenTimeout;

  static async getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
      await ApiClient.instance.refreshToken();
    }
    return ApiClient.instance;
  }

  async refreshToken() {
    try {
      this.accessToken = await fetchAccessToken();
      // Clear the previous timeout to prevent memory leaks
      clearTimeout(this.refreshTokenTimeout);
      this.refreshTokenTimeout = setTimeout(() => {
        this.refreshToken();
      }, 3600 * 1000);
    } catch (error) {
      console.error("Error refreshing access token:", error);
      this.refreshTokenTimeout = setTimeout(() => {
        this.refreshToken();
      }, 60 * 1000);
    }
  }

  async fetchData() {
    try {
      const host = "http://api.wisey.app";
      const version = "api/v1";
      const res = await fetch(`${host}/${version}/core/preview-courses`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      const data = await res.json();
      return { data: data || null };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

export default ApiClient;

```

**3. The accessToken property uses incapsulation. The accessToken variable is private to the ApiClient class and can only be accessed within the class, so it is an example of encapsulation. By making the accessToken private, the implementation details of the ApiClient class are hidden from the outside world, and the implementation can be changed without affecting the code that uses the class.**

_Additional changes:_

- Adding a refreshTokenTimeout property to the ApiClient class to store the timeout ID, accessToken will be automatically refreshed every hour.
- Adding error handling to the refreshToken method to handle network errors and retry in case of errors, if there was a mistake while refreshing the accessToken, we will try to refresh it after 1 minute.
- Using clearTimeout to clear the previous timeout before scheduling the next refresh to prevent memory leaks.

## Results:

This will allow us to create a reusable and maintainable API client, making the code easy to use and test. By maintaining a single token instance, we avoid having to re-fetch and re-validate the token for each request, which can save time and reduce the load on the authentication server.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

npm i

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
