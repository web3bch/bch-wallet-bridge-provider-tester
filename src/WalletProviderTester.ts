import IWalletProvider from "bch-wallet-bridge-provider-interface/lib/IWalletProvider"

class WalletProviderTester {
    constructor(public walletProvider: IWalletProvider) {}

    //
    // getVersion
    //

    //
    // getAddresses
    //
    public testGetAddresses(): Promise<boolean> {
        return this.walletProvider
        .getAddresses(0, 10, 0, undefined)
        .then((addresses) => {
            const address = addresses[0]
            if (typeof address !== "string") {
              throw new Error("The return value is invalid.")
            }
            return addresses.length === 10
          })
    }

    //
    // getAddressIndex
    //

    //
    // getRedeemScripts
    //

    //
    // addRedeemScript
    //

    //
    // getSpendableUtxos
    //

    //
    // getUnspendableUtxos
    //

    //
    // sign
    //

    //
    // createSignedTx
    //
    public async testCreateSignedTx(): Promise<boolean> {
        const rawtx = await this.walletProvider.createSignedTx([
            {
                lockScript: "76a91467b2e55ada06c869547e93288a4cf7377211f1f088ac",
                amount: 10000
            }
        ])
        if (typeof rawtx !== "string") {
            throw new Error("The return value is invalid.")
          }
        return true
    }

    //
    // getProtocolVersion
    //

    //
    // getNetworkMagic
    //

    //
    // getFeePerByte
    //
}
