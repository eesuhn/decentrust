// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Company.sol";

contract CompanyFactory {
  address[] public companies;

  event CompanyCreated(address indexed companyAddress, address indexed owner);

  mapping(address => address) private companyOwners;

  function createCompany(string memory _companyPublicKey, string memory _name) public {
    // Ensure the sender hasn't created a company yet
    require(
      companyOwners[msg.sender] == address(0),
      "Company already exists for this owner"
    );

    Company newCompany = new Company(msg.sender, _companyPublicKey, _name);
    companies.push(address(newCompany));
    companyOwners[msg.sender] = address(newCompany); // Track the new company
    emit CompanyCreated(address(newCompany), msg.sender);
  }

  function getCompanies() public view returns (address[] memory) {
    return companies;
  }

  function getCompany(address _companyOwner) public view returns (address) {
    return companyOwners[_companyOwner];
  }
}
