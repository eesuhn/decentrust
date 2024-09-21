// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../contracts/CompanyFactory.sol";
import "../contracts/Company.sol";

contract CompanyFactoryTest is Test {
    CompanyFactory factory;
    address owner1 = address(0x1);
    address owner2 = address(0x2);

    function setUp() public {
        factory = new CompanyFactory();
    }

    function testCreateMultipleCompanies() public {
        vm.prank(owner1);
        factory.createCompany("CompanyPublicKey1");

        vm.prank(owner2);
        factory.createCompany("CompanyPublicKey2");

        address[] memory companies = factory.getCompanies();
        assertEq(companies.length, 2);

        // Verify owners
        address company1Owner = Company(companies[0]).owner();
        address company2Owner = Company(companies[1]).owner();

        assertEq(company1Owner, owner1);
        assertEq(company2Owner, owner2);
    }

    function testCompanyCreationEvent() public {
       testCreateMultipleCompanies();
       //test the mapping call the mapping of the contract through the factory 
       address[] memory companies = factory.getCompanies();
       assertEq(companies.length, 2);
       address company1 = companies[0];
       address company2 = companies[1];
       assertEq(Company(company1).owner(), owner1);
       assertEq(Company(company2).owner(), owner2);

        // Since the event contains the actual contract address, we can't assert the address beforehand.
        // Instead, we can check that the event was emitted with the correct owner.
    }
}
