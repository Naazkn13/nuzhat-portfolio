import CaseStudyClient from '@/components/CaseStudyClient'

export async function generateStaticParams() {
  return [
    { slug: 'compulse' },
    { slug: 'biometric-attendance-system' },
    { slug: 'novus-comply-upsi' },
    { slug: 'nsa-sports-platform' },
    { slug: 'hospital-sop-portal' },
    { slug: 'cas-parser' },
  ]
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <CaseStudyClient slug={slug} />
}
