// set up firebase
import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();

const f = functions.region("europe-west1");

// deps
const cors = require("cors")({ origin: true });
const nfetch = require("node-fetch");

// helpers
function extractParams(url: string): any {
  let params: { [key: string]: string } = {};

  let pairs = url.slice(2).split("&");

  pairs.forEach(param => {
    let pair = param.split("=");
    params[pair[0]] = pair[1];
  });

  return params;
}

function last(array: any[]): any {
  return array[array.length - 1];
}

// on call returns a random wiki article title, can take lang
exports.getWiki = f.https.onRequest((req, res) => {
  // Forbidding PUT requests.
  if (req.method === "PUT") return res.status(403).send("forbidden");

  return cors(req, res, async () => {
    const { lang = "en" } = extractParams(req.url);

    const SRC = `https://${lang}.m.wikipedia.org/wiki/Special:Random`;
    const resp = await nfetch(SRC);

    const article = last(resp.url.split("/"));
    res.status(200).send(article);
  });
});

const db = admin.firestore();

// remove game data from firestore on room deletion
exports.removeGhostGame = f.database.ref("/rooms/{id}").onDelete((_, ctx) => {
  return db.doc(`rooms/${ctx.params.id}`).delete();
});

// exports.setRoomData = f.https.onRequest((req, res) => {
//   // Forbidding PUT requests.
//   if (req.method === "PUT") return res.status(403).send("forbidden");

//   return cors(req, res, async () => {
//     const { lang } = extractParams(req.url);

//     const SRC = `https://${lang}.m.wikipedia.org/wiki/Special:Random`;
//     const resp = await nfetch(SRC);

//     const article = last(resp.url.split("/"));

//     res.status(200).send(article);
//   });
// });
