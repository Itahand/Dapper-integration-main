import publicConfig from '../publicConfig'

export default function Home() {

  return (
    <div className="container mx-auto max-w-7xl min-w-[380px] px-6">
      <div className={`flex flex-col items-center ${publicConfig.chainEnv === "emulator" ? "mt-0" : "mt-20"} mb-20 gap-y-12 justify-stretch`}>
        {
          publicConfig.chainEnv === "emulator" ? 
          <div className='flex flex-col px-3 py-2 bg-drizzle-light rounded-xl text-base'>
            <label>Please make sure that:</label>
            <label>1. The emulator started with <code className="text-sm">--contracts</code></label>
            <label>2. The emulator started WITHOUT <code className="text-sm">--simple-addresses</code></label>
            <label>3. The port of emulator is 8888</label>
            <label>4. The port of dev-wallet is 8701</label>
          </div> : null
        }
        <div className="flex gap-x-2 sm:gap-x-4 items-center">
          <label className="font-flow font-bold text-2xl sm:text-4xl">
            Connect your Wallet to fetch your NFTs
          </label>
        </div>
      </div>
    </div>
  )
}
