import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const updateTimeInLocalStorage = throttle(data => {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}, 1000);

const savedTime = parseFloat(
  localStorage.getItem('videoplayer-current-time') || 0
);
player.setCurrentTime(savedTime).catch(error => {
  switch (error.name) {
    case 'RangeError':
      break;
    default:
      break;
  }
});

player.on('timeupdate', updateTimeInLocalStorage);

player.on('play', () => {
  console.log('Video is playing!');
});
