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
}

export class AdoptionRequest {
  readonly id: string;
  readonly petId: string;
  readonly adopterId: string;
  private _status: AdoptionRequestStatus;
  private _denialReason: DenialReason | null;

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
  }

  get status(): AdoptionRequestStatusType {
    return this._status.getValue();
  }

  get denialReason(): DenialReasonType | null {
    return this._denialReason ? this._denialReason.getValue() : null;
  }

  accept() {
    this.guardPending('accepted');
    this._status = AdoptionRequestStatus.accepted();
  }

  deny(reason: DenialReasonType) {
    this.guardPending('denied');
    this._status = AdoptionRequestStatus.denied();
    this._denialReason = new DenialReason(reason);
  }

  /**
   * Only pending requests can change — the other statuses are terminal, so a
   * stale screen cannot silently undo a decision. See ADR-0001.
   */
  private guardPending(target: AdoptionRequestStatusType) {
    if (!this._status.isPending()) {
      throw new ConflictError(
        `This adoption request is already ${this.status} and cannot be ${target}`,
      );
    }
  }

  static create(attributes: Attributes) {
    return new AdoptionRequest(attributes);
  }
}
