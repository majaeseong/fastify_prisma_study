const getCrrentDate = (): Date => {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const hour = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  const milSec = now.getMilliseconds();

  return new Date(Date.UTC(year, month, day, hour, min, sec, milSec));
};

export { getCrrentDate };
