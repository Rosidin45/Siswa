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

export async function tambahBuah(nama, warna, harga) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "Buah"), {
      nama: nama,
      warna: warna,
      harga: harga
    })

    // menampilkan pesan berhasil
    console.log("berhasil menyimpan data buah")
  } catch (error) {
    // menampilkan pesan gagal
    console.log("gagal menyimpan data buah")
  }
}

export async function ambilDaftarBuah() {
  const refDokumen = collection(basisdata, "Buah");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      warna: dokumen.data().warna,
      harga: dokumen.data().harga
    })
  })

  return hasilKueri;
}

export async function hapusBuah(id) {
  await deleteDoc(doc(basisdata, "Buah", id))
}

export async function unahBuah(id, namabaru, warnabaru,hargabaru) {
  await updateDoc(
    doc(basisdata, "ubah",id), 
    {nama:namabaru, warna: warnabaru, harga:hargabaru}
    ) 
}
export async function ambilBuah(id) {
  const refDokumen = await doc(basisdata, "Buah", id)
  const snapshotDokumen = await getDoc(refDokumen)
  
  return await snapshotDokumen.data()
}
