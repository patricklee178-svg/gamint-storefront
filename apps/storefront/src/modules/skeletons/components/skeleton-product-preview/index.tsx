const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-[9/16] w-full rounded-2xl border border-white/10 bg-white/10" />
      <div className="flex justify-between text-base-regular mt-2">
        <div className="w-2/5 h-6 rounded-md bg-white/10"></div>
        <div className="w-1/5 h-6 rounded-md bg-white/10"></div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
