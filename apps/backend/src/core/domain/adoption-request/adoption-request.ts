import AdoptionRequestStatus, {
  AdoptionRequestStatusType,
} from './status/status';

interface Attributes {
  id?: string;
  petId: string;
  adopterId: string;
  status?: string;
}

export class AdoptionRequest {
  readonly id: string;
  readonly petId: string;
  readonly adopterId: string;
  private _status: AdoptionRequestStatus;

  private constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.petId = attributes.petId;
    this.adopterId = attributes.adopterId;
    this._status = attributes.status
      ? new AdoptionRequestStatus(attributes.status)
      : AdoptionRequestStatus.pending();
  }

  get status(): AdoptionRequestStatusType {
    return this._status.getValue();
  }

  accept() {
    this._status = AdoptionRequestStatus.accepted();
  }

  deny() {
    this._status = AdoptionRequestStatus.denied();
  }

  static create(attributes: Attributes) {
    return new AdoptionRequest(attributes);
  }
}
