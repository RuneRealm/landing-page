import React, { createContext, useState, useContext, useEffect, useCallback, useRef, ReactNode } from 'react';
import { PIDelegateClient } from 'ao-js-sdk';

// Define the shape of a delegation
interface Delegation {
    delegatee: string;
    percentage: string;
}

// Define the context value shape
interface DelegationContextValue {
    delegations: Delegation[];
    loading: boolean;
    settingDelegation: boolean;
    fetchDelegations: () => Promise<void>;
    setGameDelegation: () => Promise<void>;
    connected: boolean;
}

// Create the context with a default value
const DelegationContext = createContext<DelegationContextValue>({
    delegations: [],
    loading: false,
    settingDelegation: false,
    fetchDelegations: async () => { },
    setGameDelegation: async () => { },
    connected: false,
});

// Provider props
interface DelegationProviderProps {
    children: ReactNode;
}

/**
 * Provider component that manages delegation state and operations
 */
export const DelegationProvider: React.FC<DelegationProviderProps> = ({ children }) => {
    // Mock wallet connection state
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState<string | null>(null);
    const [delegations, setDelegations] = useState<Delegation[]>([]);
    const [loading, setLoading] = useState(false);
    const [settingDelegation, setSettingDelegation] = useState(false);
    const isFetchingRef = useRef(false);
    
    // Simulate wallet connection (in a real app, this would use the actual wallet SDK)
    useEffect(() => {
        // For demo purposes, we'll simulate being connected after a delay
        const timer = setTimeout(() => {
            setConnected(true);
            setAddress('demo-wallet-address');
        }, 2000);
        
        return () => clearTimeout(timer);
    }, []);

    // Fetch delegations from the AO network
    const fetchDelegations = useCallback(async () => {
        // Check connection and address
        if (!connected || !address) return;
        
        // Prevent multiple simultaneous fetches
        if (loading || isFetchingRef.current) return;
        
        // Set ref to true to prevent concurrent calls
        isFetchingRef.current = true;

        try {
            setLoading(true);
            const client = await PIDelegateClient.autoConfiguration();
            const delegationData = await client.getDelegation(address);

            if (delegationData) {
                const parsedDelegations = client.parseDelegationInfo(delegationData);
                setDelegations(Array.isArray(parsedDelegations?.delegationPrefs)
                    ? parsedDelegations.delegationPrefs.map(pref => ({
                        delegatee: pref.walletTo,
                        percentage: (pref.factor / 100).toFixed(2)
                    }))
                    : []);
            } else {
                setDelegations([]);
            }
        } catch (error) {
            console.error('Error fetching delegations:', error);
            setDelegations([]);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, [connected, address]); // Remove loading from dependencies

    // Set $GAME as the sole delegate (100%)
    const setGameDelegation = useCallback(async () => {
        if (!connected || !address) return;

        try {
            setSettingDelegation(true);
            const client = await PIDelegateClient.autoConfiguration();

            // Factor is in basis points (10000 = 100%)
            await client.setDelegation({
                walletFrom: address,
                walletTo: 'GAME',
                factor: 10000 // 100% in basis points
            });

            // Refresh delegations after setting
            await fetchDelegations();
        } catch (error) {
            console.error('Error setting delegation:', error);
        } finally {
            setSettingDelegation(false);
        }
    }, [connected, address, fetchDelegations]);
    
    // Fetch delegations when wallet connection or address changes
    useEffect(() => {
        let isMounted = true;
        
        if (connected && address && isMounted) {
            // Add a small delay to prevent immediate fetching on mount
            const timer = setTimeout(() => {
                if (isMounted) {
                    fetchDelegations();
                }
            }, 500);
            
            return () => {
                isMounted = false;
                clearTimeout(timer);
            };
        }
    }, [connected, address, fetchDelegations]);
    
    // Context value
    const value = {
        delegations,
        loading,
        settingDelegation,
        fetchDelegations,
        setGameDelegation,
        connected,
    };

    return (
        <DelegationContext.Provider value={value}>
            {children}
        </DelegationContext.Provider>
    );
};

/**
 * Custom hook to access delegation context
 */
export const useDelegation = () => useContext(DelegationContext);
