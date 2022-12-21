export interface IManageOffer {
  canEdit(): boolean;
  isOfferOwner(): boolean;
  isAssignedToOffer(): boolean;
  canViewApprovalStatus(): boolean;
}
