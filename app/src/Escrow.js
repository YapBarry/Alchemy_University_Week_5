import { ethers } from 'ethers';

export default function Escrow({
  escrowContractAddress,
  arbiter,
  beneficiary,
  value,
  handleApprove,
}) {
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Escrow Contract Address: </div>
          <div> {escrowContractAddress} </div>
        </li>
        <li>
          <div> Arbiter: </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary: </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value: </div>
          <div> {ethers.utils.formatEther(value)} Eth </div>
        </li>
        <div
          className="button"
          id={escrowContractAddress}
          onClick={(e) => {
            e.preventDefault();

            handleApprove();
          }}
        >
          Approve
        </div>
      </ul>
    </div>
  );
}