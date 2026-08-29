const userProfile = {
  nama: "Reza Al Fahri",
  nik: "1103042509990002",
  roleOptions: ["Warga", "Relawan", "Petugas BPBD"],
  roleDefault: "Warga",
  homeDesa: "Ketambe",
  radiusKm: 10,
};

export default userProfile;

export function maskNik(nik) {
  if (!nik || nik.length < 8) return nik;
  const start = nik.slice(0, 4);
  const end = nik.slice(-4);
  return `${start} **** **** ${end}`;
}
