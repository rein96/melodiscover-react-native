export interface PlaylistResponse {
  href: string;
  items: PlaylistItemResponse[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface PlaylistItemResponse {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: ItemType;
  uri: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

interface Owner {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: OwnerType;
  uri: URI;
}

interface Tracks {
  href: string;
  total: number;
}

enum OwnerType {
  User = 'user',
}

enum URI {
  SpotifyUserEmpty022 = 'spotify:user:empty022',
  SpotifyUserLizettprincess00 = 'spotify:user:lizettprincess-00',
  SpotifyUserReinhartandreas = 'spotify:user:reinhartandreas',
  SpotifyUserSpotify = 'spotify:user:spotify',
}

enum ItemType {
  Playlist = 'playlist',
}

// enum DisplayName {
//   AimeeCord = 'aimee_cord',
//   LeoLobaton = 'Leo Lobaton',
//   ReinhartAndreas = 'Reinhart Andreas',
//   Spotify = 'Spotify',
// }

// enum ID {
//   Empty022 = 'empty022',
//   Lizettprincess00 = 'lizettprincess-00',
//   Reinhartandreas = 'reinhartandreas',
//   Spotify = 'spotify',
// }
