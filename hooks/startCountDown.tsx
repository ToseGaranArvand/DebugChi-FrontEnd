type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const startCountdown = (
  targetDateString: Date,
  onTick: (timeLeft: CountdownTime) => void,
  onComplete?: () => void
) => {
  const targetDate = new Date(targetDateString).getTime();

  const interval = setInterval(() => {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(interval);
      onTick({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      onComplete?.();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    onTick({ days, hours, minutes, seconds });
  }, 1000);

  return () => clearInterval(interval);
};
export { startCountdown };
