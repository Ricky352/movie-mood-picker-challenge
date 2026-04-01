
interface HeaderProps {
  onFavoritesClick: () => void
  favoritesCount: number
}

export const Header = ({ onFavoritesClick, favoritesCount }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        {/*<div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"*/}
        {/*  style={{*/}
        {/*    background: "linear-gradient(135deg, #f5576c, #667eea)",*/}
        {/*    boxShadow: "0 4px 20px rgba(245, 87, 108, 0.3)",*/}
        {/*  }}*/}
        {/*>*/}
        {/*  🎬*/}
        {/*</div>*/}
        <div>
          <h1 className="text-xl font-extrabold text-white">
            Mood Picker
          </h1>
          <p className="text-xs text-white/35 uppercase tracking-widest">
            Movies for every feeling
          </p>
        </div>
      </div>

      {/*<div className="flex items-center gap-3">*/}
      {/*  /!* Favorites *!/*/}
      {/*  <button*/}
      {/*    onClick={onFavoritesClick}*/}
      {/*    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 backdrop-blur-md whitespace-nowrap transition-all duration-300 hover:text-white/90"*/}
      {/*    style={{*/}
      {/*      background: "rgba(255,255,255,0.04)",*/}
      {/*      border: "1px solid rgba(255,255,255,0.08)",*/}
      {/*    }}*/}
      {/*    onMouseEnter={(e) => {*/}
      {/*      e.currentTarget.style.background = "rgba(255,255,255,0.08)"*/}
      {/*      e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"*/}
      {/*    }}*/}
      {/*    onMouseLeave={(e) => {*/}
      {/*      e.currentTarget.style.background = "rgba(255,255,255,0.04)"*/}
      {/*      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <span>♥</span>*/}
      {/*    <span>Favorites</span>*/}
      {/*    {favoritesCount > 0 && (*/}
      {/*      <span className="bg-white/10 text-white/80 text-xs px-1.5 py-0.5 rounded-full">*/}
      {/*        {favoritesCount}*/}
      {/*      </span>*/}
      {/*    )}*/}
      {/*  </button>*/}
      {/*</div>*/}
    </header>
  )
}
