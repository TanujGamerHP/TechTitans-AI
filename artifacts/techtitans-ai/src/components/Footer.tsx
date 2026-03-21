import { Twitter, Instagram, Linkedin, Github, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center mb-6 inline-flex">
              <img src="/logo.png" alt="TechTitans AI" className="h-10 w-auto object-contain" />
            </a>
            <p className="text-foreground-muted text-sm mb-6">
              Empowering brands with cutting-edge digital solutions. We turn your vision into a stunning digital reality.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/techtitans.ai?utm_source=qr&igsh=MWxkanNyY2Y3NWZmeQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground-muted hover:text-pink-500 hover:border-pink-500 hover:bg-pink-500/10 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground-muted hover:text-primary hover:border-primary hover:bg-primary/10 transition-all" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground-muted hover:text-blue-500 hover:border-blue-500 hover:bg-blue-500/10 transition-all" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground-muted hover:text-white hover:border-white hover:bg-white/10 transition-all" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-display font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="/#services" className="text-foreground-muted hover:text-primary transition-colors text-sm">Services</a></li>
              <li><a href="/portfolio" className="text-foreground-muted hover:text-primary transition-colors text-sm">Portfolio</a></li>
              <li><a href="/about" className="text-foreground-muted hover:text-primary transition-colors text-sm">About Us</a></li>
              <li><a href="/#contact" className="text-foreground-muted hover:text-primary transition-colors text-sm">Contact</a></li>
              <li><a href="/privacy-policy" className="text-foreground-muted hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="/terms-conditions" className="text-foreground-muted hover:text-primary transition-colors text-sm">Terms &amp; Conditions</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-display font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-foreground-muted text-sm leading-relaxed">
                  <a href="tel:8979768681" className="hover:text-white transition-colors block">8979768681</a>
                  <a href="tel:7876799926" className="hover:text-white transition-colors block">7876799926</a>
                  <a href="tel:8627079550" className="hover:text-white transition-colors block">86270 79550</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:techtitansai@zohomail.in" className="text-foreground-muted text-sm hover:text-white transition-colors break-all">
                  techtitansai@zohomail.in
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-white font-display font-bold mb-6">Location</h4>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <address className="text-foreground-muted text-sm not-italic leading-relaxed">
                #134/19, Ground Floor,<br />
                AVBT Building, ITI Road,<br />
                Solan (H.P.) 173212
              </address>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground-muted/60 text-sm">
            © {new Date().getFullYear()} TechTitans AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-foreground-muted/60">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
