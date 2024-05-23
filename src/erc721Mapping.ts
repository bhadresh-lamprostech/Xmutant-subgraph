import {
  Transfer as TransferEvent,
  Minted as MintedEvent,
} from "../generated/templates/XmutantERC721/XmutantERC721";
import { Collection, Token, Transfer } from "../generated/schema";
import { XmutantERC721 } from "../generated/templates/XmutantERC721/XmutantERC721";
import { Address } from "@graphprotocol/graph-ts";

export function handleCollection(address: Address): void {
  let contract = XmutantERC721.bind(address);

  // Load or create the collection entity
  let collection = Collection.load(address.toHexString());
  if (!collection) {
    collection = new Collection(address.toHexString());
    collection.address = address;
    collection.symbol = contract.symbol();
    collection.name = contract.name();
    collection.save();
  }
}

export function handleTransfer(event: TransferEvent): void {
  let token = Token.load(event.params.tokenId.toString());
  if (!token) {
    token = new Token(event.params.tokenId.toString());
    token.tokenId = event.params.tokenId;
    token.mintedAt = event.block.timestamp;

    let contract = XmutantERC721.bind(event.address);
    let metadataURI = contract.tokenURI(event.params.tokenId);
    token.metadataURI = metadataURI;

    //   let collection = Collection.load(event.address.toHexString());
    //   if (!collection) {
    //     collection = new Collection(event.address.toHexString());
    //     collection.address = event.address;
    //     collection.symbol = contract.symbol();
    //     collection.name = contract.name();
    //     collection.maxSupply = contract.maxSupply();
    //     collection.save();
    //   }

    //   token.collection = collection.id;
  }

  token.owner = event.params.to;
  token.save();

  let transfer = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.token = token.id;
  transfer.timestamp = event.block.timestamp;
  transfer.save();
}

export function handleMinted(event: MintedEvent): void {
  let token = Token.load(event.params.tokenId.toString());
  if (!token) {
    token = new Token(event.params.tokenId.toString());
    token.tokenId = event.params.tokenId;
    token.metadataURI = event.params.uri;
    token.owner = event.params.to;
    token.mintedAt = event.block.timestamp;

    let contract = XmutantERC721.bind(event.address);
    // let collection = Collection.load(event.address.toHexString());
    // if (!collection) {
    //   collection = new Collection(event.address.toHexString());
    //   collection.address = event.address;
    //   collection.symbol = contract.symbol();
    //   collection.name = contract.name();
    //   collection.maxSupply = contract.maxSupply();
    //   collection.save();
    // }

    // token.collection = collection.id;
    token.save();
  }
}
