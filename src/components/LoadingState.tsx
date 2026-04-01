export const LoadingState = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-lilac-ash-700 border-t-lilac-ash-400 rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-lilac-ash-400">Loading movies...</p>
      </div>
    </div>
  )
}
