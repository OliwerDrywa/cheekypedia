// deps
import { writable, derived } from "svelte/store";
import { makeID } from "./helpers";
import { app } from "./firebase";
import "firebase/database";

const db = app.database();

// client data
export const client = writable({
  name: "anonymous",
  role: "liar",
  roomID: "",

  inRoom: false,
  
  // does intend to create room
  creator: false,

  article: null,
});

client.uid = makeID(8);

client.setName = _name => {
  client.update(n => ({ ...n, name: _name || "anonymous" }));
};

client.chooseArticle = article => {
  client.update(n => ({
    ...n,
    article,
  }));
};

// room data
export const room = derived(client, async ($client, set) => {
  const { name, roomID, role, article, creator } = $client;

  const ref = db.ref(`rooms/@${roomID}`);

  function getPlayerCount() {
    return ref.once("value").then(snap => (snap ? Object.keys(snap.val()).length : false));
  }

  let playerCount;

  if (creator || (roomID.length === 4 && (playerCount = await getPlayerCount()))) {
    db.goOnline();
    const userRef = ref.child(client.uid);
    const firstJoin = userRef.once("value").then(snap => !snap.val());

    await userRef.onDisconnect().remove();

    if (await firstJoin) {
      userRef.set({ role, article, name, index: playerCount || 0, score: 0 });
    } else {
      userRef.update({ role, article });
    }

    const sync = snap => set({ players: snap.val(), id: roomID, ref });
    const listener = ref.on("value", sync);

    // return () => {
    //   ref.off("value", listener);
    // };
  } else {
    set(undefined);
  }
});

room.make = () => {
  client.update(n => ({
    ...n,
    roomID: makeID(4),
    creator: true,
    role: "guesser",
  }));
};

room.exit = () => {
  db.goOffline();

  client.update(n => ({
    ...n,
    roomID: "",
    creator: false,
    role: "liar",
    article: null,
  }));
};

room.joinLiars = () => {
  client.update(n => ({
    ...n,
    role: "liar",
  }));
};

room.joinGuessers = () => {
  client.update(n => ({
    ...n,
    role: "guesser",
  }));
};
