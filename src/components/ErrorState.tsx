interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <p className="text-red-400 mb-4">{message}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-lilac-ash-600 text-lilac-ash-50 rounded-lg hover:bg-lilac-ash-500 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
