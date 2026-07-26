import { ConflictError } from '../errors';
import DenialReason, { DenialReasonType } from './denial-reason/denial-reason';
import AdoptionRequestStatus, {
  AdoptionRequestStatusType,
} from './status/status';

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
  private _denialReason: DenialReason;

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

  get denialReason(): DenialReasonType {
    return this._denialReason?.getValue() ?? null;
  }

  accept() {
    this._status = AdoptionRequestStatus.accepted();
  }

  deny(reason: DenialReasonType) {
    if (!this._status.isPending()) {
      throw new ConflictError(
        `Only pending adoption requests can be denied, this one is ${this.status}`,
      );
    }

    this._status = AdoptionRequestStatus.denied();
    this._denialReason = new DenialReason(reason);
  }

  static create(attributes: Attributes) {
    return new AdoptionRequest(attributes);
  }
}
