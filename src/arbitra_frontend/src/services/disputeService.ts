import { Principal } from '@dfinity/principal';
import type { ActorSubclass } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { createActor, CANISTER_IDS } from './agent';
import type { Dispute, DisputeStatus } from '../types';

// IDL Factory for arbitra_backend (simplified for demo)
const arbitraBackendIdl = ({ IDL: IDLModule }: { IDL: typeof IDL }): IDL.ServiceClass => {
  // Use IDLModule to avoid circular reference
  const IDL = IDLModule;
  const UserRole = IDL.Variant({
    'Claimant': IDL.Null,
    'Respondent': IDL.Null,
    'Arbitrator': IDL.Null,
    'Admin': IDL.Null,
  });
  
  const DisputeStatus = IDL.Variant({
    'Pending': IDL.Null,
    'EvidenceSubmission': IDL.Null,
    'UnderReview': IDL.Null,
    'Decided': IDL.Null,
    'Appealed': IDL.Null,
    'Closed': IDL.Null,
  });

  const Dispute = IDL.Record({
    'id': IDL.Text,
    'claimant': IDL.Principal,
    'respondent': IDL.Principal,
    'arbitrator': IDL.Opt(IDL.Principal),
    'title': IDL.Text,
    'description': IDL.Text,
    'amount': IDL.Nat,
    'status': DisputeStatus,
    'createdAt': IDL.Int,
    'updatedAt': IDL.Int,
    'decision': IDL.Opt(IDL.Text),
    'escrowId': IDL.Opt(IDL.Text),
  });

  const Result = IDL.Variant({
    'ok': IDL.Text,
    'err': IDL.Text,
  });

  return IDL.Service({
    'createDispute': IDL.Func([IDL.Principal, IDL.Text, IDL.Text, IDL.Nat], [Result], []),
    'getDispute': IDL.Func([IDL.Text], [IDL.Opt(Dispute)], ['query']),
    'getAllDisputes': IDL.Func([], [IDL.Vec(Dispute)], ['query']),
    'getDisputesByUser': IDL.Func([IDL.Principal], [IDL.Vec(Dispute)], ['query']),
    'assignArbitrator': IDL.Func([IDL.Text, IDL.Principal], [Result], []),
    'updateDisputeStatus': IDL.Func([IDL.Text, DisputeStatus], [Result], []),
    'submitDecision': IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'registerUser': IDL.Func([IDL.Text, IDL.Text, UserRole], [Result], []),
    'linkEscrow': IDL.Func([IDL.Text, IDL.Text], [Result], []),
  });
};

// Define the service interface type
type ArbitraBackendService = {
  createDispute: (respondent: Principal, title: string, description: string, amount: bigint) => Promise<{ ok: string } | { err: string }>;
  getDispute: (disputeId: string) => Promise<Dispute[]>;
  getAllDisputes: () => Promise<Dispute[]>;
  getDisputesByUser: (user: Principal) => Promise<Dispute[]>;
  assignArbitrator: (disputeId: string, arbitrator: Principal) => Promise<{ ok: string } | { err: string }>;
  updateDisputeStatus: (disputeId: string, status: { [key: string]: null }) => Promise<{ ok: string } | { err: string }>;
  submitDecision: (disputeId: string, decision: string) => Promise<{ ok: string } | { err: string }>;
  registerUser: (name: string, email: string, role: { [key: string]: null }) => Promise<{ ok: string } | { err: string }>;
  linkEscrow: (disputeId: string, escrowId: string) => Promise<{ ok: string } | { err: string }>;
};

export class DisputeService {
  private actor: ActorSubclass<ArbitraBackendService> | null = null;

  async getActor(): Promise<ActorSubclass<ArbitraBackendService>> {
    if (!this.actor) {
      // Validate canister ID before creating actor
      if (!CANISTER_IDS.arbitra_backend || CANISTER_IDS.arbitra_backend.trim() === '') {
        throw new Error(
          'Arbitra backend canister ID is not configured. ' +
          'Please ensure the canister is deployed and environment variables are set. ' +
          'Current canister IDs: ' + JSON.stringify(CANISTER_IDS, null, 2)
        );
      }
      console.log('Creating actor for arbitra_backend with canister ID:', CANISTER_IDS.arbitra_backend);
      this.actor = await createActor<ActorSubclass<ArbitraBackendService>>(CANISTER_IDS.arbitra_backend, arbitraBackendIdl);
    }
    return this.actor;
  }

  async createDispute(
    respondent: Principal,
    title: string,
    description: string,
    amount: bigint
  ): Promise<string> {
    const actor = await this.getActor();
    const result = await actor.createDispute(respondent, title, description, amount);
    
    if ('ok' in result) {
      return result.ok;
    } else {
      throw new Error(result.err);
    }
  }

  async getDispute(disputeId: string): Promise<Dispute | null> {
    const actor = await this.getActor();
    const result = await actor.getDispute(disputeId);
    return result.length > 0 ? result[0] : null;
  }

  async getAllDisputes(): Promise<Dispute[]> {
    const actor = await this.getActor();
    return await actor.getAllDisputes();
  }

  async getDisputesByUser(user: Principal): Promise<Dispute[]> {
    const actor = await this.getActor();
    return await actor.getDisputesByUser(user);
  }

  async assignArbitrator(disputeId: string, arbitrator: Principal): Promise<void> {
    const actor = await this.getActor();
    const result = await actor.assignArbitrator(disputeId, arbitrator);
    
    if ('err' in result) {
      throw new Error(result.err);
    }
  }

  async updateDisputeStatus(disputeId: string, status: DisputeStatus): Promise<void> {
    const actor = await this.getActor();
    const result = await actor.updateDisputeStatus(disputeId, { [status]: null });
    
    if ('err' in result) {
      throw new Error(result.err);
    }
  }

  async submitDecision(disputeId: string, decision: string): Promise<void> {
    const actor = await this.getActor();
    const result = await actor.submitDecision(disputeId, decision);
    
    if ('err' in result) {
      throw new Error(result.err);
    }
  }

  async registerUser(name: string, email: string, role: string): Promise<void> {
    const actor = await this.getActor();
    const result = await actor.registerUser(name, email, { [role]: null });
    
    if ('err' in result) {
      throw new Error(result.err);
    }
  }

  async linkEscrow(disputeId: string, escrowId: string): Promise<void> {
    const actor = await this.getActor();
    const result = await actor.linkEscrow(disputeId, escrowId);
    
    if ('err' in result) {
      throw new Error(result.err);
    }
  }
}

export const disputeService = new DisputeService();
