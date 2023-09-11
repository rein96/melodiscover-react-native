export interface PlaylistsTracksResponse {
  href: string;
  items: PlaylistsTracksItem[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface PlaylistsTracksItem {
  added_at: Date;
  added_by: AddedBy;
  is_local: boolean;
  primary_color: null;
  track: PlaylistTrack;
  video_thumbnail: VideoThumbnail;
}

interface AddedBy {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name?: string;
  type: Type;
  uri: string;
}

interface ExternalUrls {
  spotify: string;
}

enum Type {
  Artist = 'artist',
  User = 'user',
}

export interface PlaylistTrack {
  album: Album;
  artists: AddedBy[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null | string;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
}

interface Album {
  album_type: string;
  artists: AddedBy[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

interface ExternalIDS {
  isrc: string;
}

interface VideoThumbnail {
  url: null;
}
