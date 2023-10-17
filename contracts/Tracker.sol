// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SimpleStruct {
    struct MyStruct {
        string escrowContractAddress;
        string arbiter;
        string beneficiary;
        string value;
    }

    // declare structList as an array of MyStruct
    MyStruct[] public structList;

    function addStruct(
        string calldata _escrowContractAddress,
        string calldata _arbiter,
        string calldata _beneficiary,
        string calldata _value
    ) external {
        MyStruct memory inputStruct = MyStruct(
            _escrowContractAddress,
            _arbiter,
            _beneficiary,
            _value
        );
        structList.push(inputStruct);
    }

    function getStructCount() public view returns (uint256) {
        return structList.length;
    }

    function getAllStructs() public view returns (MyStruct[] memory) {
        return structList;
    }
}
