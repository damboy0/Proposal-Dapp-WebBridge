import { useState } from "react";
import useCreateProposal from "../hooks/useCreateProposal";

const CreateProposalModal = ({ refetch, closeModal }) => {
  const { createProposal, isLoading } = useCreateProposal(refetch, closeModal);
  const [state, setState] = useState({
    description: "",
    recipient: "",
    amount: "",
    duration: "",
    minVote: 1,
  });

  const handleInputChange = (name, e) => {
    setState((preState) => ({ ...preState, [name]: e.target.value }));
  };

  const { amount, duration, description, minVote, recipient } = state;

  const handleCreate = async () => {
    await createProposal(description, recipient, amount, duration, minVote);
  };

  return (
    <div>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label
          className="text-violet11 w-[90px] text-right text-[15px]"
          htmlFor="name"
        >
          Description
        </label>
        <input
          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="name"
          type="text"
          value={description}
          onChange={(e) => handleInputChange("description", e)}
        />
      </fieldset>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label
          className="text-violet11 w-[90px] text-right text-[15px]"
          htmlFor="username"
        >
          Recipient
        </label>
        <input
          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="username"
          type="text"
          value={recipient}
          onChange={(e) => handleInputChange("recipient", e)}
        />
      </fieldset>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label
          className="text-violet11 w-[90px] text-right text-[15px]"
          htmlFor="username"
        >
          Amount
        </label>
        <input
          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="username"
          type="text"
          value={amount}
          onChange={(e) => handleInputChange("amount", e)}
        />
      </fieldset>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label
          className="text-violet11 w-[90px] text-right text-[15px]"
          htmlFor="username"
        >
          Duration
        </label>
        <input
          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="username"
          type="text"
          value={duration}
          onChange={(e) => handleInputChange("duration", e)}
        />
      </fieldset>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label
          className="text-violet11 w-[90px] text-right text-[15px]"
          htmlFor="username"
        >
          Min Required Votes
        </label>
        <input
          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="username"
          type="text"
          value={minVote}
          onChange={(e) => handleInputChange("minVote", e)}
        />
      </fieldset>
      <div className="mt-[25px] flex w-full">
        <button
          className="block w-full bg-blue-500 p-4 text-white items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
          disabled={isLoading}
          onClick={handleCreate}
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CreateProposalModal;
