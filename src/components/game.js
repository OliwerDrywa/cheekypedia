import { get, derived } from "svelte/store";
import { room, client } from "./room";
import { app } from "./firebase";
import "firebase/firestore";
const fs = app.firestore();

const DEFAULT_OPTS = { interviewTimes: [20, 180], lang: "en" /* TODO: should lang be client side? */ };

const ref = derived(room, ($room, set) => {
  if ($room) {
    const ref = fs.doc(`rooms/@${$room.id}`);

    set(ref);
  } else {
    set(undefined);
  }
});

export const game = derived(ref, ($ref, set) => {
  if ($ref) {
    function sync(snap) {
      set(snap.data());
    }

    $ref.onSnapshot(sync);
  } else {
    set(undefined);
  }
});

game.init = () => {
  const $ref = get(ref);
  if (!get(game)) $ref.set(DEFAULT_OPTS);
};

game.start = () => {
  const $ref = get(ref);
  if ($ref) $ref.update({ started: true });
};

game.setOptions = opts => {
  const $ref = get(ref);
  if ($ref) $ref.update(opts);
};

// i dont like this one
game.selectArticle = () => {
  const $ref = get(ref);
  const $room = get(room);

  const chooseRandom = arr => arr[Math.floor(Math.random() * arr.length)];

  const liars = Object.values($room.players).filter(p => p.role === "liar");
  const selectedArticle = chooseRandom(liars).article;
  $ref.update({ selectedArticle });
};

game.guess = selectedLiar => {
  const $game = get(game);
  const correctGuess = $game.selectedArticle.url === selectedLiar.article.url;

  const $room = get(room);

  const allPlayerUids = Object.keys($room.players);
  allPlayerUids.forEach(uid => {
    $room.ref.child(uid).update({ article: null });
  });

  function addPoints(uid, points = 5) {
    const _points = $room.players[uid].score;
    $room.ref.child(uid).update({ score: _points + points });
  }

  const $ref = get(ref);

  $ref.update({ splash: {} });

  if (correctGuess) {
    addPoints(selectedLiar.uid);
    addPoints(client.uid);

    const splash = [
      { player: get(client).name, points: 5 },
      { player: selectedLiar.name, points: 5 },
    ];

    $ref.update({ splash });
  } else {
    addPoints(selectedLiar.uid, 10);

    const splash = [{ player: selectedLiar.name, points: 10 }];

    $ref.update({ splash });
  }

  setTimeout(() => $ref.update({ started: false, splash: null, selectedArticle: null }), 3500);
};
