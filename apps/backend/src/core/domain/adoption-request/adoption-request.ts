import AdoptionRequestStatus, {
  AdoptionRequestStatusType,
} from './status/status';
import DenialReason, { DenialReasonType } from './denial-reason/denial-reason';
import { ConflictError } from '../errors';

interface Attributes {
  id?: string;
  petId: string;
  adopterId: string;
  status?: string;
  denialReason?: string;
  contactShared?: boolean;
}

export class AdoptionRequest {
  readonly id: string;
  readonly petId: string;
  readonly adopterId: string;
  private _status: AdoptionRequestStatus;
  private _denialReason: DenialReason | null;
  private _contactShared: boolean;

  private constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.petId = attributes.petId;
    this.adopterId = attributes.adopterId;
    this._status = attributes.status
      ? new AdoptionRequestStatus(attributes.status)
      : AdoptionRequestStatus.pending();
    this._denialReason = attributes.denialReason
      ? new DenialReason(attributes.denialReason)
      : null;
    this._contactShared = attributes.contactShared ?? false;
  }

  get status(): AdoptionRequestStatusType {
    return this._status.getValue();
  }

  get denialReason(): DenialReasonType | null {
    return this._denialReason ? this._denialReason.getValue() : null;
  }

  get contactShared(): boolean {
    return this._contactShared;
  }

  accept() {
    this.guardPending('be accepted');
    this._status = AdoptionRequestStatus.accepted();
  }

  deny(reason: DenialReasonType) {
    this.guardPending('be denied');
    this._status = AdoptionRequestStatus.denied();
    this._denialReason = new DenialReason(reason);
  }

  cancel() {
    this.guardPending('be cancelled');
    this._status = AdoptionRequestStatus.cancelled();
  }

  /**
   * Contact Sharing is a flag, not a status: the owner can talk to several
   * adopters and still deny any of them. Sharing twice is not an error, but a
   * resolved request stays closed whether or not it was shared. See ADR-0004.
   */
  shareContact() {
    this.guardPending('have contact shared');
    this._contactShared = true;
  }

  /**
   * Only pending requests can change — the other statuses are terminal, so a
   * stale screen cannot silently undo a decision. See ADR-0001.
   */
  private guardPending(outcome: string) {
    if (!this._status.isPending()) {
      throw new ConflictError(
        `This adoption request is already ${this.status} and cannot ${outcome}`,
      );
    }
  }

  static create(attributes: Attributes) {
    return new AdoptionRequest(attributes);
  }
}
