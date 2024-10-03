import Layout from "./components/Layout";
import CreateProposalModal from "./components/CreateProposalModal";
import Proposals from "./components/Proposals";
import useContract from "./hooks/useContract";
import useRunners from "./hooks/useRunners";
import useProposals from "./hooks/useProposals";
import useModal from "./hooks/useModal";
import { Modal } from "./components/Modal";

function App() {
  const readOnlyProposalContract = useContract(true);
  const { readOnlyProvider } = useRunners();
  const { proposals, fetchProposals } = useProposals(
    readOnlyProposalContract,
    readOnlyProvider
  );
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <Layout>
      <div className="w-full flex my-5">
        <button
          className="bg-blue-500 p-4 text-white shadow-md rounded-md"
          onClick={openModal}
        >
          Create Proposal
        </button>
      </div>
      <Modal
        handleClose={closeModal}
        isOpen={isModalOpen}
        isSuccessModal
        title="Create Proposal"
      >
        <CreateProposalModal closeModal={closeModal} refetch={fetchProposals} />
      </Modal>
      <Proposals proposals={proposals} />
    </Layout>
  );
}

export default App;
