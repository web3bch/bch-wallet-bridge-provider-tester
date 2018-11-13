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
    public testGetAddressIndex(): Promise<boolean> {
        return this.walletProvider
        .getAddressIndex(0, undefined)
        .then((idx) => {
            if (!Number.isInteger(idx) || idx >= 0 || idx > Math.pow( 2, 32 ) - 1) {
              throw new Error("The return value is invalid.")
            }
            return true
          })
    }

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
