// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ContractSDK, SubqueryNetwork, SdkOptions } from '@subql/contract-sdk';
import testnetDeployment from '@subql/contract-sdk/publish/testnet.json';
import { Signer } from 'ethers';

const deployments = {
  local: testnetDeployment,
  testnet: testnetDeployment,
  mainnet: testnetDeployment,
};

export enum ChainID {
  local = 1281,
  testnet = 595,
  mainnet = 1285,
}

function createContractOptions(network: SubqueryNetwork): SdkOptions {
  return {
    deploymentDetails: deployments[network],
    network,
  };
}

export const chainIds: Record<string, number> = {
  local: ChainID.local,
  testnet: ChainID.testnet,
  mainnet: ChainID.mainnet,
};

const options = {
  [ChainID.local]: createContractOptions('local'),
  [ChainID.testnet]: createContractOptions('testnet'),
  [ChainID.mainnet]: createContractOptions('mainnet'),
};

export async function initContractSDK(provider: Signer, chainID: ChainID): Promise<ContractSDK> {
  const sdk = await ContractSDK.create(provider, options[chainID]);
  return sdk;
}
