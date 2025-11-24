import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 lg:py-16 bg-card/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="text-2xl font-bold tracking-tight text-foreground mb-4">FIELDNINE</div>
            <p className="text-sm text-muted-foreground mb-4">넥서스 더 필드나인</p>
            <p className="text-sm text-muted-foreground">AI로 앞서가는 대한민국의 미래</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Business</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#business"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  AI 물류
                </Link>
              </li>
              <li>
                <Link
                  href="#business"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  풀필먼트
                </Link>
              </li>
              <li>
                <Link
                  href="#business"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  브랜드 사업
                </Link>
              </li>
              <li>
                <Link
                  href="#business"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  패션 사업
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Technology</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#technology"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  KAUS AI
                </Link>
              </li>
              <li>
                <Link
                  href="#technology"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  KAUS Coin
                </Link>
              </li>
              <li>
                <Link
                  href="#technology"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Platform
                </Link>
              </li>
              <li>
                <Link
                  href="#technology"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#vision" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="text-lg font-bold tracking-tight text-foreground">FIELDNINE</div>
            <span className="text-sm text-muted-foreground">넥서스 더 필드나인</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 FieldNine. All rights reserved. Powered by KAUS Technology.
          </div>
        </div>
      </div>
    </footer>
  )
}

