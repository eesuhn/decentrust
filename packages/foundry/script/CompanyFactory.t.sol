// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
// import {CaseFactory} from "../src/CaseFactory.sol";

contract CaseFactory is Script {
    CaseFactory public ccf;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // ccf = new CaseFactory();

        vm.stopBroadcast();
    }
}
