import * as fcl from "@onflow/fcl"
// Different from the response of FCL
// We don't need to show every status to users
export const TxStatus = {
  // Initializing: Initialing
  // the transaction is waiting to be approved
  initializing() {
    return { status: "Initializing", error: null, txid: null }
  },
  // Pending: Pending & Finalized & Executed
  // the transaction has not been confirmed on chain
  pending(txid) {
    return { status: "Pending", error: null, txid: txid }
  },
  // Success: Sealed with no error
  success(txid) {
    return { status: "Success", error: null, txid: txid }
  },
  // Failed: Sealed with error
  failed(error, txid) {
    return { status: "Failed", error: error, txid: txid }
  }
}

export const createKey = async (
  publicKey,
  signAlgo,
  hashAlgo,
  weight,
  setTransactionInProgress,
  setTransactionStatus
) => {
  const txFunc = async () => {
    return await doCreateKey(publicKey, signAlgo, hashAlgo, weight)
  }

  return await txHandler(txFunc, setTransactionInProgress, setTransactionStatus)
}

const doCreateKey = async (publicKey, signAlgo, hashAlgo, weight) => {
  const code = `
  transaction(
    publicKey: String,
    signAlgo: UInt8,
    hashAlgo: UInt8,
    weight: UFix64
  ) {
    prepare(signer: AuthAccount) {
      let pubkey = PublicKey(
        publicKey: publicKey.decodeHex(),
        signatureAlgorithm: SignatureAlgorithm(rawValue: signAlgo)!
      )

      signer.keys.add(
        publicKey: pubkey,
        hashAlgorithm: HashAlgorithm(rawValue: hashAlgo)!,
        weight: weight
      )
    }
  }
  `

  const transactionId = await fcl.mutate({
    cadence: code,
    args: (arg, t) => [
      arg(publicKey, t.String),
      arg(signAlgo, t.UInt8),
      arg(hashAlgo, t.UInt8),
      arg(`${weight}.0`, t.UFix64),
    ],
    proposer: fcl.currentUser,
    payer: fcl.currentUser,
    limit: 9999
  })

  return transactionId
}


export const revokeKey = async (
  keyIndex,
  setTransactionInProgress,
  setTransactionStatus
) => {
  const txFunc = async () => {
    return await doRevokeKey(keyIndex)
  }

  return await txHandler(txFunc, setTransactionInProgress, setTransactionStatus)
}

const doRevokeKey = async (keyIndex) => {
  const code = `
  transaction(keyIndex: Int) {
    prepare(signer: AuthAccount) {
      signer.keys.revoke(keyIndex: keyIndex)
    }
  }
  `

  const transactionId = await fcl.mutate({
    cadence: code,
    args: (arg, t) => [
      arg(`${keyIndex}`, t.Int)
    ],
    proposer: fcl.currentUser,
    payer: fcl.currentUser,
    limit: 9999
  })

  return transactionId
}


export const unlink = async (
  path,
  setTransactionInProgress,
  setTransactionStatus
) => {
  const txFunc = async () => {
    return await doUnlink(path)
  }

  return await txHandler(txFunc, setTransactionInProgress, setTransactionStatus)
}

const doUnlink = async (path) => {
  const code = `
  transaction() {
    prepare(signer: AuthAccount) {
      signer.unlink(${path})
    }
  }
  `

  const transactionId = await fcl.mutate({
    cadence: code,
    proposer: fcl.currentUser,
    payer: fcl.currentUser,
    limit: 9999
  })

  return transactionId
}

export const destroy = async (
  path,
  setTransactionInProgress,
  setTransactionStatus
) => {
  const txFunc = async () => {
    return await doDestroy(path)
  }

  return await txHandler(txFunc, setTransactionInProgress, setTransactionStatus)
}

const doDestroy = async (path) => {
  const code = `
  transaction() {
    prepare(signer: AuthAccount) {
      if let rsc <- signer.load<@AnyResource>(from: ${path}) {
        destroy rsc
      }
    }
  }
  `

  const transactionId = await fcl.mutate({
    cadence: code,
    proposer: fcl.currentUser,
    payer: fcl.currentUser,
    limit: 9999
  })

  return transactionId
}

export const txHandler = async (
  txFunc,
  setTransactionInProgress,
  setTransactionStatus
) => {
  let transactionId = null
  setTransactionInProgress(true)
  setTransactionStatus(TxStatus.initializing())

  try {
    transactionId = await txFunc()
    setTransactionStatus(TxStatus.pending(transactionId))

    let res = await fcl.tx(transactionId).onceSealed()
    if (res.status === 4) {
      if (res.statusCode === 0) {
        setTransactionStatus(TxStatus.success(transactionId))
      } else {
        setTransactionStatus(TxStatus.failed(res.errorMessage, transactionId))
      }
      setTimeout(() => setTransactionInProgress(false), 3000)
    }
    return res
  } catch (e) {
    console.log(e)
    setTransactionStatus(TxStatus.failed(e, null))
    setTimeout(() => setTransactionInProgress(false), 3000)
  }
}