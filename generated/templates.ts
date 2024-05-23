// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  Address,
  DataSourceTemplate,
  DataSourceContext,
} from "@graphprotocol/graph-ts";

export class XmutantERC721 extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("XmutantERC721", [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext(
      "XmutantERC721",
      [address.toHex()],
      context,
    );
  }
}
