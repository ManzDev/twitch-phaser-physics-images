export const playBoing = () => {
  const n = 1 + Math.floor(Math.random() * 3);
  const audio = new Audio(`sfx/boing${n}.mp3`);
  audio.play();
};

export const playExplode = () => {
  const audio = new Audio("sfx/explode.mp3");
  audio.play();
};
