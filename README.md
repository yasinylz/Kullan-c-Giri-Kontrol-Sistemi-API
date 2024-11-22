# User Access Control System API
🚀 API Modülleri:  Kullanım Rehberi 🌟
1️⃣ User Model (Kullanıcı Modeli)
💡 Ne İşe Yarar?
Kullanıcı bilgilerini güvenli bir şekilde yönetir, şifreleri hash'ler ve kullanıcı oturumları için JWT tokenlar oluşturur.

🔧 Kullanım:

Kullanıcı şifrelerini güvenli saklamak için hashPassword fonksiyonunu kullan.
Oturum açma işlemleri için generateToken ile JWT oluştur.
Şifre sıfırlama işlemlerinde generateResetToken ile geçici bir token yarat.
✨ Örnek Senaryo: Bir kullanıcı kaydoluyor, şifre güvenli bir şekilde hash'leniyor ve oturum açıldığında JWT token üretiliyor. Böylece güvenli bir oturum yönetimi sağlanıyor.

2️⃣ Admin Router (Yönetici Yönlendirme)
💼 Ne İşe Yarar?
Yönetici, diğer kullanıcılar üzerinde kontrol sağlar: engelleme, silme ve daha fazlası!

🔧 Kullanım:

/block/:id — Belirli bir kullanıcıyı engelle.
/delete/:id — Bir kullanıcıyı tamamen sistemden sil.
🚀 Örnek Kullanım:


POST /admin/block/123  # Kullanıcı ID'si 123 olan kullanıcıyı engelle
DELETE /admin/delete/123  # Kullanıcı ID'si 123 olan kullanıcıyı sil

🌟 Dinamik Güç:
Admin, bir kullanıcıyı blokladığında sistemin diğer bölümlerine otomatik bildirim gönderilebilir!

3️⃣ Answer Router (Cevap Yönlendirme)
✍️ Ne İşe Yarar?
Kullanıcıların cevap eklemesini, düzenlemesini, silmesini ve beğenmesini sağlar.

🔧 Kullanım:

/add — Yeni bir cevap ekle.
/edit/:id — Mevcut bir cevabı güncelle.
/delete/:id — Cevabı sil.
/like/:id — Cevabı beğen.
🎯 Örnek Kullanım:
POST /answers/add  # Yeni bir cevap ekler
PUT /answers/edit/123  # ID'si 123 olan cevabı günceller
DELETE /answers/delete/123  # ID'si 123 olan cevabı siler
POST /answers/like/123  # ID'si 123 olan cevabı beğenir

✨ Canlı Senaryo:
Bir kullanıcı, başkasının cevabını beğendiğinde "Cevap popülerlik kazandı!" mesajıyla ödüllendirilir!

4️⃣ Auth Router (Kimlik Doğrulama Yönlendirme)
🔒 Ne İşe Yarar?
Kullanıcı kayıt, oturum açma ve şifre sıfırlama işlemlerini güvenli bir şekilde yönetir.

🔧 Kullanım:

/register — Yeni bir kullanıcı kaydı oluştur.
/login — Kullanıcının oturum açmasını sağla.
/reset-password — Şifre sıfırlama işlemini başlat.

🎯 Örnek Kullanım:
POST /auth/register  # Yeni bir kullanıcı kaydı oluşturur
POST /auth/login  # Kullanıcı oturumunu açar
POST /auth/reset-password  # Şifre sıfırlama işlemi başlatır

🌟 Dinamik Akış:
Bir kullanıcı kayıt olurken sistem otomatik olarak “Hoş geldin!” e-postası gönderebilir.

5️⃣ Index Router (Ana Yönlendirme)
📍 Ne İşe Yarar?
API'nin ana giriş noktasıdır ve tüm diğer yönlendirme modüllerini birleştirir.

🔧 Kullanım:

/users, /admin, /answers, /auth, /questions gibi tüm yönlendirme noktalarını yapılandırır.
🎯 Canlı Örnek: Sisteme gelen bir istek önce index router'a yönlendirilir. Buradan ilgili modüle dinamik ve hızlı bir şekilde iletilir.

6️⃣ Question Router (Soru Yönlendirme)
❓ Ne İşe Yarar?
Kullanıcıların soru eklemesi, düzenlemesi, silmesi ve beğenmesi işlemlerini yönetir.

🔧 Kullanım:

/add — Yeni bir soru ekle.
/edit/:id — Mevcut bir soruyu düzenle.
/delete/:id — Soruyu sil.
/like/:id — Soruyu beğen.
🎯 Örnek Kullanım:
POST /questions/add  # Yeni bir soru ekler
PUT /questions/edit/123  # ID'si 123 olan soruyu günceller
DELETE /questions/delete/123  # ID'si 123 olan soruyu siler
POST /questions/like/123  # ID'si 123 olan soruyu beğenir


✨ Dinamik Özellik:
Bir kullanıcı soru eklediğinde sistem anında bildirim göndererek “Yeni bir soru eklendi!” mesajı gösterebilir.

🌌 Genel Kullanım Senaryosu:
1️⃣ Bir kullanıcı /auth/register endpoint'i ile kayıt olur ve /auth/login ile sisteme giriş yapar.
2️⃣ Sorularını /questions/add ile ekler ve cevaplarını /answers/add ile paylaşır.
3️⃣ Admin gerektiğinde /admin/block/:id ile bir kullanıcıyı engeller ya da /admin/delete/:id ile sistemden tamamen siler.
4️⃣ Şifre sıfırlama gerektiğinde /auth/reset-password ile güvenli bir işlem başlatılır.
