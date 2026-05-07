export default function MobileRestricted() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-sm mx-4 text-center">
        <div className="text-5xl mb-4">📱</div>
        <h2 className="text-white text-xl font-bold mb-2">
          Mobile Access Restricted
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          Mobile access is allowed only between
        </p>
        <p className="text-blue-400 text-lg font-semibold mb-6">
          10:00 AM – 1:00 PM IST
        </p>
        <p className="text-gray-500 text-xs">
          Please visit us during the allowed hours or use a desktop browser.
        </p>
      </div>
    </div>
  );
}