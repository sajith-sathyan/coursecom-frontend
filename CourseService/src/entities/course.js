export default function course(
  title,
  price,
  category,
  description,
  thumbnailUrl,
  videos,
  userId,
  status,
  createdAt,
) {
  return {
    getTitleName: () => title,
    getPriceName: () => price,
    getDescriptionName: () => description,
    getthumbnailUrlName: () => thumbnailUrl,
    videoFilesName: () => videoFiles,
    getUserIdName:()=>userId,
    getCategoryName:()=>category,
    getVideosName:()=>videos,
    getStatusName :()=>status,
    getCreatedAt: () => createdAt,
  };
}
