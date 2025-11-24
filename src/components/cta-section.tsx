import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 border-t border-border" id="contact">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            필드나인과 함께
            <br />
            미래를 만들어가세요
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground mb-12 text-pretty">
            AI 기술과 블록체인이 만드는 혁신적인 비즈니스 생태계에 참여하세요
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium px-8 py-6 h-auto"
            >
              파트너십 문의
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-foreground/20 text-foreground hover:bg-foreground/10 text-base font-medium px-8 py-6 h-auto bg-transparent"
            >
              사업 소개서 다운로드
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

