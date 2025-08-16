// app/educations/page.tsx
import { Suspense } from 'react';
import EducationsPage from './educationWidget';

export default function Educations() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <EducationsPage />
    </Suspense>
  );
}