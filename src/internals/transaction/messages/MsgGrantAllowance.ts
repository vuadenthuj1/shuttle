import { MsgGrantAllowance as CosmosMsgGrantAllowance } from "cosmjs-types/cosmos/feegrant/v1beta1/tx";

import BasicAllowance, { BasicAllowanceValue } from "./BasicAllowance";
import TransactionMsg, { AminoMsg, CosmosMsg, ProtoMsg } from "./TransactionMsg";

export type MsgGrantAllowanceValue = {
  granter: string;
  grantee: string;
  allowance: BasicAllowanceValue;
};

export class MsgGrantAllowance extends TransactionMsg<MsgGrantAllowanceValue> {
  static TYPE = "/cosmos.feegrant.v1beta1.MsgGrantAllowance";
  static AMINO_TYPE = "cosmos-sdk/MsgGrantAllowance";

  constructor({ granter, grantee, allowance }: MsgGrantAllowanceValue) {
    super(MsgGrantAllowance.TYPE, MsgGrantAllowance.AMINO_TYPE, {
      granter,
      grantee,
      allowance,
    });
  }

  toCosmosMsg(): CosmosMsg {
    return {
      typeUrl: this.typeUrl,
      value: {
        ...this.value,
        allowance: new BasicAllowance(this.value.allowance).toCosmosMsg(),
      },
    };
  }

  toTerraExtensionMsg(): any {
    const basicAllowance = new BasicAllowance(this.value.allowance);
    return JSON.stringify({
      "@type": this.typeUrl,
      ...this.value,
      allowance: {
        "@type": basicAllowance.typeUrl,
        ...basicAllowance.value,
      },
    });
  }

  toAminoMsg(): AminoMsg {
    return {
      type: this.aminoTypeUrl,
      value: {
        ...this.value,
        allowance: new BasicAllowance(this.value.allowance).toAminoMsg(),
      },
    };
  }

  toProtoMsg(): ProtoMsg {
    const cosmosMsg = this.toCosmosMsg();
    return {
      typeUrl: this.typeUrl,
      value: CosmosMsgGrantAllowance.encode(CosmosMsgGrantAllowance.fromPartial(cosmosMsg.value)).finish(),
    };
  }
}

export default MsgGrantAllowance;
