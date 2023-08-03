// Implementation of Fisher–Yates Shuffle
export default function shuffle(array: Array<any>) {
  let lastIndex = array.length;

  while (lastIndex) {
    lastIndex--;
    const randomIndex = Math.floor(Math.random() * lastIndex);

    const temp = array[lastIndex];
    array[lastIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}
