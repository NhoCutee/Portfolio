export interface CertificateItem {
  file: string;
  title?: string;
  issuer?: string;
  date?: string;
}

export const certificates: CertificateItem[] = [
  // Thêm chứng chỉ của bạn vào đây (hoặc chỉ cần thả ảnh vào thư mục public/certificates/):
  // {
  //   file: '/certificates/my-certificate.png',
  //   title: 'My Certificate',
  //   issuer: 'Issuer Name',
  //   date: '2025-01-01',
  // },
];

const achievementsConfig = {
  certificates,
};

export default achievementsConfig;
