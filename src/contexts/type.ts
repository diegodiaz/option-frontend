export type VideoType = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  },
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      },
      medium: {
        url: string;
        width: number;
        height: number;
      },
      high: {
        url: string;
        width: number;
        height: number;
      }
    },
    hannelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  }
}