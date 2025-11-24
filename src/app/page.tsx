import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { BusinessEcosystem } from "@/components/business-ecosystem"
import { RFIDLogisticsSystem } from "@/components/rfid-logistics-system"
import { FulfillmentIntegration } from "@/components/fulfillment-integration"
import { KausTechnology } from "@/components/kaus-technology"
import { VisionSection } from "@/components/vision-section"
import { BusinessDivisions } from "@/components/business-divisions"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <BusinessEcosystem />
      <RFIDLogisticsSystem />
      <FulfillmentIntegration />
      <KausTechnology />
      <BusinessDivisions />
      <VisionSection />
      <CTASection />
      <Footer />
    </main>
  )
}
