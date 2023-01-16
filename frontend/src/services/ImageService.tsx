export class ImageService {
  public static convertToImage({
    imageData,
    imageType = "jpg",
    defaultImage = "https://i.imgur.com/K7A78We.jpg",
  }: {
    imageData?: string;
    imageType?: string;
    defaultImage?: string;
  }) {
    return imageData && imageData.length > 0
      ? `data:image/${imageType};base64,${imageData}`
      : `${defaultImage}`;
  }
}
