import SoundPlayer from 'react-native-sound';
import React, {useEffect, useState} from 'react';
import {Track} from '../discover.types';

type AudioStatusType =
  | 'loading'
  | 'success'
  | 'error'
  | 'play'
  | 'pause'
  | 'next'
  | 'previous'
  | 'stop';

interface IUseAudioHelper {
  isLogStatus?: boolean;
  listSounds: Track[];
  timeRate?: number;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

export function useAudioHelper(
  request: IUseAudioHelper = {
    isLogStatus: false,
    listSounds: [],
    timeRate: 15,
  },
) {
  const {listSounds, timeRate = 15} = request;

  const [player, setPlayer] = useState<SoundPlayer | null>(null);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<AudioStatusType>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [volume, setVolume] = useState(100); // percent
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const [remainingIndices, setRemainingIndices] = useState(
    [...Array(request.listSounds.length).keys()].filter(
      value => value !== index,
    ),
  );

  useEffect(function handleCurrentTime() {
    const interval = setInterval(() => {
      if (player && status === 'play') {
        player.getCurrentTime((seconds: number) => {
          setCurrentTime(seconds);
        });
      }
    }, 100);

    return () => clearInterval(interval);
  });

  function changeSpeed(value: number) {
    if (player && value > 0 && value <= 2) {
      player.setSpeed(value);
      setSpeed(value);
    }
  }

  function initialize() {
    setStatus('loading');
    if (listSounds.length > 0) {
      if (player) {
        player.release();
      }

      const callback = (
        error: {message: React.SetStateAction<string>},
        currentPlayer: SoundPlayer,
      ) => {
        if (error) {
          setStatus('error');
          setErrorMessage(error.message);
        } else {
          setStatus('success');
          setErrorMessage('');
        }
        currentPlayer.setSpeed(speed);
        setDuration(currentPlayer.getDuration());
        play(currentPlayer);
      };

      const url = listSounds[index].preview_url;
      // If the audio is a 'require' then the second parameter must be the callback.
      // case 'network':
      const newPlayer: SoundPlayer = new SoundPlayer(url, undefined, error =>
        callback(error, newPlayer),
      );
      if (newPlayer) {
        setPlayer(newPlayer);
      }
    }
  }

  useEffect(
    function init() {
      initialize();
    },
    // if we add 'initialize' as a dep, app will infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index],
  );

  function shuffle() {
    setIsShuffle(!isShuffle);
  }

  useEffect(
    function logStatus() {
      if (request.isLogStatus === true) {
        switch (status) {
          default:
            break;
          case 'loading':
            console.log('loading...');
            break;
          case 'next':
            console.log('next...');
            break;
          case 'pause':
            console.log('pause...');
            break;
          case 'play':
            console.log('play...');
            break;
          case 'previous':
            console.log('previous...');
            break;
          case 'stop':
            console.log('stop...');
            break;
        }
      }
    },
    [request.isLogStatus, status],
  );

  function playComplete(isEnd: boolean) {
    if (isEnd === true) {
      if (isLoop === false) {
        // next();
        stop();
      } else {
        repeat();
      }
    }
  }

  function repeat() {
    setCurrentTime(0);
    if (player) {
      play(player);
    }
  }

  function play(currentPlayer: SoundPlayer) {
    if (currentPlayer) {
      if (isMuted === true) {
        changeVolume(currentPlayer, 0);
      }
      currentPlayer.play(playComplete);
      setStatus('play');
    }
  }

  function pause() {
    if (player) {
      player.pause();
      setStatus('pause');
    }
  }

  function stop() {
    console.log('stop');
    if (player) {
      player.stop();
      setStatus('stop');
    }
  }

  useEffect(
    function handleRemainingIndices() {
      setRemainingIndices(remainingIndices.filter(value => value !== index));
    },
    // remainingIndices as a dep, will cause infinite looping
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index],
  );

  function next() {
    if (player && request.listSounds.length) {
      player.release();
      setCurrentTime(0);
      setStatus('next');

      if (isShuffle === true) {
        const newRemainingIndices = shuffleArray(
          remainingIndices.length === 0
            ? [...Array(request.listSounds.length).keys()].filter(
                value => value !== index,
              )
            : remainingIndices,
        );
        setRemainingIndices(newRemainingIndices);
        setIndex(newRemainingIndices[0]);
      } else {
        setIndex((index + 1) % request.listSounds.length);
      }
    }
  }

  function previous() {
    if (player && index > 0) {
      player.release();
      setCurrentTime(0);
      setStatus('previous');
      setIndex(index - 1);

      if (isShuffle === true) {
        const newRemainingIndices = shuffleArray(
          remainingIndices.length === 0
            ? [...Array(request.listSounds.length).keys()].filter(
                value => value !== index,
              )
            : remainingIndices,
        );
        setRemainingIndices(newRemainingIndices);
        setIndex(newRemainingIndices[0]);
      } else {
        setIndex(index - 1 >= 0 ? index - 1 : request.listSounds.length - 1);
      }
    }
  }

  function increaseTime() {
    if (player) {
      player.getCurrentTime(seconds => {
        if (seconds + timeRate < duration) {
          seekToTime(seconds + timeRate);
        } else {
          seekToTime(duration);
        }
      });
    }
  }

  function decreaseTime() {
    if (player) {
      player.getCurrentTime(seconds => {
        if (seconds - timeRate > 0) {
          seekToTime(seconds - timeRate);
        } else {
          seekToTime(0);
        }
      });
    }
  }

  function seekToTime(seconds: number) {
    if (player) {
      player.setCurrentTime(seconds);
      setCurrentTime(seconds);
    }
  }

  function loop() {
    setIsLoop(!isLoop);
  }

  function changeVolume(selectedPlayer: SoundPlayer, selectedVolume: number) {
    if (selectedPlayer && selectedVolume >= 0 && selectedVolume <= 100) {
      selectedPlayer.setVolume(selectedVolume / 100.0);
      setVolume(selectedVolume);
    }
  }
  useEffect(
    function handleMute() {
      if (volume > 0 && isMuted === true) {
        setIsMuted(false);
      }
    },
    [isMuted, volume],
  );

  function mute() {
    if (isMuted === false) {
      setIsMuted(true);
      setPreviousVolume(volume);
      if (player) {
        changeVolume(player, 0);
      }
    }
  }

  function unmute() {
    if (isMuted === true) {
      setIsMuted(false);
      if (player) {
        changeVolume(player, previousVolume);
      }
    }
  }

  function formatTimeString(value: number) {
    return new Date(value * 1000).toISOString().substr(11, 8);
  }

  function getDurationString() {
    return formatTimeString(duration);
  }

  function getCurrentTimeString() {
    return formatTimeString(currentTime);
  }

  function isDisabledButtonPlay() {
    return status === 'loading' || status === 'play';
  }

  function isDisabledButtonPause() {
    return status === 'loading' || status === 'pause' || status === 'stop';
  }

  function isDisabledButtonStop() {
    return status === 'loading' || status === 'stop';
  }

  function isDisabledButtonNext() {
    return status === 'loading' || index === listSounds.length - 1;
  }

  function isDisabledButtonPrevious() {
    return status === 'loading' || index === 0;
  }

  function handlePlay() {
    if (player) {
      play(player);
    }
  }

  function handleSetVolume(selectedVolume: number) {
    if (player) {
      changeVolume(player, selectedVolume);
    }
  }

  function handleSetSpeed(selectedSpeed: number) {
    changeSpeed(selectedSpeed);
  }

  return {
    currentTime,
    currentTimeString: getCurrentTimeString(),
    decreaseTime,
    duration,
    durationString: getDurationString(),
    errorMessage,
    increaseTime,
    isDisabledButtonNext: isDisabledButtonNext(),
    isDisabledButtonPause: isDisabledButtonPause(),
    isDisabledButtonPlay: isDisabledButtonPlay(),
    isDisabledButtonPrevious: isDisabledButtonPrevious(),
    isDisabledButtonStop: isDisabledButtonStop(),
    isLoop,
    isMuted,
    isShuffle,
    loop,
    musicIndex: index,
    mute,
    next,
    pause,
    play: handlePlay,
    previous,
    seekToTime,
    setSpeed: handleSetSpeed,
    setVolume: handleSetVolume,
    shuffle,
    speed,
    status,
    stop,
    timeRate,
    unmute,
    volume,
  };
}
