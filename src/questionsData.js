// Bank Pertanyaan 4 Dimensi School Well-being & Respon Mendalam Fasilitator Digital
// Berakar pada teori School Well-being (Konu & Rimpelä) dan Pembelajaran Sosial-Emosional (PSE / CASEL)

export const DIMENSIONS = {
  health: {
    id: 'health',
    name: 'HEALTH',
    label: 'Kesehatan & Energi Diri',
    color: '#ef4444',
    bgLight: 'bg-red-500/10',
    border: 'border-red-500',
    text: 'text-red-400',
    icon: '❤️',
    description: 'Perasaan hati, energi tubuh, kebugaran fisik, pola istirahat, dan kenyamanan ragamu hari ini.',
  },
  having: {
    id: 'having',
    name: 'HAVING',
    label: 'Kondisi & Fasilitas Sekolah',
    color: '#fbbf24',
    bgLight: 'bg-amber-500/10',
    border: 'border-amber-400',
    text: 'text-amber-300',
    icon: '🏫',
    description: 'Kenyamanan kelas, kebersihan, fasilitas belajar, ruang terbuka, dan rasa aman di lingkungan sekolah.',
  },
  loving: {
    id: 'loving',
    name: 'LOVING',
    label: 'Pertemanan & Kebersamaan',
    color: '#22c55e',
    bgLight: 'bg-emerald-500/10',
    border: 'border-emerald-500',
    text: 'text-emerald-400',
    icon: '🤝',
    description: 'Hubungan dengan sahabat, saling tolong menolong, empati, kehangatan guru, dan rasa diterima di kelas.',
  },
  being: {
    id: 'being',
    name: 'BEING',
    label: 'Potensi & Percaya Diri',
    color: '#3b82f6',
    bgLight: 'bg-blue-500/10',
    border: 'border-blue-500',
    text: 'text-blue-400',
    icon: '⭐',
    description: 'Peluang berkarya, keberanian berpendapat, mengenali bakat unik diri, dan mencoba hal-hal baru tanpa takut gagal.',
  },
};

export const QUESTIONS_BY_DIMENSION = {
  health: [
    {
      id: 'h1',
      question: 'Bagaimana kondisi energi tubuh dan suasana hatimu di sekolah hari ini?',
      options: [
        {
          text: 'Penuh energi, ceria, dan siap belajar hal seru! ⚡',
          type: 'positive',
          validation: 'Wah, luar biasa sekali energimu hari ini!',
          insight: 'Ketika tubuh kita bugar dan hati kita ceria, otak kita dapat menyerap informasi baru dengan jauh lebih cepat dan kreatif. Sikap optimis seperti ini juga memiliki kekuatan magnetis yang menular, membuat teman-teman sebangkumu ikut merasa bersemangat dan nyaman berada di dekatmu.',
          advice: 'Manfaatkan energi melimpah ini untuk menyelesaikan hal-hal yang menantang hari ini. Tetap ingat untuk minum air putih secara teratur agar staminamu tetap stabil hingga jam pulang sekolah tiba! ✨🌱',
        },
        {
          text: 'Cukup tenang, santai, dan merasa nyaman 😊',
          type: 'positive',
          validation: 'Ketenangan adalah fondasi terindah untuk belajar dengan bahagia.',
          insight: 'Memiliki suasana hati yang rileks dan stabil membantumu berpikir lebih jernih, mendengarkan penjelasan guru dengan penuh perhatian, serta merespon teman tanpa tergesa-gesa. Ketenangan batinmu hari ini membawa kesejukan bagi atmosfer kelas.',
          advice: 'Pertahankan ritme yang nyaman ini. Menikmati proses belajar langkah demi langkah tanpa rasa terburu-buru adalah bentuk penghargaan tertinggi bagi pikiranmu sendiri! 🌿🕊️',
        },
        {
          text: 'Badan terasa agak lemas, mengantuk, atau pegal 🥱',
          type: 'recovery',
          validation: 'Terima kasih banyak atas kejujuranmu yang sangat berani.',
          insight: 'Tubuh kita adalah kompas yang jujur. Ketika merasa lemas atau mengantuk, itu bukanlah tanda kelemahan, melainkan sinyal penting bahwa tubuh dan pikiranmu sedang membutuhkan waktu istirahat yang cukup atau asupan cairan segar. Kamu tidak perlu memaksakan diri menjadi sempurna setiap saat.',
          advice: 'Luangkan jeda sejenak untuk menarik napas panjang, minum segelas air putih, dan regangkan otot-ototmu. Hargai batasan fisikmu hari ini dengan penuh kasih sayang! 💙💧',
        },
        {
          text: 'Merasa sangat lelah dan butuh jeda istirahat tenang 🛌',
          type: 'recovery',
          validation: 'Kami mendengar dan sangat memahami rasa lelahmu.',
          insight: 'Setiap manusia memiliki hari-hari di mana energi terasa terkuras habis, entah karena tugas sebelumnya atau aktivitas fisik yang padat. Keberanianmu untuk hadir ke sekolah dan tetap berusaha mengikuti kegiatan hingga detik ini sudah merupakan bentuk perjuangan yang patut diacungi jempol.',
          advice: 'Beri izin pada dirimu untuk berjalan lebih santai. Jangan ragu beristirahat sejenak saat jam rehat tiba, hindari menatap layar berlebih, dan izinkan tubuhmu mengisi ulang energinya! 🤗🛋️',
        },
      ],
      followUp: {
        prompt: 'Langkah pemulihan diri apa yang paling nyaman dan ingin kamu lakukan saat ini?',
        choices: [
          'Minum segelas air putih segar perlahan-lahan 💧',
          'Tarik napas dalam 3 kali sambil mengendurkan pundak 🌬️',
          'Melakukan peregangan ringan tangan dan leher 5 detik 🤸',
          'Duduk bersandar rileks sambil memejamkan mata 10 detik 😌',
        ],
      },
    },
    {
      id: 'h2',
      question: 'Saat menghadapi tugas yang menumpuk atau materi pelajaran yang rumit, apa yang kamu rasakan?',
      options: [
        {
          text: 'Merasa tertantang dan penasaran ingin segera memecahkannya! 🎯',
          type: 'positive',
          validation: 'Jiwa petualang intelektualmu sungguh mengagumkan!',
          insight: 'Melihat tugas sulit bukan sebagai ancaman melainkan sebagai teka-teki yang menantang adalah tanda dari pola pikir bertumbuh (growth mindset). Rasa penasaranmu akan menuntunmu menemukan sudut pandang baru yang tidak terpikirkan sebelumnya.',
          advice: 'Pertahankan antusiasme ini! Ingatlah bahwa proses berpikir dan mencoba memecahkan masalah adalah hal yang paling berharga, bahkan melampaui nilai angka di atas kertas! 🚀🏆',
        },
        {
          text: 'Tetap tenang dan berusaha menyelesaikannya semampuku 📘',
          type: 'positive',
          validation: 'Sikap yang sangat matang, sabar, dan bijaksana!',
          insight: 'Kemampuan untuk tidak panik di bawah tekanan tugas merupakan salah satu keterampilan hidup paling esensial. Dengan mengurai tugas rumit menjadi bagian-bagian kecil, kamu menghindarkan dirimu dari rasa kewalahan mental.',
          advice: 'Lanjutkan menyelesaikan tugas satu per satu. Ingatlah prinsip ini: gunung yang tinggi dapat didaki hanya dengan satu langkah kecil yang konsisten! 🌟🧘',
        },
        {
          text: 'Jantung berdebar cepat atau merasa agak cemas takut keliru 💓',
          type: 'recovery',
          validation: 'Wajar sekali merasa cemas, dan perasaanmu itu sangat valid.',
          insight: 'Detak jantung yang bertambah cepat sebenarnya adalah cara alami tubuh bersiap menghadapi sesuatu yang kamu anggap penting. Namun perlu diingat: kelas adalah laboratorium belajar, tempat di mana kesalahan justru menjadi guru terbaik untuk membuat kita semakin pintar.',
          advice: 'Katakan pada dirimu sendiri: "Aku berharga, dan aku tidak harus langsung menguasai semuanya hari ini." Tarik napas perlahan dan kerjakan semampumu tanpa takut dihakimi! 🌈🌸',
        },
        {
          text: 'Cepat pusing dan mudah panik jika tugasnya rumit 😣',
          type: 'recovery',
          validation: 'Tarik napas dalam-dalam, kamu aman di sini.',
          insight: 'Rasa pusing dan panik sering kali muncul ketika kita mencoba memikirkan seluruh beban tugas sekaligus dalam waktu bersamaan. Otak kita menjadi kelebihan beban, seolah berada di tengah badai informasi.',
          advice: 'Hentikan pensilmu sejenak selama sepuluh detik. Pejamkan mata, minum sedikit air, dan mintalah bimbingan guru atau teman sebangku. Meminta bantuan adalah tanda keberanian, bukan kelemahan! 🌼🕊️',
        },
      ],
      followUp: {
        prompt: 'Kiat menenangkan diri apa yang paling cocok untuk meredakan rasa cemasmu?',
        choices: [
          'Tersenyum dan membisikkan pada diri: "Aku berharga dan bisa pelan-pelan!" 💬',
          'Mengajak teman sebangku mengobrol santai sejenak 🗣️',
          'Meneguk air hangat untuk merilekskan otot tenggorokan 🍵',
          'Mengibaskan pergelangan tangan agar ketegangan otot terlepas 🖐️',
        ],
      },
    },
    {
      id: 'h3',
      question: 'Bagaimana perasaanmu ketika jam istirahat sekolah tiba hari ini?',
      options: [
        {
          text: 'Sangat gembira, bisa bercanda tawa dan bergerak bebas! 🎈',
          type: 'positive',
          validation: 'Keceriaanmu benar-benar menyegarkan suasana!',
          insight: 'Tawa bersama teman dan kebebasan bergerak saat jam istirahat melepaskan hormon endorfin yang secara instan meredakan kelelahan belajar. Momen bermain bebas ini melatih kecerdasan sosial dan mengikat tali persahabatan dengan begitu erat.',
          advice: 'Nikmati setiap detik kebersamaan ini! Sebarkan senyumanmu kepada siapa saja yang kamu temui di koridor sekolah hari ini! 🌻🎉',
        },
        {
          text: 'Nikmat menyantap bekal makanan dan merasa kenyang bersyukur 🍱',
          type: 'positive',
          validation: 'Menikmati makanan dengan penuh kesadaran adalah bentuk cinta diri.',
          insight: 'Duduk dengan tenang dan menikmati setiap suapan makanan memberikan asupan nutrisi yang optimal bagi tubuh sekaligus menjadi jeda meditasi yang menyehatkan bagi pikiran. Rasa syukur atas rezeki makanan melipatgandakan rasa damai di hati.',
          advice: 'Kunyah makananmu dengan santai, nikmati rasa dan aromanya, dan pastikan kamu minum air secukupnya agar pencernaanmu tetap nyaman sepanjang hari! 🥪🍎',
        },
        {
          text: 'Waktu istirahat terasa sangat singkat dan berlalu begitu cepat ⏳',
          type: 'positive',
          validation: 'Itu pertanda bahwa kamu sedang sangat menikmati harimu!',
          insight: 'Waktu selalu terasa terbang ketika kita berada dalam keadaan senang dan asyik. Hal ini membuktikan bahwa lingkungan sekolahmu memiliki daya tarik dan momen-momen manis yang kamu hargai tinggi.',
          advice: 'Bawalah rasa gembira dari jam istirahat tersebut ke dalam jam pelajaran berikutnya. Anggap setiap materi belajar sebagai petualangan seru lainnya! ⛅⏰',
        },
        {
          text: 'Merasa agak sepi atau lebih memilih duduk menyendiri 🕊️',
          type: 'recovery',
          validation: 'Menikmati kesendirian adalah hak setiap anak yang berharga.',
          insight: 'Terkadang kita membutuhkan ruang hening untuk mengisi kembali daya energi sosial kita tanpa harus banyak berbicara. Menjadi penyendiri sejenak bukanlah hal yang aneh, melainkan cara jiwamu mencari ketenangan.',
          advice: 'Gunakan waktu tenang ini untuk melakukan hal yang kamu sukai, seperti membaca atau menggambar. Namun ketahuilah, jika sewaktu-waktu kamu ingin teman mengobrol, teman-teman dan gurumu selalu siap menyambutmu dengan tangan terbuka! 🌷🛋️',
        },
      ],
      followUp: {
        prompt: 'Hal menyejukkan apa yang paling ingin kamu nikmati saat rehat?',
        choices: [
          'Duduk santai di bangku taman sambil merasakan semilir angin 🌳',
          'Berbagi biskuit atau camilan bersama sahabat karib 🍪',
          'Membaca cerita komik atau melihat gambar-gambar indah 📖',
          'Berjalan santai mengelilingi koridor kelas untuk meluruskan kaki 🚶',
        ],
      },
    },
  ],
  having: [
    {
      id: 'hv1',
      question: 'Bagaimana penilaianmu terhadap kenyamanan ruang kelas dan meja belajarmu hari ini?',
      options: [
        {
          text: 'Sangat rapi, bersih, sejuk, dan membuatku betah seharian! 🍃',
          type: 'positive',
          validation: 'Betapa beruntungnya belajar di ruang yang asri dan nyaman!',
          insight: 'Penelitian membuktikan bahwa lingkungan fisik yang tertata rapi, bersih, dan berudara sejuk dapat meningkatkan fokus dan menurunkan tingkat stres belajar secara signifikan. Menghargai kebersihan kelas adalah cermin dari kepedulianmu terhadap kenyamanan bersama.',
          advice: 'Mari kita terus jaga kebersihan meja dan laci kita. Kebiasaan merawat ruang belajar adalah cerminan dari pikiran yang teratur dan penuh tanggung jawab! 🧹✨🏫',
        },
        {
          text: 'Cukup nyaman, fasilitas mencukupi untuk menyimak pelajaran 📖',
          type: 'positive',
          validation: 'Rasa syukur adalah kunci utama menikmati segala hal.',
          insight: 'Ketika kita memusatkan perhatian pada apa yang ada dan mencukupi, kita terhindar dari rasa mengeluh yang melelahkan. Sikap adaptifmu membuat proses belajar tetap berjalan efektif dalam kondisi apa pun.',
          advice: 'Gunakan fasilitas yang ada dengan sebaik mungkin untuk mengembangkan potensimu. Fasilitas yang dirawat dengan baik akan bermanfaat bagi banyak teman lainnya! 💡📐',
        },
        {
          text: 'Ruangan agak pengap, gerah, atau kadang bising terdengar ☀️',
          type: 'recovery',
          validation: 'Kepekaanmu terhadap lingkungan sangatlah tepat dan penting.',
          insight: 'Suhu yang terlalu panas atau kebisingan berlebih memang dapat mengganggu aliran oksigen ke otak dan menurunkan daya tahan emosi kita. Sangat wajar jika konsentrasimu sempat goyah karena gangguan fisik tersebut.',
          advice: 'Ajaklah teman-teman untuk membuka jendela ventilasi agar udara segar masuk, atau bersama-sama menurunkan volume bicara saat guru sedang menjelaskan materi. Bersama kita bisa ciptakan kelas yang nyaman! 🪟🌬️',
        },
        {
          text: 'Meja agak sempit atau peralatan belajarku berantakan 📦',
          type: 'recovery',
          validation: 'Meja yang penuh memang sering membuat kepala ikut terasa sesak.',
          insight: 'Kerapian meja belajar berhubungan erat dengan ketenangan pikiran. Saat alat tulis dan buku bertumpuk tak beraturan, mata kita menerima terlalu banyak rangsangan visual yang memicu rasa lelah.',
          advice: 'Mari luangkan waktu satu menit untuk mengelompokkan buku ke dalam tas dan memasukkan pensil ke kotaknya. Meja yang lapang akan seketika membuat napasmu terasa lebih lega! 🧺✏️',
        },
      ],
      followUp: {
        prompt: 'Aksi kecil apa yang bisa kamu lakukan sekarang untuk menyegarkan mejamu?',
        choices: [
          'Memasukkan pensil dan penghapus ke tempat pensil agar rapi ✏️',
          'Memungut remah atau kertas tak terpakai ke tempat sampah 🗑️',
          'Membantu membuka jendela kelas agar sirkulasi udara lancar 🪟',
          'Menyusun buku dari yang paling besar ke yang paling kecil 📚',
        ],
      },
    },
    {
      id: 'hv2',
      question: 'Fasilitas di sekolah mana yang paling sering membuat harimu terasa menyenangkan?',
      options: [
        {
          text: 'Perpustakaan dengan rak buku dan sudut membaca yang hening 📚',
          type: 'positive',
          validation: 'Pilihan yang luar biasa dan sangat mendidik!',
          insight: 'Perpustakaan adalah tempat ajaib di mana imajinasimu bisa mengembara menjelajahi dunia tanpa batas. Keheningan di antara rak buku melatih konsentrasi mendalam dan memberi ruang bagi jiwamu untuk menemukan ketenangan batin.',
          advice: 'Jadikan membaca sebagai kebiasaan sehari-hari. Setiap buku yang kamu buka adalah jendela masa depan yang membuka wawasan dan kebijaksanaan hidupmu! 🧭📖',
        },
        {
          text: 'Lapangan olahraga tempat berlari, bermain bola, dan bergerak bebas ⚽',
          type: 'positive',
          validation: 'Semangat sportivitas dan gerak bebas yang luar biasa!',
          insight: 'Lapangan terbuka adalah tempat terbaik untuk membakar energi negatif dan melepaskan kejenuhan duduk berjam-jam. Bergerak aktif bersama kawan melatih kekompakan, kepemimpinan, dan rasa kebersamaan yang nyata.',
          advice: 'Bermainlah dengan gembira dan junjung tinggi sportivitas. Menang atau kalah dalam permainan bukanlah hal utama, melainkan tawa dan persahabatan yang terjalin! 🏃🥇',
        },
        {
          text: 'Kantin sekolah dengan menu favorit dan suasana ngobrol seru 🍛',
          type: 'positive',
          validation: 'Kantin adalah ruang interaksi sosial yang penuh kehangatan!',
          insight: 'Berbagi meja makan, berbincang santai mengenai hobi, dan menyantap hidangan lezat adalah momen sosial paling alami untuk mempererat keakraban antar murid. Suasana santai ini melenturkan ketegangan setelah jam pelajaran.',
          advice: 'Pilihlah jajanan yang bersih dan bergizi untuk merawat tubuhmu, serta jangan lupa untuk selalu merapikan kembali piring dan gelasmu setelah makan sebagai wujud rasa hormat! 🍜🥤',
        },
        {
          text: 'Taman sekolah dengan pepohonan rindang dan bunga warna-warni 🌺',
          type: 'positive',
          validation: 'Kecintaanmu pada alam hijau mencerminkan hati yang peka.',
          insight: 'Warna hijau dedaunan dan aroma segar pepohonan memiliki efek terapeutik yang terbukti secara ilmiah menurunkan hormon kortisol (penyebab stres). Menghirup udara di bawah pohon mengembalikan kejernihan pikiranmu.',
          advice: 'Rawatlah tanaman di sekitarmu dengan tidak memetik daun atau bunga sembarangan. Jadilah sahabat bagi bumi di lingkungan sekolah tercintamu! 🌱🦋',
        },
      ],
      followUp: {
        prompt: 'Komitmen apa yang ingin kamu jaga untuk merawat tempat favoritmu itu?',
        choices: [
          'Selalu mengembalikan buku atau barang ke tempat asalnya 🔄',
          'Tidak meninggalkan sampah sekecil apa pun di area tersebut 🗑️',
          'Mengajak teman lain untuk tidak merusak tanaman atau fasilitas 🌸',
          'Menjaga ketertiban dan ketenangan saat berada di sana 🤝',
        ],
      },
    },
    {
      id: 'hv3',
      question: 'Apakah kamu merasa aman, terlindungi, dan bebas dari rasa takut di lingkungan sekolah?',
      options: [
        {
          text: 'Sangat aman! Guru dan teman-teman selalu saling menjaga dengan ramah 🛡️',
          type: 'positive',
          validation: 'Rasa aman adalah hak dasar setiap anak, dan kami senang kamu merasakannya!',
          insight: 'Ketika anak merasa aman secara fisik maupun psikologis, ia dapat belajar, bertanya, dan bereksplorasi tanpa beban kecemasan. Iklim sekolah yang aman adalah hasil gotong royong seluruh warga sekolah yang saling menghormati.',
          advice: 'Jadilah bagian dari penjaga rasa aman tersebut dengan selalu bersikap ramah, tidak mengejek kelemahan orang lain, dan menyapa teman yang sedang bersedih! 🏠🤝',
        },
        {
          text: 'Merasa aman karena tahu kepada siapa harus melapor jika ada masalah 🤝',
          type: 'positive',
          validation: 'Pengetahuan yang sangat bijak dan memberdayakan diri!',
          insight: 'Mengetahui saluran bantuan adalah tanda anak yang mandiri dan cerdas secara sosial. Kamu memahami batasan diri dan tahu bahwa orang dewasa terpercaya selalu siap membantu menyelesaikan masalah yang sulit.',
          advice: 'Jangan pernah ragu untuk bersuara jika melihat hal yang tidak adil atau membahayakan, baik bagi dirimu sendiri maupun bagi teman-teman sekelasmu! 🌟🛡️',
        },
        {
          text: 'Kadang merasa was-was jika melihat pertengkaran atau ejekan 😣',
          type: 'recovery',
          validation: 'Kekhawatiranmu sangat kami hargai dan harus ditanggapi dengan serius.',
          insight: 'Menyaksikan konflik atau ejekan memang memicu rasa tidak nyaman dan mengancam kesejahteraan emosional siapa pun. Sekolah harus menjadi tempat suci yang bebas dari perundungan (bullying) dalam bentuk apa pun.',
          advice: 'Ingatlah bahwa kamu tidak sendirian. Kamu berhak merasa tenang. Jika ada hal yang membuatmu tidak nyaman, bicarakanlah secara rahasia kepada wali kelas atau guru bimbingan konseling! 💛🕊️',
        },
        {
          text: 'Ingin aturan sekolah ditegakkan lebih adil dan penuh kasih sayang ⚖️',
          type: 'recovery',
          validation: 'Aspirasi yang sangat mulia untuk kebaikan sekolah kita bersama.',
          insight: 'Keadilan yang berpadu dengan kasih sayang adalah fondasi komunitas yang beradab. Keinginanmu ini menunjukkan kepedulian yang tinggi terhadap hak-hak seluruh teman tanpa ada yang diistimewakan atau direndahkan.',
          advice: 'Mulailah keteladanan itu dari lingkungan terdekatmu: patuhi aturan bermain dengan jujur, jangan berbuat curang, dan perlakukan orang lain sebagaimana kamu ingin diperlakukan! 🕊️🌈',
        },
      ],
      followUp: {
        prompt: 'Siapa sosok terpercaya yang paling membuatmu merasa tenang di sekolah?',
        choices: [
          'Wali kelas atau bapak/ibu guru yang sabar mendengarkan 🧑‍🏫',
          'Sahabat setia yang selalu ada di sampingku 👫',
          'Petugas keamanan dan staf sekolah yang ramah menyapa 👮',
          'Seluruh teman sekelas yang kompak dan saling menyayangi 🌟',
        ],
      },
    },
  ],
  loving: [
    {
      id: 'l1',
      question: 'Momen kebaikan apa yang paling menyentuh hatimu dari teman-teman sekelas belakangan ini?',
      options: [
        {
          text: 'Mereka mengajakku tertawa, bermain, dan tidak membiarkanku sendirian! 😄',
          type: 'positive',
          validation: 'Rasa diterima di dalam kelompok adalah anugerah persahabatan yang indah.',
          insight: 'Manusia adalah makhluk sosial yang bertumbuh lewat penerimaan. Sahabat yang memperhatikan kehadiranmu dan mengajakmu ikut serta dalam permainan adalah harta karun yang membuat sekolah menjadi tempat paling membahagiakan.',
          advice: 'Pastikan kebaikan ini berputar kembali! Jika melihat teman lain yang tampak malu atau berdiri sendirian di pojok kelas, ulurkan tanganmu dan ajaklah ia bergabung! 💖🎈',
        },
        {
          text: 'Ada teman yang sabar mendengarkan keluh kesah dan ceritaku tanpa mencela 👂',
          type: 'positive',
          validation: 'Didengarkan dengan tulus menyembuhkan banyak beban di dalam hati.',
          insight: 'Menjadi pendengar yang baik membutuhkan kesabaran dan empati tingkat tinggi. Memiliki sahabat yang mendengarkan tanpa langsung menghakimi membuatmu merasa berharga dan dipahami seutuhnya.',
          advice: 'Jadilah pendengar yang sama baiknya untuk mereka. Terkadang, hadiah terbesar yang bisa kita berikan kepada orang lain hanyalah telinga yang mendengarkan dengan penuh cinta! 🌸💕',
        },
        {
          text: 'Kami saling meminjamkan alat tulis atau berbagi makanan dengan ikhlas ✏️',
          type: 'positive',
          validation: 'Kedermawanan dalam hal-hal kecil adalah benih persaudaraan sejati.',
          insight: 'Ketika kita terbiasa meminjamkan sebatang pensil atau membagi sepotong kue, kita sedang membangun ikatan kepercayaan dan kepedulian yang tulus. Hal-hal sederhana inilah yang menciptakan kehangatan di ruang kelas.',
          advice: 'Teruslah pupuk kebiasaan berbagi ini tanpa pamrih. Tangan yang di atas dan memberi dengan ikhlas akan selalu dipenuhi oleh kebahagiaan batin yang melimpah! 🤝🥪',
        },
        {
          text: 'Hari ini aku belum banyak berinteraksi atau mengobrol dengan teman 😶',
          type: 'recovery',
          validation: 'Tidak apa-apa, setiap orang memiliki tempo bergaulnya masing-masing.',
          insight: 'Persahabatan tidak selalu diukur dari seberapa keras kita tertawa setiap menit. Ada kalanya kita sedang memproses banyak hal dalam pikiran kita sendiri, dan itu adalah proses yang sangat alami.',
          advice: 'Jangan merasa cemas atau terasing. Besok, cobalah memulai dengan senyuman sederhana atau sapaan hangat kepada teman sebangkumu. Satu sapaan ramah bisa membuka jalan persahabatan baru! 😊🌱',
        },
      ],
      followUp: {
        prompt: 'Kalimat apresiasi manis apa yang ingin kamu sampaikan pada sahabatmu?',
        choices: [
          '"Terima kasih banyak ya sudah menjadi teman yang baik hari ini!" 🙏',
          '"Ayo nanti waktu istirahat kita duduk dan cerita-cerita lagi!" ⚽',
          '"Semangat terus ya, kalau ada tugas susah kita kerjakan bareng!" 💪',
          'Memberikan salam tos ceria dan senyuman tulus! ✋',
        ],
      },
    },
    {
      id: 'l2',
      question: 'Ketika kamu melihat teman sekelasmu tampak murung, sedih, atau menangis, apa dorongan hatimu?',
      options: [
        {
          text: 'Spontan ingin menghibur, membuat lelucon, atau mengajaknya tersenyum kembali 🎈',
          type: 'positive',
          validation: 'Hatimu begitu lembut dan dipenuhi keinginan menebarkan kebahagiaan!',
          insight: 'Dorongan untuk mengembalikan senyuman di wajah kawan yang terluka adalah tanda jiwa pembawa damai. Tawa yang tulus dapat meringankan sesak di dada dan mengingatkan temanmu bahwa hari esok akan lebih cerah.',
          advice: 'Salurkan niat baikmu dengan peka; pastikan temanmu merasa nyaman dengan leluconmu. Kehadiranmu yang hangat sudah menjadi pelipur lara terbaik baginya! 🌈✨',
        },
        {
          text: 'Mendekatinya perlahan dan bertanya: "Kamu baik-baik saja? Ada yang bisa kubantu?" 💬',
          type: 'positive',
          validation: 'Ini adalah respon empati tingkat tinggi yang sangat bijaksana.',
          insight: 'Mendekati teman yang bersedih tanpa memaksa dan menawarkan bantuan dengan lembut adalah teladan budi pekerti yang luhur. Terkadang orang yang sedih hanya butuh tahu bahwa mereka tidak sendirian di dunia ini.',
          advice: 'Pertahankan kebiasaan peka ini. Perhatian tulusmu bisa menyelamatkan seseorang dari rasa putus asa dan membangun rasa persaudaraan yang tak tergoyahkan! 💎🤝',
        },
        {
          text: 'Memberinya waktu tenang sejenak dan tidak memaksanya berbicara jika belum siap 🕊️',
          type: 'positive',
          validation: 'Menghargai batasan emosi orang lain adalah bentuk penghormatan tertinggi.',
          insight: 'Saat seseorang sedang mengalami badai emosi, paksaan untuk langsung bercerita justru bisa membuatnya semakin tertekan. Memberinya ruang hening sambil tetap berada di dekatnya adalah bentuk dukungan yang sangat dewasa.',
          advice: 'Cukup tunjukkan bahwa kamu ada di dekatnya dan siap mendengarkan kapan pun ia merasa siap untuk berbagi cerita. Keberadaan yang tenang sudah berbicara ribuan kata! 🍃🤍',
        },
        {
          text: 'Merasa ikut sedih dan bingung harus berbuat apa karena takut serbasalah 🥺',
          type: 'recovery',
          validation: 'Rasa bingungmu adalah bukti betapa dalamnya rasa empatimu.',
          insight: 'Merasakan kesedihan orang lain (resonansi emosional) membuktikan bahwa hatimu tidak dingin atau acuh. Merasa takut salah bicara adalah hal yang wajar dialami siapa saja saat menghadapi situasi yang sensitif.',
          advice: 'Kamu tidak harus menjadi ahli psikolog. Cukup tawarkan sebotol air putih atau sehelai tisu dengan senyuman tulus. Tindakan kecil yang tulus jauh lebih berarti daripada kata-kata yang rumit! 🌸🤍',
        },
      ],
      followUp: {
        prompt: 'Bantuan tulus dan sederhana apa yang paling nyaman kamu berikan?',
        choices: [
          'Duduk menemaninya dengan tenang tanpa menuntut penjelasan 🪑',
          'Menawarkan tisu, minum air, atau berbagi camilan kecil 🧃',
          'Mengajak bapak/ibu guru untuk ikut mendampingi dengan bijak 🧑‍🏫',
          'Menggambar emoji senyum lucu di secarik kertas untuknya 🎨',
        ],
      },
    },
    {
      id: 'l3',
      question: 'Saat kamu mengalami kesulitan dalam memahami pelajaran, bagaimana kamu meresponnya?',
      options: [
        {
          text: 'Langsung berani mengangkat tangan dan bertanya pada guru atau teman terdekat! 🙋',
          type: 'positive',
          validation: 'Keberanianmu bertanya adalah kunci pembuka pintu ilmu!',
          insight: 'Pepatah bijak mengatakan bahwa bertanya adalah awal dari kebijaksanaan. Tidak ada rasa malu dalam mengakui bahwa kita belum paham. Sering kali, pertanyaanmu justru mewakili banyak teman lain yang sebenarnya juga ingin bertanya namun masih malu.',
          advice: 'Teruslah pertahankan rasa ingin tahu ini. Siswa yang paling cepat pintar bukanlah yang tidak pernah bingung, melainkan yang paling berani bertanya saat menemui jalan buntu! 👏🚀',
        },
        {
          text: 'Mengajak beberapa sahabat untuk berdiskusi dan belajar bersama secara santai 👥',
          type: 'positive',
          validation: 'Belajar kolaboratif adalah cara terbaik mengasah pemahaman.',
          insight: 'Ketika belajar bersama, setiap orang membawa sudut pandang uniknya. Menerangkan materi kepada kawan lain memperkuat ingatan kita sendiri, sementara mendengarkan penjelasan kawan membuka logika berpikir baru yang segar.',
          advice: 'Jadikan belajar bersama sebagai rutinitas yang menyenangkan. Saling mendukung dalam belajar akan membuat semua teman di kelas sukses bersama-sama tanpa ada yang tertinggal! 📚✨',
        },
        {
          text: 'Membaca ulang catatan secara mandiri dengan tekun sampai memahaminya 🔍',
          type: 'positive',
          validation: 'Ketekunan mandiri adalah ciri kepribadian tangguh.',
          insight: 'Membaca berulang kali, merenungkan konsep, dan mencoba membedah soal sendiri melatih daya juang kognitif (grit). Kebiasaan ini akan membentuk kemampuan berpikir kritis yang mandiri di masa depan.',
          advice: 'Luangkan waktu dengan sabar. Jika setelah berusaha mandiri masih terasa belum jelas, jangan ragu untuk berdiskusi dengan guru pengajar agar pemahamanmu semakin kokoh! 💡📖',
        },
        {
          text: 'Sering merasa malu atau takut ditertawakan teman jika bertanya hal sepele 🫣',
          type: 'recovery',
          validation: 'Buang rasa takut itu jauh-jauh, perasaanmu sangat kami pahami.',
          insight: 'Banyak anak merasa malu karena khawatir dianggap kurang pintar. Padahal kenyataannya, semua penemu dan ilmuwan besar di dunia bermula dari tidak tahu dan bertanya ribuan kali. Kelas adalah tempat yang aman untuk berproses.',
          advice: 'Ingatlah bahwa tidak ada pertanyaan yang bodoh di sekolah. Jika masih ragu bertanya di depan umum, kamu selalu bisa mendatangi meja guru saat jam istirahat untuk bertanya secara pribadi! 🌷🌈',
        },
      ],
      followUp: {
        prompt: 'Kata-kata penyemangat apa yang paling menenangkan hatimu saat belajar?',
        choices: [
          '"Tidak apa-apa salah hari ini, besok kita coba lagi bersama!" 🌻',
          '"Setiap orang punya kecepatan belajarnya masing-masing yang unik!" 🌟',
          '"Aku bangga pada diriku yang terus mencoba walau sulit!" 🤝',
          '"Pelan-pelan saja, selangkah demi selangkah pasti bisa dipahami!" 🌿',
        ],
      },
    },
  ],
  being: [
    {
      id: 'b1',
      question: 'Kapan momen di sekolah yang membuatmu merasa paling bangga, bahagia, dan berharga sebagai dirimu sendiri?',
      options: [
        {
          text: 'Saat berhasil memecahkan soal rumit atau menyelesaikan karya yang memuaskan! 🏆',
          type: 'positive',
          validation: 'Rasa bangga atas karya sendiri adalah hadiah terindah!',
          insight: 'Perasaan puas yang muncul setelah melewati kerja keras yang melelahkan adalah sumber utama terbentuknya efikasi diri (self-efficacy). Kamu telah membuktikan pada dirimu sendiri bahwa ketekunan selalu membuahkan hasil manis.',
          advice: 'Rayakan pencapaian ini dengan rasa syukur! Ingatlah memori keberhasilan ini saat di masa depan kamu menemui rintangan lain yang tampaknya sulit! 🎉🌟',
        },
        {
          text: 'Saat berani maju ke depan kelas mengemukakan pendapat atau berkreasi 🙋',
          type: 'positive',
          validation: 'Keberanian tampil di depan publik adalah modal calon pemimpin!',
          insight: 'Mengalahkan rasa grogi dan menyuarakan pikiran di depan orang banyak membutuhkan keberanian yang luar biasa. Gagasanmu itu penting, dan keberanianmu telah memperkaya wawasan seluruh teman di kelas.',
          advice: 'Teruslah mengasah rasa percaya dirimu. Suaramu memiliki kekuatan untuk membawa kebaikan dan menginspirasi orang lain untuk ikut berani berekspresi! 🚀🎙️',
        },
        {
          text: 'Saat bisa menolong teman yang kesusahan dan melihatnya tersenyum lega 🤝',
          type: 'positive',
          validation: 'Nilai kemanusiaan tertinggi ada di dalam kebaikan hatimu.',
          insight: 'Membawa manfaat dan kebahagiaan bagi orang lain melahirkan kebanggaan batin yang paling murni dan abadi. Tindakanmu telah meringankan beban sahabatmu dan menaburkan benih kasih sayang di sekolah.',
          advice: 'Pertahankan kebiasaan mulia ini. Kebahagiaan sejati bukanlah tentang apa yang kita dapatkan, melainkan tentang apa yang dapat kita berikan kepada sesama! ❤️💎',
        },
        {
          text: 'Masih merasa bingung dan merasa belum ada hal istimewa yang kubanggakan 🙈',
          type: 'recovery',
          validation: 'Dengarkan baik-baik: Dirimu sudah sangat istimewa apa adanya!',
          insight: 'Kamu tidak perlu memenangkan piala berkilau atau menjadi juara kelas untuk berharga. Fakta bahwa kamu adalah anak yang jujur, bangun pagi, bersikap sopan, dan berusaha hadir ke sekolah hari ini sudah merupakan keistimewaan yang luar biasa.',
          advice: 'Berhentilah membandingkan dirimu dengan orang lain. Setiap bunga mekar di musimnya masing-masing. Beri dirimu pelukan hangat dan hargai setiap kebaikan kecil yang telah kamu lakukan! 🏅🌱',
        },
      ],
      followUp: {
        prompt: 'Bakat atau kesenangan apa yang paling ingin kamu eksplorasi lebih jauh?',
        choices: [
          'Menggambar, mewarnai, atau merancang kerajinan tangan kreatif 🎨',
          'Bermain musik, bernyanyi lagu ceria, atau menari bebas 🎵',
          'Olahraga, lari cepat, bermain bola, atau permainan ketangkasan 🏃',
          'Membaca cerita seru, menulis dongeng, atau merakit teka-teki logika ✍️',
        ],
      },
    },
    {
      id: 'b2',
      question: 'Jika kamu mempunyai ide kreatif atau impian baru untuk kelas, bagaimana caramu mengekspresikannya?',
      options: [
        {
          text: 'Langsung bersemangat menceritakannya kepada guru dan teman-teman! 💡',
          type: 'positive',
          validation: 'Antusiasmemu adalah percikan api yang menyalakan perubahan!',
          insight: 'Sikap proaktif dalam membagikan ide kreatif mendorong terciptanya inovasi di kelas. Ketika kamu berani bersuara, kamu menularkan energi positif yang mengajak orang lain untuk bermimpi dan berkarya lebih besar.',
          advice: 'Teruslah menyalurkan ide-idemu dengan penuh semangat. Jangan pernah ragu untuk mencoba gagasan baru demi kemajuan kelas kita bersama! 🚀🌟',
        },
        {
          text: 'Mengajak sahabat terdekat mengobrol santai untuk mematangkan ide bersama 🗣️',
          type: 'positive',
          validation: 'Pendekatan kolaboratif yang sangat matang dan terencana!',
          insight: 'Mendiskusikan ide dengan sahabat terlebih dahulu membantumu menyempurnakan detail dan melihat kemungkinan-kemungkinan baru dari kacamata orang lain. Hal ini membuat rencanamu menjadi jauh lebih kuat dan matang.',
          advice: 'Lanjutkan kolaborasi ini. Dua kepala selalu lebih baik daripada satu kepala dalam melahirkan karya-karya besar yang mengagumkan! 🤝💡',
        },
        {
          text: 'Menuliskannya dengan rapi dalam buku catatan rahasia atau buku gambarku 📝',
          type: 'positive',
          validation: 'Menuliskan ide adalah langkah pertama mewujudkannya ke dunia nyata.',
          insight: 'Buku catatan adalah tempat suci bagi lahirnya inovasi-inovasi bersejarah. Dengan menulis atau menggambar idemu, kamu melatih otak menyusun pola dan konsep secara sistematis dan rapi.',
          advice: 'Simpan dan kembangkan catatan kreatifmu. Pada saat yang tepat nanti, kamu bisa membagikan ide-ide brilianmu itu kepada dunia untuk dinikmati banyak orang! 📖🎨',
        },
        {
          text: 'Khawatir dan takut jika ideku dianggap aneh atau diejek oleh orang lain 🥺',
          type: 'recovery',
          validation: 'Ketakutan itu sangat wajar, namun jangan biarkan itu memadamkan mimpimu.',
          insight: 'Hampir semua penemuan terhebat di dunia pada awalnya pernah ditertawakan karena berbeda dari kebiasaan umum. Keunikan cara berpikirmu justru merupakan kelebihan yang membedakan dirimu dari orang lain.',
          advice: 'Ingatlah bahwa ide yang berbeda adalah benih kemajuan. Beranikan dirimu untuk membagikannya pada satu orang sahabat yang paling kamu percaya terlebih dahulu. Ide-idemu pantas untuk didengar! 🦄🌈',
        },
      ],
      followUp: {
        prompt: 'Ekspresi diri apa yang membuatmu merasa paling bebas dan bahagia?',
        choices: [
          'Mencoretkan warna-warni cerah di atas kanvas tanpa takut salah 🌈',
          'Merakit balok lego, origami kertas, atau proyek eksperimen seru 🧩',
          'Menciptakan yel-yel penyemangat bersama kawan-kawan 📣',
          'Menceritakan petualangan impian dan cita-cita masa depanku 🚀',
        ],
      },
    },
    {
      id: 'b3',
      question: 'Apa doa atau harapan terindahmu untuk dirimu sendiri dan seluruh teman di kelas ini?',
      options: [
        {
          text: 'Semua saling rukun, tidak ada perundungan, dan kelas menjadi rumah yang aman 🕊️',
          type: 'positive',
          validation: 'Harapanmu adalah doa suci bagi terciptanya surga kecil di sekolah.',
          insight: 'Perdamaian, kerukunan, dan ketiadaan perundungan adalah pilar paling utama dari School Well-being. Ketika seluruh anak saling melindungi, setiap hari sekolah akan dipenuhi oleh gelak tawa dan semangat belajar tanpa rasa was-was.',
          advice: 'Mari kita wujudkan impian mulia ini mulai dari diri kita sendiri: senantiasa bertutur kata lembut, merangkul yang lemah, dan menjadi pembela kebenaran di ruang kelas! 🌍🕊️',
        },
        {
          text: 'Bisa saling mendukung meraih cita-cita dan sukses bersama-sama di masa depan 🎓',
          type: 'positive',
          validation: 'Visi persahabatan yang begitu agung dan inspiratif!',
          insight: 'Sukses sendirian terasa sepi, namun melangkah bersama menuju puncak cita-cita sambil bergandengan tangan adalah kebahagiaan sejati. Dukungan moral dari sahabat masa sekolah sering kali menjadi pemantik terbesar kesuksesan di masa depan.',
          advice: 'Tetaplah saling menyemangati saat salah satu dari kalian sedang lelah. Ingatlah: kawan sejati adalah yang saling menguatkan sayap agar bisa terbang tinggi bersama! 🌟🤝',
        },
        {
          text: 'Semoga setiap hari sekolah dipenuhi kejutan petualangan baru yang menyenangkan 🎁',
          type: 'positive',
          validation: 'Jiwa penuh rasa ingin tahu dan optimisme yang menyegarkan!',
          insight: 'Memandang hari esok sebagai petualangan baru menghindarkan kita dari rasa bosan dan jenuh. Sikap haus belajar ini akan mengubah tantangan serumit apa pun menjadi wahana permainan yang mengasyikkan.',
          advice: 'Jaga rasa penasaran ini agar tidak pernah padam. Bangunlah setiap pagi dengan senyuman dan katakan pada dirimu: "Hari ini aku siap belajar dan menemukan keajaiban baru!" 📖🧭',
        },
        {
          text: 'Semoga beban pikiran terasa ringan dan hari-hari kami penuh kedamaian batin 🎈',
          type: 'recovery',
          validation: 'Harapan yang begitu teduh dan menyentuh sanubari terdalam.',
          insight: 'Di tengah kesibukan tugas dan ujian, kedamaian batin adalah hal yang paling kita butuhkan. Menyadari pentingnya kesehatan mental sejak dini adalah kebijaksanaan hidup yang sangat berharga.',
          advice: 'Tarik napas panjang dan lepaskan semua ketegangan yang kamu pikul hari ini. Yakinlah bahwa kamu telah melakukan yang terbaik, dan kedamaian akan senantiasa menaungi langkahmu! 🌸🌈',
        },
      ],
      followUp: {
        prompt: 'Afirmasi positif apa yang ingin kamu tanamkan erat di dalam jiwamu?',
        choices: [
          '"Aku berharga, aku disayangi, dan aku mampu bertumbuh setiap hari!" ✨',
          '"Aku berani mencoba hal baru dan kegagalan adalah guru terbaikku!" 🦁',
          '"Kehadiranku di kelas ini membawa kebaikan dan kebahagiaan!" 💖',
          '"Hari ini aku memilih untuk bersyukur dan tersenyum tulus!" 🌱',
        ],
      },
    },
  ],
};

export function getRandomQuestion(dimension) {
  const list = QUESTIONS_BY_DIMENSION[dimension] || QUESTIONS_BY_DIMENSION.health;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}
