import StorageProvider, {SaveFileDTO} from '../models/StorageProvider';

export default class FakeStorageProvider implements StorageProvider {
  private storage: string[] = [];

  async saveFile({imageURL}: SaveFileDTO): Promise<string> {
    this.storage.push(imageURL);

    return imageURL;
  }
}
