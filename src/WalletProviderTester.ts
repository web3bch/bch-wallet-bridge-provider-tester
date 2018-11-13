import IWalletProvider from "bch-wallet-bridge-provider-interface/lib/IWalletProvider"

class WalletProviderTester {
    constructor(public walletProvider: IWalletProvider) {}

    //
    // getVersion
    //
    public testGetVersion(): Promise<boolean> {
        return this.walletProvider
        .getVersion()
        .then((version) => {
            if (typeof version !== "string") {
              throw new Error("The return value is invalid.")
            }
            return true
          })
    }

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
