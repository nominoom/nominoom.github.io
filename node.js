import express from "express";
import fetch from "node-fetch";
import querystring from "querystring";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

const getAccessToken = async () => {
  const token = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  return response.json();
};

app.get("/now-playing", async (_, res) => {
  const { access_token } = await getAccessToken();

  const nowPlaying = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );

  if (nowPlaying.status === 204) {
    return res.json({ isPlaying: false });
  }

  const data = await nowPlaying.json();
  res.json({
    isPlaying: data.is_playing,
    song: data.item.name,
    artists: data.item.artists.map(a => a.name).join(", "),
    albumArt: data.item.album.images[0].url
  });
});

app.listen(8888, () => console.log("Server running on http://localhost:8888"));
