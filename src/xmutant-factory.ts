import { CloneCreated as CloneCreatedEvent } from "../generated/XmutantFactory/XmutantFactory";
import { CloneCreated } from "../generated/schema";

import { XmutantERC721 } from "../generated/templates";
export function handleCloneCreated(event: CloneCreatedEvent): void {
  let entity = new CloneCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.cloneAddress = event.params.cloneAddress;
  entity.deployer = event.params.deployer;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  XmutantERC721.create(event.params.cloneAddress);
}
