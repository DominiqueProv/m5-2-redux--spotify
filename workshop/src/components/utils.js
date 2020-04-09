
export const numFollowers = (followers) => {
  let numOfFollowers = followers.toString();
  const strFollowers = followers.toString().length;
  if (strFollowers === 5) {
    const firstTwoK = followers.toString().substring(0, 2);
    numOfFollowers = `${firstTwoK}K`
  }
  if (strFollowers === 6) {
    const firstThreeK = followers.toString().substring(0, 3);
    numOfFollowers = `${firstThreeK}K`
  }
  if (strFollowers === 7) {
    const oneMillion = followers.toString().substring(0, 1);
    numOfFollowers = `${oneMillion}M`
  }
  if (strFollowers === 8) {
    const tenMillion = followers.toString().substring(0, 2);
    numOfFollowers = `${tenMillion}M`
  }
  return numOfFollowers
}

