import Image from "next/image"

export default function NFTDisplay(props) {
  const { display, width, height, titleSize } = props
  const w = width ? width : "w-32"
  const h = height ? height : "h-52"
  const t = titleSize ? titleSize : "text-xs"
  return (
    <div className={`${w} ${h} bg-white rounded-2xl flex flex-col gap-y-1 pb-2 justify-between items-center shrink-0 overflow-hidden shadow-md ring-1 ring-black ring-opacity-5`}>
      <div className="w-full rounded-t-2xl aspect-square bg-drizzle-ultralight relative overflow-hidden">
        <Image className={"object-contain"} src={display.imageSrc || "/token_placeholder.png"} fill alt="" sizes="5vw" />
      </div>
      <label className="px-3 max-h-12 break-words overflow-hidden text-ellipsis font-flow font-semibold text-xs text-black">
        {`${display.name}`}
      </label>
      <label className="px-3 font-flow font-medium text-xs text-gray-400">
        {`#${display.tokenID}`}
      </label>
    </div>
  )
}