import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nuzhat-portfolio-alpha.vercel.app'
  const routes = ['','about','projects','skills','contact','case-study','case-study/compulse','case-study/biometric-attendance-system','case-study/novus-comply-upsi','case-study/nsa-sports-platform','case-study/cas-parser','case-study/hospital-sop-portal'].map((r) => `${base}/${r}`)
  return routes.map((url) => ({ url, lastModified: new Date() }))
}
