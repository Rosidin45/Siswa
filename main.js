import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

// ini adalah konfigurasi firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFYmmVvk-jLZIeAdYKiTwVw2jqd4VINFA",
  authDomain: "insan-cemerlang.firebaseapp.com",
  projectId: "insan-cemerlang",
  storageBucket: "insan-cemerlang.appspot.com",
  messagingSenderId: "579109661574",
  appId: "1:579109661574:web:4a7cd4060f70eded945a07"
};

// Inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function tambahBuah(item, harga, jumlah) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "inventory"), {
      item: item,
      harga: harga,
      jumlah: jumlah, 
    })

    // menampilkan pesan berhasil
    console.log("berhasil menyimpan data minuman")
  } catch (error) {
    // menampilkan pesan gagal
    console.log("gagal menyimpan minuman")
  }
}

export async function ambilDaftarminuman() {
  const refDokumen = collection(basisdata, "inventory");
  const kueri = query(refDokumen, orderBy("item"));
  const cuplikanKueri = await getDocs(kueri);

  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      item: dokumen.data().item,
      harga: dokumen.data().harga,
      jumlah: dokumen.data().jumlah
    })
  })

  return hasilKueri;
}

export async function hapusitem(id) {
  await deleteDoc(doc(basisdata, "item", id))
}

export async function ubahitem(id, itembaru, hargabaru, jumlahbaru) {
  await updateDoc(
    doc(basisdata, "item", id),
    { item: itembaru, harga: hargabaru, jumlah: jumlahbaru }
  )
}

export async function ambilitem(id) {
  const refDokumen = await doc(basisdata, "item", id)
  const snapshotDokumen = await getDoc(refDokumen)
  
  return await snapshotDokumen.data()
}