import { app } from "./firebase";
import "firebase/functions";
const f = app.functions();

type Lang = "en" | "pl";
type Wiki = { base: string; url: string; title: string };

export async function getWiki(lang: Lang): Promise<Wiki> {
  const resp = await fetch(`https://europe-west1-all-a-lie.cloudfunctions.net/getWiki?lang=${lang}`);

  const base = await resp.text();
  const url = `https://${lang}.m.wikipedia.org/wiki/${base}`;
  const title = decodeURI(base).replace(/_/g, " ");

  return { base, url, title };
}
