import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitNetwork } from "@reown/appkit/react";
import { liskSepoliaNetwork } from "../connection";

const useExecute = () => {
  const contract = useContract(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (proposalId) => {
      if (!proposalId) {git 
        toast.error("Proposal ID is required");
        return;
      }
      if (!address) {
        toast.error("Connect your wallet!");
        return;
      }
      if (Number(chainId) !== liskSepoliaNetwork.chainId) {
        toast.error("You are not connected to the right network");
        return;
      }
      if (!contract) {
        toast.error("Cannot get contract!");
        return;
      }

      try {
        setIsLoading(true);
        const estimatedGas = await contract.executeProposal.estimateGas(proposalId);
        const tx = await contract.executeProposal(proposalId, {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        });
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Execution successful");
          return;
        }
        toast.error("Execution failed");
        return;
      } catch (error) {
        console.error("Error while voting: ", error);

        
        if (
          error.reason === "Already voted on this proposal" ||
          (error.revert && error.revert.args[0] === "Already voted on this proposal")
        ) {
          toast.error("You have already voted on this proposal.");
          return;
        }

        // rejection error MetaMask
        if (error.code === 4001) {
          toast.error("Transaction rejected by the user.");
          return;
        }

        // General error fallback
        toast.error("An error occurred during the Execute. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [address, chainId, contract]
  );
  return { execute, isLoading };
};

export default useExecute;
