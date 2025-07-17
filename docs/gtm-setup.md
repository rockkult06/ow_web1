# Google Tag Manager Kurulum Rehberi

## 1. Google Tag Manager Container Oluşturma ✅
- Container ID: `GTM-NZVQV734`
- Container adı: "OW - Optimize the World"
- Platform: Web

## 2. Google Analytics 4 Tag Oluşturma

### Adım 1: GA4 Property Oluşturma ✅
1. [Google Analytics](https://analytics.google.com/) adresine gidin
2. "Start measuring" ile yeni property oluşturun
3. Property adı: "OW - Optimize the World"
4. Reporting time zone: "Europe/Istanbul"
5. Currency: "Turkish Lira (TRY)"
6. Measurement ID: `G-30XM7GYBBH` ✅

### Adım 2: GTM'de GA4 Tag Oluşturma
1. Google Tag Manager'da "Tags" sekmesine gidin
2. "New" butonuna tıklayın
3. Tag türü: "Google Analytics: GA4 Configuration"
4. Measurement ID: `G-30XM7GYBBH`
5. Trigger: "All Pages"
6. Tag adı: "GA4 - Page View"

### Adım 3: Custom Event Tags Oluşturma

#### Button Click Tracking
1. Yeni tag oluşturun
2. Tag türü: "Google Analytics: GA4 Event"
3. Configuration Tag: GA4 Configuration tag'ini seçin
4. Event Name: "button_click"
5. Event Parameters:
   - button_name: {{Click Text}}
   - page_location: {{Page Path}}
6. Trigger: "Click - All Elements"
7. Tag adı: "GA4 - Button Click"

#### Form Submission Tracking
1. Yeni tag oluşturun
2. Tag türü: "Google Analytics: GA4 Event"
3. Configuration Tag: GA4 Configuration tag'ini seçin
4. Event Name: "form_submit"
5. Event Parameters:
   - form_name: {{Form ID}}
   - page_location: {{Page Path}}
6. Trigger: "Form Submission"
7. Tag adı: "GA4 - Form Submit"

#### Menu Interaction Tracking
1. Yeni tag oluşturun
2. Tag türü: "Google Analytics: GA4 Event"
3. Configuration Tag: GA4 Configuration tag'ini seçin
4. Event Name: "menu_interaction"
5. Event Parameters:
   - menu_name: {{Click Text}}
   - action: "open"
   - page_location: {{Page Path}}
6. Trigger: "Click - All Elements" (CSS Selector: [data-menu])
7. Tag adı: "GA4 - Menu Interaction"

## 3. Custom Variables Oluşturma

### Page Path Variable
1. "Variables" sekmesine gidin
2. "New" butonuna tıklayın
3. Variable türü: "Built-in Variables"
4. Page Path'ı seçin

### Click Text Variable
1. "Variables" sekmesine gidin
2. "New" butonuna tıklayın
3. Variable türü: "Built-in Variables"
4. Click Text'i seçin

### Form ID Variable
1. "Variables" sekmesine gidin
2. "New" butonuna tıklayın
3. Variable türü: "Built-in Variables"
4. Form ID'yi seçin

## 4. Custom Triggers Oluşturma

### Menu Click Trigger
1. "Triggers" sekmesine gidin
2. "New" butonuna tıklayın
3. Trigger türü: "Click - All Elements"
4. This trigger fires on: "Some Clicks"
5. Click Element: "matches CSS selector"
6. CSS Selector: `[data-menu]`

### Product View Trigger
1. "Triggers" sekmesine gidin
2. "New" butonuna tıklayın
3. Trigger türü: "Click - All Elements"
4. This trigger fires on: "Some Clicks"
5. Click Element: "matches CSS selector"
6. CSS Selector: `[data-product]`

## 5. Preview ve Test

### Preview Mode
1. GTM'de "Preview" butonuna tıklayın
2. Sitenizi açın
3. Etkileşimleri test edin
4. Tag'lerin doğru tetiklendiğini kontrol edin

### Debugging
- Console'da dataLayer.push() çağrılarını kontrol edin
- GA4 Real-time raporlarını kontrol edin
- GTM Preview modunda tag tetiklenmelerini izleyin

## 6. Publish

Tüm testler başarılı olduktan sonra:
1. "Submit" butonuna tıklayın
2. Version name: "Initial GA4 Setup"
3. Version description: "Google Analytics 4 initial setup with custom events"
4. "Publish" butonuna tıklayın

## 7. Doğrulama

### GA4 Real-time Raporları
1. Google Analytics'te "Real-time" sekmesine gidin
2. Sayfa görüntülemelerini kontrol edin
3. Custom event'leri kontrol edin

### GTM Debug Mode
1. GTM'de "Preview" modunu açın
2. Sitenizde etkileşimleri test edin
3. Tag'lerin doğru tetiklendiğini doğrulayın

## 8. Monitoring

### Düzenli Kontroller
- Haftalık GA4 raporlarını kontrol edin
- Aylık GTM tag performansını inceleyin
- Custom event'lerin doğru çalıştığını doğrulayın

### Optimizasyon
- Kullanılmayan tag'leri temizleyin
- Yeni event'ler ekleyin
- Conversion tracking'i geliştirin 