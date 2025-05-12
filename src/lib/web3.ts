import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Magic } from 'magic-sdk';

// Initialize Magic for email-based logins
const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!);

// Initialize Thirdweb SDK for Polygon
const sdk = new ThirdwebSDK("polygon");

// TFB Token Contract
export const tokenContract = await sdk.getContract(
  process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS!
);

// Reward distribution function
export async function distributeRewards(userId: string, amount: number) {
  try {
    const tx = await tokenContract.erc20.transfer(userId, amount);
    return tx;
  } catch (error) {
    console.error("Error distributing rewards:", error);
    throw error;
  }
}

// Reward amounts
export const REWARD_AMOUNTS = {
  ARTICLE: 5,
  COMMENT: 1,
  EVENT: 3
};

// Parental consent check
export async function checkParentalConsent(userId: string): Promise<boolean> {
  // TODO: Implement parental consent verification
  return true;
}

// Token balance check
export async function getTokenBalance(userId: string): Promise<number> {
  try {
    const balance = await tokenContract.erc20.balanceOf(userId);
    return Number(balance);
  } catch (error) {
    console.error("Error getting token balance:", error);
    return 0;
  }
} 