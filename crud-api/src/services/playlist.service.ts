import { Injectable } from "@nestjs/common";
import { CreatePlaylistDto } from "../dtos/playlist/create-playlist.dto";
import { PlaylistEntity } from "src/entities/playlist.entity";
import { VideoEntity } from "src/entities/video.entity";
import { PlaylistRepository } from "src/repositories/playlist.repository";

@Injectable()
export class PlaylistService {
  playlists: PlaylistEntity[] = [
    {
      id: 1,
      category: "testando",
      name: "teste usuario",
      videos: [
        { id: 1, name: "testar", youtubeUrl: "OBmlCZTF4Xs", playlistId: 1 },
      ],
      userId: 2,
    },
    {
      id: 2,
      category: "testando",
      name: "teste usuario 2",
      videos: [
        {
          id: 2,
          name: "testar novamente",
          youtubeUrl: "7hHZnvjCbVw",
          playlistId: 2,
        },
      ],
      userId: 2,
    },
    {
      id: 3,
      category: "testando",
      name: "nova tarefa usuario",
      videos: [
        { id: 3, name: "testar ", youtubeUrl: "m3lF2qEA2cw", playlistId: 3 },
        { id: 4, name: "testar 2", youtubeUrl: "7hHZnvjCbVw", playlistId: 3 },
      ],
      userId: 2,
    },
    {
      id: 4,
      category: "testando",
      name: "nova tarefa usuario 2",
      videos: [
        {
          id: 5,
          name: "testar novamente",
          youtubeUrl: "7hHZnvjCbVw",
          playlistId: 4,
        },
      ],
      userId: 1,
    },
    {
      id: 5,
      category: "testando",
      name: "teste demo usuario",
      videos: [
        { id: 6, name: "demo", youtubeUrl: "m3lF2qEA2cw", playlistId: 5 },
      ],
      userId: 1,
    },
    {
      id: 6,
      category: "testando",
      name: "teste demo usuario 2",
      videos: [
        { id: 7, name: "demo 2", youtubeUrl: "OBmlCZTF4Xs", playlistId: 6 },
      ],
      userId: 1,
    },
    {
      id: 7,
      category: "testando",
      name: "tarefa demo usuario",
      videos: [
        { id: 8, name: "demo ", youtubeUrl: "7hHZnvjCbVw", playlistId: 7 },
        { id: 9, name: "demo 2", youtubeUrl: "OBmlCZTF4Xs", playlistId: 7 },
      ],
      userId: 1,
    },

    {
      id: 8,
      category: "testando",
      name: "teste usuario 2",
      videos: [
        { id: 10, name: "testar", youtubeUrl: "OBmlCZTF4Xs", playlistId: 8 },
      ],
      userId: 2,
    },
    {
      id: 9,
      category: "testando",
      name: "teste 2 usuario 2",
      videos: [
        {
          id: 11,
          name: "testar novamente",
          youtubeUrl: "7hHZnvjCbVw",
          playlistId: 9,
        },
      ],
      userId: 2,
    },
    {
      id: 10,
      category: "testando",
      name: "nova tarefa usuario 3",
      videos: [
        { id: 12, name: "testar ", youtubeUrl: "m3lF2qEA2cw", playlistId: 10 },
        { id: 13, name: "testar 2", youtubeUrl: "7hHZnvjCbVw", playlistId: 10 },
      ],
      userId: 2,
    },
    {
      id: 11,
      category: "testando",
      name: "nova tarefa usuario",
      videos: [
        {
          id: 14,
          name: "testar novamente",
          youtubeUrl: "7hHZnvjCbVw",
          playlistId: 11,
        },
      ],
      userId: 1,
    },
    {
      id: 12,
      category: "testando",
      name: "teste demo usuario",
      videos: [
        { id: 15, name: "demo", youtubeUrl: "m3lF2qEA2cw", playlistId: 12 },
      ],
      userId: 1,
    },
    {
      id: 13,
      category: "testando",
      name: "teste demo usuario 3",
      videos: [
        { id: 16, name: "demo 2", youtubeUrl: "OBmlCZTF4Xs", playlistId: 13 },
      ],
      userId: 1,
    },
    {
      id: 14,
      category: "testando",
      name: "tarefa demo usuario",
      videos: [
        { id: 17, name: "demo ", youtubeUrl: "7hHZnvjCbVw", playlistId: 14 },
        { id: 18, name: "demo 2", youtubeUrl: "OBmlCZTF4Xs", playlistId: 14 },
      ],
      userId: 1,
    },

    {
      id: 15,
      category: "testando",
      name: "teste usuario 3",
      videos: [
        { id: 19, name: "testar", youtubeUrl: "OBmlCZTF4Xs", playlistId: 15 },
      ],
      userId: 2,
    },
    {
      id: 16,
      category: "testando",
      name: "teste 2 usuario 2",
      videos: [
        {
          id: 20,
          name: "testar novamente",
          youtubeUrl: "7hHZnvjCbVw",
          playlistId: 16,
        },
      ],
      userId: 2,
    },
    {
      id: 17,
      category: "testando",
      name: "nova tarefa usuario 4",
      videos: [
        { id: 21, name: "testar ", youtubeUrl: "m3lF2qEA2cw", playlistId: 17 },
        { id: 22, name: "testar 2", youtubeUrl: "7hHZnvjCbVw", playlistId: 17 },
      ],
      userId: 2,
    },
    {
      id: 18,
      category: "testando",
      name: "nova tarefa usuario",
      videos: [
        {
          id: 23,
          name: "testar novamente",
          youtubeUrl: "7hHZnvjCbVw",
          playlistId: 18,
        },
      ],
      userId: 1,
    },
    {
      id: 19,
      category: "testando",
      name: "teste demo usuario",
      videos: [
        { id: 24, name: "demo", youtubeUrl: "m3lF2qEA2cw", playlistId: 19 },
      ],
      userId: 1,
    },
    {
      id: 20,
      category: "testando",
      name: "teste demo usuario 3",
      videos: [
        { id: 25, name: "demo 2", youtubeUrl: "OBmlCZTF4Xs", playlistId: 20 },
      ],
      userId: 1,
    },
    {
      id: 21,
      category: "testando",
      name: "tarefa demo usuario",
      videos: [
        { id: 26, name: "demo ", youtubeUrl: "7hHZnvjCbVw", playlistId: 21 },
        { id: 27, name: "demo 2", youtubeUrl: "OBmlCZTF4Xs", playlistId: 21 },
      ],
      userId: 1,
    },
  ];

  constructor(private readonly playlistRepository: PlaylistRepository) {
    // this.playlists.forEach((playlist) => {
    //   this.playlistRepository.save(this.playlists[0]);
    // });
  }

  categories: { userId: number; values: string[] }[] = [
    { userId: 1, values: ["Favoritos", "Pop Music", "Cursos"] },
    { userId: 2, values: ["Favoritos", "Pop Music", "Cursos"] },
  ];

  create(createPlaylistDto: CreatePlaylistDto, userId: number) {
    const idPlaylist = Math.random() * 100;
    const newVideos: VideoEntity[] = [];

    createPlaylistDto.videos.forEach((s) =>
      newVideos.push({ ...s, playlistId: idPlaylist })
    );

    for (const video of newVideos) {
      video.id = Math.random() * 100;
    }

    const newPlaylist: PlaylistEntity = {
      ...createPlaylistDto,
      id: idPlaylist,
      userId: userId,
      videos: newVideos,
    };
    this.categories.push({
      userId: userId,
      values: ["Favoritos", "Pop Music", "Cursos"],
    });
    this.playlists.push(newPlaylist);
    console.log(this.playlists);
    return createPlaylistDto;
  }

  async findAll() {
    return await this.playlistRepository.findAll();
  }

  findAllByUser(id: number, page: number, pageSize: number) {
    let playlists = this.playlists.filter((t) => t.userId == id);
    return {
      playlists: playlists.slice(page * 10, page * 10 + pageSize),
      total: playlists.length,
    };
  }

  findAllCategoryByUser(id: number) {
    return this.categories.find((t) => t.userId == id);
  }

  findOne(id: number) {
    return this.playlists.find((t) => t.id == id);
  }

  update(
    idPlaylist: number,
    updatePlaylistDto: CreatePlaylistDto,
    userId: number
  ) {
    const updatedVideos: VideoEntity[] = [];

    updatePlaylistDto.videos.forEach((s) =>
      updatedVideos.push({ ...s, playlistId: idPlaylist })
    );

    const updatedPlaylist: PlaylistEntity = {
      ...updatePlaylistDto,
      id: idPlaylist,
      userId: userId,
      videos: updatedVideos,
    };

    const newPlaylists = this.playlists.map((playlist) =>
      playlist.id === idPlaylist
        ? { ...updatedPlaylist, videos: updatedVideos }
        : playlist
    );

    this.playlists = newPlaylists;
    let categoriesUser = this.categories.find((c) => c.userId == userId);
    if (!categoriesUser.values.includes(updatePlaylistDto.category)) {
      categoriesUser.values.push(updatePlaylistDto.category);
      this.categories.forEach((c) =>
        c.userId == categoriesUser.userId
          ? { ...categoriesUser, values: [...categoriesUser.values] }
          : c
      );
    }

    return updatePlaylistDto;
  }

  remove(id: number) {
    let playlist = this.playlists.find((playlist) => playlist.id == id);
    this.playlists = this.playlists.filter((playlist) => playlist.id !== id);

    return playlist;
  }
}
