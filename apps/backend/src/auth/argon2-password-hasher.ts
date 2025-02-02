import { verify, hash } from 'argon2';
import { HasherService } from '../core/domain/services/hasher.service';

export class Argon2Hasher implements HasherService {
  async encrypt(plainText: string) {
    return await hash(plainText);
  }

  async compare(plainText: string, hashed: string) {
    return await verify(hashed, plainText);
  }
}
