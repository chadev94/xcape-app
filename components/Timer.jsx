import React, {useEffect, useState} from 'react';

import {StyleSheet, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {currentThemeState} from '../atoms';
import {Colors} from '../Colors';
import PretendardText from './PretendardText';

let interval = null;

const Timer = () => {
  const currentTheme = useRecoilValue(currentThemeState);
  const [remainTime, setRemainTime] = useState(50 * 1000 * 60);

  useEffect(() => {
    if (currentTheme.isPlaying) {
      interval = setInterval(() => {
        setRemainTime(() => currentTheme.endTime - new Date().getTime());
      }, 10);
    } else {
      setRemainTime(() => currentTheme.runningTime * 60 * 1000);
    }

    return () => clearInterval(interval);
  }, [currentTheme]);

  const formatTimeString = (time, showMsecs) => {
    if (isNaN(time)) {
      return '타이머';
    }

    let status;
    if (time < 0) {
      time = Math.abs(time);
      status = 'increase';
    }
    let msecs = time % 1000;

    if (msecs < 10) {
      msecs = `00${msecs}`;
    } else if (msecs < 100) {
      msecs = `0${msecs}`;
    }

    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(time / 60000);
    // let hours = Math.floor(time / 3600000);
    seconds = seconds - minutes * 60;
    // minutes = minutes - hours * 60;

    if (status === 'increase') {
      return `+ ${minutes < 10 ? 0 : ''}${minutes}:${
        seconds < 10 ? 0 : ''
      }${seconds}:${msecs}`;
    }

    return `${minutes < 10 ? 0 : ''}${minutes}:${
      seconds < 10 ? 0 : ''
    }${seconds}:${msecs}`;
  };

  return (
    <View>
      <PretendardText style={styles.time}>
        {formatTimeString(remainTime)}
      </PretendardText>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  time: {
    fontSize: 48,
    color: Colors.white,
    fontWeight: '700',
    backgroundColor: Colors.darker,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
});
