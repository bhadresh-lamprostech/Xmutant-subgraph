import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { CloneCreated } from "../generated/XmutantFactory/XmutantFactory"

export function createCloneCreatedEvent(
  cloneAddress: Address,
  deployer: Address
): CloneCreated {
  let cloneCreatedEvent = changetype<CloneCreated>(newMockEvent())

  cloneCreatedEvent.parameters = new Array()

  cloneCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "cloneAddress",
      ethereum.Value.fromAddress(cloneAddress)
    )
  )
  cloneCreatedEvent.parameters.push(
    new ethereum.EventParam("deployer", ethereum.Value.fromAddress(deployer))
  )

  return cloneCreatedEvent
}
