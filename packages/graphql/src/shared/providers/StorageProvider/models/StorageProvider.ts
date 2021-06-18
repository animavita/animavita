export interface SaveFileDTO {
  userId: string;
  imageURL: string;
}

export default interface StorageProvider {
  saveFile(data: SaveFileDTO): Promise<string>;
}
