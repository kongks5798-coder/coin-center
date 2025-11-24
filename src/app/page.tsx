import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { KausTechnology } from "@/components/kaus-technology"
import { BlockchainAutoRecord } from "@/components/blockchain-auto-record"
import { FieldNineFirst } from "@/components/fieldnine-first"
import { BusinessEcosystem } from "@/components/business-ecosystem"
import { RFIDLogisticsSystem } from "@/components/rfid-logistics-system"
import { FulfillmentIntegration } from "@/components/fulfillment-integration"
import { VisionSection } from "@/components/vision-section"
import { BusinessDivisions } from "@/components/business-divisions"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      {/* KAUS 솔루션 메인 */}
      <HeroSection />
      <KausTechnology />
      <BlockchainAutoRecord />
      <FieldNineFirst />
      {/* 나머지 사업들 */}
      <BusinessEcosystem />
      <RFIDLogisticsSystem />
      <FulfillmentIntegration />
      <BusinessDivisions />
      <VisionSection />
      <CTASection />
      <Footer />
    </main>
  )
}
