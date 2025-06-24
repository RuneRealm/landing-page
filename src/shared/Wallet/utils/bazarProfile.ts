import { ProfileClient, ProfileRegistryClient } from 'ao-js-sdk';
import { BazarProfile } from '../types';
import { profileCache } from './profileCache';

export const checkBazarProfile = async (address: string, retryCount = 0): Promise<BazarProfile | null> => {
  try {
    // Check cache first
    const cachedProfile = profileCache.getProfile(address);
    if (cachedProfile) {
      console.log("=== Using cached Bazar profile ===");
      return cachedProfile;
    }

    const profileClient = await ProfileClient.autoConfiguration()
    const profile = await profileClient.getProfileInfo()
    profileCache.setProfile(address, profile.Profile);

    return null;
  } catch (error) {
    console.error("Error checking Bazar profile:", error);
    
    // Retry logic for network issues
    if (retryCount < 3) {
      console.log(`Retrying... (attempt ${retryCount + 1})`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
      return checkBazarProfile(address, retryCount + 1);
    }
    
    return null;
  }
};
