export const structContractABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_escrowContractAddress",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_arbiter",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_beneficiary",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_value",
          "type": "string"
        }
      ],
      "name": "addStruct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllStructs",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "escrowContractAddress",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "arbiter",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "beneficiary",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "value",
              "type": "string"
            }
          ],
          "internalType": "struct SimpleStruct.MyStruct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getStructCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "structList",
      "outputs": [
        {
          "internalType": "string",
          "name": "escrowContractAddress",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "arbiter",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "beneficiary",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "value",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]