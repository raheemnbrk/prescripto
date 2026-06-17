export default function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-2 h-screen">
      <div className="w-3 h-3 rounded-full bg-main animate-bounce [animation-delay:-0.3s]" />
      <div className="w-3 h-3 rounded-full bg-main animate-bounce [animation-delay:-0.15s]" />
      <div className="w-3 h-3 rounded-full bg-main animate-bounce" />
    </div>
  );
}
