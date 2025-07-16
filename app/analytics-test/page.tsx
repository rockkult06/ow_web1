export default function AnalyticsTest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
      <div className="text-center max-w-md mx-auto p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6">
          Analytics Test Sayfası
        </h1>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            Bu sayfa Google Analytics testi için oluşturulmuştur.
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-800 mb-2">Test Adımları:</h3>
            <ol className="text-sm text-gray-600 text-left space-y-1">
              <li>1. F12 tuşuna basın</li>
              <li>2. Console sekmesine gidin</li>
              <li>3. "Google Analytics loaded" mesajını arayın</li>
              <li>4. Network sekmesinde analytics isteklerini kontrol edin</li>
            </ol>
          </div>
          
          <button 
            onClick={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'button_click', {
                  event_category: 'test',
                  event_label: 'analytics_test'
                });
                alert('Test event gönderildi!');
              } else {
                alert('Google Analytics yüklenmemiş!');
              }
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Test Event Gönder
          </button>
        </div>
      </div>
    </div>
  )
} 