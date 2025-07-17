# Google Analytics 4 + Google Tag Manager Kurulum Rehberi

## 📊 Mevcut Durum
- ✅ Google Tag Manager Container: `GTM-NZVQV734`
- ✅ Google Analytics 4 Measurement ID: `G-30XM7GYBBH`
- ✅ Website: optimizeworld.net

## 🔧 Google Tag Manager'da GA4 Kurulumu

### 1. GA4 Configuration Tag Oluşturma

1. [Google Tag Manager](https://tagmanager.google.com/) adresine gidin
2. Container `GTM-NZVQV734`'ü seçin
3. "Tags" sekmesine gidin
4. "New" butonuna tıklayın
5. Tag Configuration:
   - **Tag Type**: "Google Analytics: GA4 Configuration"
   - **Measurement ID**: `G-30XM7GYBBH`
   - **Configuration Tag**: (boş bırakın)
   - **Send Page View**: ✅ (işaretli)
6. Trigger:
   - **Trigger Type**: "All Pages"
   - **Trigger Name**: "All Pages"
7. Tag Name: "GA4 - Configuration"
8. "Save" butonuna tıklayın

### 2. Custom Event Tags Oluşturma

#### Button Click Tracking
1. "New" butonuna tıklayın
2. Tag Configuration:
   - **Tag Type**: "Google Analytics: GA4 Event"
   - **Configuration Tag**: "GA4 - Configuration" (yukarıda oluşturduğunuz tag)
   - **Event Name**: `button_click`
   - **Event Parameters**:
     - `button_name`: `{{Click Text}}`
     - `page_location`: `{{Page Path}}`
     - `event_category`: `engagement`
3. Trigger:
   - **Trigger Type**: "Click - All Elements"
   - **This trigger fires on**: "Some Clicks"
   - **Click Element**: "matches CSS selector"
   - **CSS Selector**: `[data-menu], [data-product], button[onclick*="trackButtonClick"]`
4. Tag Name: "GA4 - Button Click"
5. "Save" butonuna tıklayın

#### Form Submission Tracking
1. "New" butonuna tıklayın
2. Tag Configuration:
   - **Tag Type**: "Google Analytics: GA4 Event"
   - **Configuration Tag**: "GA4 - Configuration"
   - **Event Name**: `form_submit`
   - **Event Parameters**:
     - `form_name`: `{{Form ID}}`
     - `page_location`: `{{Page Path}}`
     - `event_category`: `engagement`
3. Trigger:
   - **Trigger Type**: "Form Submission"
   - **This trigger fires on**: "All Forms"
4. Tag Name: "GA4 - Form Submit"
5. "Save" butonuna tıklayın

#### Menu Interaction Tracking
1. "New" butonuna tıklayın
2. Tag Configuration:
   - **Tag Type**: "Google Analytics: GA4 Event"
   - **Configuration Tag**: "GA4 - Configuration"
   - **Event Name**: `menu_interaction`
   - **Event Parameters**:
     - `menu_name`: `{{Click Element - Attribute - data-menu}}`
     - `action`: `open`
     - `page_location`: `{{Page Path}}`
     - `event_category`: `engagement`
3. Trigger:
   - **Trigger Type**: "Click - All Elements"
   - **This trigger fires on**: "Some Clicks"
   - **Click Element**: "matches CSS selector"
   - **CSS Selector**: `[data-menu]`
4. Tag Name: "GA4 - Menu Interaction"
5. "Save" butonuna tıklayın

#### Product View Tracking
1. "New" butonuna tıklayın
2. Tag Configuration:
   - **Tag Type**: "Google Analytics: GA4 Event"
   - **Configuration Tag**: "GA4 - Configuration"
   - **Event Name**: `product_view`
   - **Event Parameters**:
     - `product_name`: `{{Click Element - Attribute - data-product}}`
     - `product_category`: `smart_city_solutions`
     - `page_location`: `{{Page Path}}`
     - `event_category`: `engagement`
3. Trigger:
   - **Trigger Type**: "Click - All Elements"
   - **This trigger fires on**: "Some Clicks"
   - **Click Element**: "matches CSS selector"
   - **CSS Selector**: `[data-product]`
4. Tag Name: "GA4 - Product View"
5. "Save" butonuna tıklayın

#### Language Change Tracking
1. "New" butonuna tıklayın
2. Tag Configuration:
   - **Tag Type**: "Google Analytics: GA4 Event"
   - **Configuration Tag**: "GA4 - Configuration"
   - **Event Name**: `language_change`
   - **Event Parameters**:
     - `from_language`: `{{Page Language}}`
     - `to_language`: `{{Click Text}}`
     - `page_location`: `{{Page Path}}`
     - `event_category`: `engagement`
3. Trigger:
   - **Trigger Type**: "Click - All Elements"
   - **This trigger fires on**: "Some Clicks"
   - **Click Element**: "matches CSS selector"
   - **CSS Selector**: `[onclick*="trackLanguageChange"]`
4. Tag Name: "GA4 - Language Change"
5. "Save" butonuna tıklayın

### 3. Custom Variables Oluşturma

#### Page Language Variable
1. "Variables" sekmesine gidin
2. "New" butonuna tıklayın
3. Variable Configuration:
   - **Variable Type**: "Custom JavaScript"
   - **JavaScript Code**:
   ```javascript
   function() {
     return document.documentElement.lang || 'tr';
   }
   ```
4. Variable Name: "Page Language"
5. "Save" butonuna tıklayın

#### Click Element Attribute Variable
1. "Variables" sekmesine gidin
2. "New" butonuna tıklayın
3. Variable Configuration:
   - **Variable Type**: "Click Element"
   - **Attribute**: "data-menu" (veya "data-product")
4. Variable Name: "Click Element - Attribute - data-menu"
5. "Save" butonuna tıklayın

### 4. Built-in Variables'ları Etkinleştirme

1. "Variables" sekmesine gidin
2. "Built-in Variables" bölümünde "Configure" butonuna tıklayın
3. Aşağıdaki variable'ları işaretleyin:
   - ✅ Click Text
   - ✅ Click Element
   - ✅ Form ID
   - ✅ Page Path
   - ✅ Page URL
   - ✅ Page Title

### 5. Preview ve Test

#### Preview Mode
1. GTM'de "Preview" butonuna tıklayın
2. Sitenizi açın: https://optimizeworld.net
3. Aşağıdaki etkileşimleri test edin:
   - Menü butonlarına tıklayın
   - Ürün butonlarına tıklayın
   - Dil değiştirme butonlarına tıklayın
   - Demo formunu doldurun
4. GTM Preview modunda tag'lerin tetiklendiğini kontrol edin

#### GA4 Real-time Test
1. [Google Analytics](https://analytics.google.com/) adresine gidin
2. Property `G-30XM7GYBBH`'yi seçin
3. "Real-time" sekmesine gidin
4. "Events" bölümünü kontrol edin
5. Custom event'lerin görünüp görünmediğini kontrol edin

### 6. Publish

Tüm testler başarılı olduktan sonra:
1. GTM'de "Submit" butonuna tıklayın
2. Version name: "GA4 Initial Setup"
3. Version description: "Google Analytics 4 configuration with custom events"
4. "Publish" butonuna tıklayın

### 7. Doğrulama

#### GA4 Real-time Raporları
- Sayfa görüntülemeleri
- Custom event'ler (button_click, menu_interaction, product_view, vb.)
- User engagement metrics

#### GTM Debug Mode
- Tag tetiklenmeleri
- Variable değerleri
- Trigger koşulları

## 📈 Monitoring ve Optimizasyon

### Haftalık Kontroller
- GA4 Real-time raporları
- Custom event'lerin doğru çalışması
- Conversion tracking

### Aylık Optimizasyon
- Kullanılmayan tag'leri temizleme
- Yeni event'ler ekleme
- Performance monitoring

## 🔗 Faydalı Linkler
- [Google Tag Manager](https://tagmanager.google.com/)
- [Google Analytics](https://analytics.google.com/)
- [Google Search Console](https://search.google.com/search-console) 