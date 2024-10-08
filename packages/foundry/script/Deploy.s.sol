//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/CompanyFactory.sol";
import "../contracts/Company.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);
        // vm.addr(deployerPrivateKey)
        CompanyFactory companyFactory = new CompanyFactory();
        console.logString(
            string.concat(
                "CompanyFactory deployed at: ",
                vm.toString(address(companyFactory))
            )
        );
        Company company = new Company(
            vm.addr(deployerPrivateKey),
            "somepublic",
            "DecenTrust"
        );
        console.logString(
            string.concat(
                "Company deployed at: ",
                vm.toString(address(company))
            )
        );
        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
