import { LikedSong } from "@/types/songs";

type Fetcher = (...args: Parameters<typeof fetch>) => Promise<any>;

export async function sendRequest(
  url: string,
  token: string,
  { arg }: { arg: { name: string; description: string; public: boolean } }
) {
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

export const fetcher: Fetcher = async (...args) => {
  const response = await fetch(...args);
  return response.json();
};

export const scopes = [
  "user-library-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "playlist-read-private",
  "user-library-modify",
  "user-library-read",
];

export const fetchLikedSongs = async (accessToken: string) => {
  const uris: string[] = [];
  const limit = 50; // Maximum allowed limit
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Fetching liked songs failed with status: ${response.status}`
      );
    }

    const data = await response.json();
    data.items.forEach((element: LikedSong) => {
      uris.push(element.track.uri);
    });

    if (data.next) {
      offset += limit;
    } else {
      hasMore = false;
    }
  }

  return uris;
};
