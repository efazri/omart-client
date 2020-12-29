## O - Mart ##
OMart merupakan singakatan dari online Market. Dimana pada web aplikasi ini, user diberikan pengalaman menjelajah di sebuah website yang berfokus pada fashion. Pada Omart ini, target penjualnya adalah brand-brand lokal yang berada di Indonesia ataupun usaha-usaha rumahan yang mulai bergerak pada bisnis online.

Pada Website ini, terdapat dua hak akses, yaitu akses sebagai admin/penjual dan akses sebagai costumer.

pada akses sebagai admin, admin atau user di perbolehkan untuk menambahkan, mengupdate, ataupun menghapus product yang ada di website ini. Namun admin tidak ada akses untuk checkout ataupun melihat keranjang. Sedangkan untuk costumer, user bisa menambahkan ke keranjang ataupun mencheckout product yang mereka inginkan.


Untuk akses admin silahkan login menggunakan akun berikut: 
email: admin1@mail.com
password: admin12020
login page: 
https://user-images.githubusercontent.com/67946735/103251908-62c24200-49ad-11eb-93d7-0c19e079a742.png)



Tampilan awal, user akan diberikan tampilan dashboard ( route '/' ). Dimana pada halaman ini, user bisa melihat semua produk yang ada di OMart. Selain itu, feature beli dan tambahkan ke keranjang sudah di tampilkan meskipun belum login. Namun ketika user mengklik beli atau tambahkan ke keranjang, apabila user belum login. Website secara otomatis akan mendirect user kehalaman login.
dashboard page: 
https://user-images.githubusercontent.com/67946735/103252004-addc5500-49ad-11eb-8ee4-2b57b74f2c5a.png



pada halaman cart/keranjang ( route '/cart' ) user di berikan tampilan list produk yang sdah dimasukan ke keranjang, user bisa memilih item yang akan di checkout ataupun menghapus item dari keranjang.
Cart page: 
https://user-images.githubusercontent.com/67946735/103252080-db290300-49ad-11eb-9586-09e92e8d18ab.png



pada halaman checkout (route '/checkout' ) user akan diberikan tampilan list yang akan di checkout, namun user perlu memilih metode pembayaran dan metode pengirimannya sebelum di checkout.
https://user-images.githubusercontent.com/67946735/103252126-027fd000-49ae-11eb-91d9-adff611cb04e.png


pada akses admin berikut tampilan pada add product: 
https://user-images.githubusercontent.com/67946735/103252157-26dbac80-49ae-11eb-875b-71357d6fe163.png


selain menambahkan, admin juga bisa mengupdate atau mengedit produk yang telah dibuat, adapun beberapa validasi pada client site yang mengharuskan semua field di isi oleh admin. Berikut tampilan edit productnya:
https://user-images.githubusercontent.com/67946735/103252215-6bffde80-49ae-11eb-8ac4-b3ebba9d07fd.png


feature terakhir yang bisa dilakukan oleh admin adalah menghapus product, dimana pada penghapusan product ini, website akan mengkonfirmasi terlebih dahulu kepada admin mengenai product yang akan dihapus. Berikut tampilan dari notifikasi penghapusannya:
https://user-images.githubusercontent.com/67946735/103252219-6dc9a200-49ae-11eb-80fd-1e31fb3a3efb.png



Dikarenakan website belum sempat dihosting, maka untuk me Run website bisa dilakukan localhost. 
berikut langkah-langkahnya.

1. Clone repository server dan client pada repo Omart-Server dan Omart-Client
2. jalankan command `npm i` pada server dan client
3. pastikan sudah menginstall postgres sql atau psql pada device.
4. run command `npx sequelize db:create` pada server
5. run command `npx sequelize db:migrate` pada server
6. run command `npx sequelize db:seed:all` pada server
7. run server dengan `npm run dev` atau `npx nodemon app.js`
8. run client dengan `npm start`
9. finish

apabila ada kesulitan atau problem, mohon sedianya untuk menghubungi saya

Terimakasih
Author
Egy Fazri

