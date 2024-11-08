import { Video } from "./video";

export interface Playlist {
  id: string;
  name: string;
  category: string;
  videos: Video[];
}
