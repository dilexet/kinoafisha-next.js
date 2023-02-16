import { deleteCookie, getCookie } from "cookies-next";

export const timerSeconds = 900;
export const timer_key = "timer";

export const getTimerSettings = (isStart: boolean) => {
  if (isStart) {
    deleteCookie(timer_key);
    const time = new Date();
    time.setSeconds(time.getSeconds() + timerSeconds);
    return {
      expiryTimestamp: time,
      autoStart: false,
    };
  }
  const timer = getCookie(timer_key);
  if (timer) {
    const time = new Date(timer?.toString());
    return {
      expiryTimestamp: time,
      autoStart: true,
    };
  } else {
    const time = new Date();
    time.setSeconds(time.getSeconds() + timerSeconds);
    return {
      expiryTimestamp: time,
      autoStart: false,
    };
  }
};
