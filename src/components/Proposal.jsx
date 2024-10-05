import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { formatEther } from "ethers";
import useVote from "../hooks/useVote";
import useExecute from "../hooks/useExecute";

const Proposal = ({
  description,
  amount,
  minRequiredVote,
  votecount,
  deadline,
  executed,
  proposalId,
}) => {
  const { vote, isLoading: isVoting } = useVote();
  const { execute, isLoading: isExecuting } = useExecute();

  const canExecute = Number(votecount) >= Number(minRequiredVote) && !executed;

  console.log(`Proposal ID: ${proposalId}`);
  console.log(`votecount: ${Number(votecount)}, minRequiredVote: ${Number(minRequiredVote)}, executed: ${executed}`);
  console.log(`canExecute: ${canExecute}`);

  return (
    <Box className="bg-slate-400 rounded-md shadow-sm p-4 w-96">
      <Text className="text-2xl mb-4">Proposals</Text>
      <Box className="w-full">
        <Flex className="flex gap-4">
          <Text>Description:</Text>
          <Text className="font-bold">{description}</Text>
        </Flex>
        <Flex className="flex gap-4">
          <Text>Amount:</Text>
          <Text className="font-bold">{formatEther(amount)} ETH</Text>
        </Flex>
        <Flex className="flex gap-4">
          <Text>Required Vote:</Text>
          <Text className="font-bold">{Number(minRequiredVote)}</Text>
        </Flex>
        <Flex className="flex gap-4">
          <Text>Vote Count:</Text>
          <Text className="font-bold">{Number(votecount)}</Text>
        </Flex>
        <Flex className="flex gap-4">
          <Text>Deadline:</Text>
          <Text className="font-bold">
            {new Date(Number(deadline) * 1000).toLocaleDateString()}
          </Text>
        </Flex>
        <Flex className="flex gap-4">
          <Text>Executed:</Text>
          <Text className="font-bold">{String(executed)}</Text>
        </Flex>
      </Box>

      <Button
        onClick={() => vote(proposalId)}
        disabled={executed || isVoting}
        className="bg-blue-500 text-white font-bold w-full mt-4 p-4 rounded-md shadow-sm"
      >
        {isVoting ? "Voting..." : "Vote"}
      </Button>

      {canExecute && (
        <Button
          onClick={() => execute(proposalId)}
          disabled={isExecuting}
          className="bg-yellow-500 text-white font-bold w-full mt-4 p-4 rounded-md shadow-sm"
        >
          {isExecuting ? "Executing..." : "Execute"}
        </Button>
      )}
    </Box>
  );
};

export default Proposal;
