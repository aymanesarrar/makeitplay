interface Artist {
  id: string;
  name: string;
}

interface Image {
  url: string;
}

interface Album {
  id: string;
  name: string;
  images: Image[];
}

interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  uri: string;
}

export interface LikedSong {
  added_at: string;
  track: Track;
}
