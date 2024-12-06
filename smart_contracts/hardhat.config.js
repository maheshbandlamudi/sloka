//https://eth-sepolia.g.alchemy.com/v2/cqaToaRIXc8po017t--OZZG07a24HhFV

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/cqaToaRIXc8po017t--OZZG07a24HhFV',
      accounts: ['a9d10828b52cfff54098695daa8bc30807bd315608962a923e73430d3a5c328f']
    }
  }
}