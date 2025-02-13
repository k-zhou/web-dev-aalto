import { browser } from "$app/environment";

const PLOCATION_KEY = "player_location";
let initialLocation = { x: 0, y: 0 };
if (browser && localStorage.hasOwnProperty(PLOCATION_KEY)) {
  initialLocation = JSON.parse(localStorage.getItem(PLOCATION_KEY));
}

let locationState = $state(initialLocation);

const useLocationState = () => {
  return {
    get location() {
      return locationState;
    },
    up: () => {
      locationState.y++;
	localStorage.setItem(PLOCATION_KEY, JSON.stringify(locationState));
    },
    down: () => {
      locationState.y--;
	localStorage.setItem(PLOCATION_KEY, JSON.stringify(locationState));
    },
    left: () => {
      locationState.x--;
	localStorage.setItem(PLOCATION_KEY, JSON.stringify(locationState));
    },
    right: () => {
      locationState.x++;
	localStorage.setItem(PLOCATION_KEY, JSON.stringify(locationState));
    },
  };
};

export { useLocationState };

