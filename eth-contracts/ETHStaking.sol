pragma solidity 0.6.12;

import "../interfaces/IBeaconDeposit.sol";
import "./bxlETH.sol";

contract ETHStaking is bxlETH {
    // Represent contract owner address
    address public owner;
    // Represent amount of ETH in validators
    uint256 public totalBalanceETHInValidators;
    // Represent total rewards collected
    uint256 public totalRewardsCollected;
    // Represent total bxlETH minted
    uint256 public totalbxlETHMinted;
    // Represent instance of BeaconDeposit contract
    IBeaconDeposit public beaconDeposit;
    // Mapping pub-keys of validators to is initialized bool
    mapping(bytes => bool) public isValidatorInitialized;
    uint256 public get;

    //Events
    event Deposit(address account, uint256 amountDeposited);
    event Withdraw(address account, uint256 amountWithdrawn);
    event LaunchNewValidator(address account, uint256 amountWithdrawn);
    event StakingStatsUpdated(uint256 newRewardsAmount, uint256 newTotalETHBalanceInValidators, uint256 totalMinted);
    event EthReceived(address account, uint256 amountETH);

    /**
         * @dev     Callable only by owner
     */
    modifier onlyOwner {
        require(owner == msg.sender, "only owner");
        _;
    }

    /**
        * @param _beaconDeposit is the address of the beacon deposit contract
        * @param _owner is the address of the owner
     */
    constructor(
        address _beaconDeposit,
        address _owner,
        string memory name_,
        string memory symbol_,
        uint8 decimals_
    )
    public
    {
        require(_beaconDeposit != address(0) && _owner != address(0), "0x0");

        beaconDeposit = IBeaconDeposit(_beaconDeposit);
        owner = _owner;
        set(name_, symbol_, decimals_);
    }

    function set(uint256 number) external {
        get = number;
    }

    /**
         * @notice          Fallback function to receive ETH
     */
    receive() external payable {
        emit EthReceived(msg.sender, msg.value);
    }

    /**
        * @notice  Function sets validators stats.
        * @dev     Callable only by admin.
     */
    function setValidatorStats(
        uint256 newRewardsAmount,
        uint256 newTotalETHBalanceInValidators,
        uint256 _totalbxlETHMinted
    )
    external
    onlyOwner
    {
        require(totalRewardsCollected <= newRewardsAmount, "Wrong newRewardsAmount amount");

        totalRewardsCollected = newRewardsAmount;
        totalBalanceETHInValidators =  newTotalETHBalanceInValidators;
        totalbxlETHMinted = _totalbxlETHMinted;

        emit StakingStatsUpdated(totalRewardsCollected, totalBalanceETHInValidators, totalbxlETHMinted);
    }

    /**
         * @notice          Withdraws funds for launching new validator. Sends funds to beaconchain deposit contract.
         * @dev             Callable only by admin.
         * @param           pubkey - The public key of the validator is the 48 byte (compressed) BLS public key.
         * @param           withdrawal_credentials is 32 bytes of 0x01 Eth1 credentials. Which represents address on
                            execution layer where funds from both partial and fully withdrawal will go.
         * @param           signature - The signature is a 96 Byte BLS signature. It is generated by signing the hash
                            tree root of a DepositMessage object (public_key, withdrawal_credentials, and
                            deposit_amount), with the validator's signing key.
         * @param           deposit_data_root - The deposit_data_root is the quantity (node) that will be inserted as a
                            new leaf in the Merkle tree and forms part of the verification of a deposit
                            on the consensus layer.
     */
    function launchNewValidator(
        bytes calldata pubkey,
        bytes calldata withdrawal_credentials,
        bytes calldata signature,
        bytes32 deposit_data_root
    )
    external
    onlyOwner
    {
        require(isValidatorInitialized[pubkey] == false, "validator is already initialized");

        uint256 amountToWithdraw = 32 ether;

        require(address(this).balance >= amountToWithdraw, "dont have enough funds");

        // Update pool information
        totalBalanceETHInValidators = totalBalanceETHInValidators.add(amountToWithdraw);
        isValidatorInitialized[pubkey] = true;

        beaconDeposit.deposit{
                value: amountToWithdraw
            }(pubkey, withdrawal_credentials, signature, deposit_data_root);

        emit LaunchNewValidator(msg.sender, amountToWithdraw);
    }

    /**
         * @notice User calls this function when he wants to deposit ETH
     */
    function userDepositETH()
    payable
    external
    {
        require(msg.value > 0, "msg value is not correct");

        uint256 amountForMint = getAmountOfbxlETHforETH(msg.value, true);

        // Mint bxlETH for user
        _mint(msg.sender, amountForMint);
        totalbxlETHMinted = totalbxlETHMinted.add(amountForMint);

        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amountbxlETHToRedeem) external {
        require(
            balanceOf(msg.sender) >= amountbxlETHToRedeem,
            "User wants to withdraw more than he has."
        );

        _burn(msg.sender, amountbxlETHToRedeem);
        totalbxlETHMinted = totalbxlETHMinted.sub(amountbxlETHToRedeem);

        uint256 one = 1e18;
        uint256 ratio = getAmountOfbxlETHforETH(one, false);
        uint256 amountETHToWithdraw = one.mul(amountbxlETHToRedeem).div(ratio);

        bool sent = payable(msg.sender).send(amountETHToWithdraw);
        require(sent, "Failed to send Ether");

        emit Withdraw(msg.sender, amountETHToWithdraw);
    }

    /**
         * @notice          Calculates how much bxlETH worth some amount of ETH.
     */
    function getAmountOfbxlETHforETH(
        uint256 amountETH,
        bool isContractCall
    )
    public
    view
    returns (uint256 result)
    {
        if(totalbxlETHMinted == 0) {
            return amountETH;
        }

        uint256 totalETHInPossession;

        if(isContractCall) {
            totalETHInPossession = totalBalanceETHInValidators
                .add(address(this).balance)
                .sub(amountETH);
        } else {
            totalETHInPossession = totalBalanceETHInValidators
                .add(address(this).balance);
        }

        uint256 bxlETHRatio = totalbxlETHMinted.mul(1 ether).div(totalETHInPossession);

        result = amountETH.mul(bxlETHRatio).div(1 ether);
    }
}