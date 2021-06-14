import StorageProvider, {SaveFileDTO} from '../models/StorageProvider';

export default function fakeStorageProvider(): StorageProvider {
  const storage: string[] = [];

  return {
    async saveFile({imageURL}: SaveFileDTO): Promise<string> {
      storage.push(imageURL);

      return imageURL;
    },
  };
}
