// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ISPHook } from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import { ISP } from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import { Attestation } from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract OfferLetterHook is ISPHook, Ownable {
    // Mapping to store authorized companies
    mapping(address => bool) public authorizedCompanies;

    // Event to log authorization changes
    event CompanyAuthorizationChanged(address indexed company, bool authorized);

    // Error definitions
    error UnauthorizedCompany();
    error InvalidAttestationData();

    constructor() Ownable(msg.sender) {}

    // Function to authorize a company
    function setCompanyAuthorization(address company, bool authorized) external onlyOwner {
        authorizedCompanies[company] = authorized;
        emit CompanyAuthorizationChanged(company, authorized);
    }

    // Internal function to validate the attestation
    function _validateAttestation(uint64 attestationId) internal view {
        // Retrieve the attestation from Sign Protocol
        Attestation memory attestation = ISP(_msgSender()).getAttestation(attestationId);

        // Ensure the attester (company) is authorized
        if (!authorizedCompanies[attestation.attester]) {
            revert UnauthorizedCompany();
        }

        // Additional validation logic can be added here
        // For example, check the attestation data format or contents
    }

    // Implement the ISPHook interface functions
    function didReceiveAttestation(
        address, // attester
        uint64,  // schemaId
        uint64 attestationId,
        bytes calldata // extraData
    ) external payable override {
        _validateAttestation(attestationId);
    }

    function didReceiveAttestation(
        address, // attester
        uint64,  // schemaId
        uint64,  // attestationId
        IERC20,  // resolverFeeERC20Token
        uint256, // resolverFeeERC20Amount
        bytes calldata // extraData
    ) external pure override {
        revert("Unsupported operation");
    }

    function didReceiveRevocation(
        address, // attester
        uint64,  // schemaId
        uint64,  // attestationId
        bytes calldata // extraData
    ) external payable override {
        // Implement revocation logic if needed
        revert("Unsupported operation");
    }

    function didReceiveRevocation(
        address, // attester
        uint64,  // schemaId
        uint64,  // attestationId
        IERC20,  // resolverFeeERC20Token
        uint256, // resolverFeeERC20Amount
        bytes calldata // extraData
    ) external pure override {
        revert("Unsupported operation");
    }
}
