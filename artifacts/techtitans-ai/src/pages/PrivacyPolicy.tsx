import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "1. Information We Collect",
    content: `When you use our website or contact us through our contact form, we may collect the following types of information:

• **Personal Information:** Your name, email address, and phone number when you fill out our contact form or inquiry form.
• **Project Information:** Details about your business, project requirements, and goals that you voluntarily share with us.
• **Usage Data:** Non-personally identifiable information about how you interact with our website, including pages visited, time spent, and browser type.
• **Communication Data:** Records of correspondence if you contact us via email or phone.

We do not collect sensitive personal data such as financial details, government identification, or health information.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `The information we collect is used for the following purposes:

• To respond to your inquiries and provide the services you have requested.
• To communicate project updates, proposals, invoices, and deliverables.
• To improve our website experience and service offerings.
• To send occasional updates about our services, case studies, or offers — only if you have consented.
• To comply with legal obligations where applicable.

We will never sell, rent, or trade your personal information to third parties for marketing purposes.`,
  },
  {
    title: "3. Services We Provide",
    content: `TechTitans AI provides the following digital services to clients:

• **Branding & Identity Design** — Logo design, brand guidelines, color systems, typography, and visual identity development.
• **Web Development** — Custom website and web application development using modern technologies including React, Node.js, and more.
• **Graphic Design** — Marketing materials, social media graphics, infographics, packaging, and print design.
• **Video Editing & Motion Graphics** — YouTube content, social media reels, product films, explainer videos, and brand films.

In delivering these services, we may process project-related assets you provide us including images, brand files, and content.`,
  },
  {
    title: "4. Data Storage & Security",
    content: `We take the security of your personal information seriously.

• All data transmitted through our contact form is encrypted via HTTPS/TLS.
• We use industry-standard email services with secure authentication to communicate with clients.
• Client files and project assets shared with us are stored securely and deleted upon project completion unless otherwise agreed.
• We do not store payment card information — all transactions are handled through trusted third-party payment processors.

Despite our best efforts, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but commit to protecting your data to the best of our ability.`,
  },
  {
    title: "5. Cookies",
    content: `Our website may use cookies and similar tracking technologies to enhance your browsing experience.

• **Essential Cookies:** Required for the basic functionality of our website.
• **Analytics Cookies:** Help us understand how visitors interact with our website (e.g., which pages are most visited).

You can control cookie settings through your browser settings. Disabling cookies may affect the functionality of certain parts of our website.`,
  },
  {
    title: "6. Third-Party Services",
    content: `We may use trusted third-party services to support our website and operations, including:

• Email delivery services for contact form submissions.
• Analytics platforms to monitor website performance.
• Cloud storage providers for secure project file management.

These third parties are bound by their own privacy policies and only access information necessary to perform their functions.`,
  },
  {
    title: "7. Your Rights",
    content: `You have the following rights regarding your personal data:

• **Access:** You can request a copy of the personal information we hold about you.
• **Correction:** You can ask us to correct any inaccurate information.
• **Deletion:** You can request that we delete your personal data, subject to legal obligations.
• **Opt-Out:** You can unsubscribe from any marketing communications at any time.

To exercise any of these rights, please contact us at techtitansai@zohomail.in.`,
  },
  {
    title: "8. Children's Privacy",
    content: `Our services are intended for businesses and individuals aged 18 and above. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately and we will delete it promptly.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated "Last Revised" date. We encourage you to review this page periodically. Continued use of our website after changes constitutes acceptance of the revised policy.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:

**TechTitans AI**
#134/19, Ground Floor, AVBT Building, ITI Road, Solan (H.P.) 173212
Email: techtitansai@zohomail.in
Phone: 8979768681 | 7876799926 | 86270 79550`,
  },
];

export default function PrivacyPolicy() {
  const [, navigate] = useLocation();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-36 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-16">
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Privacy Policy</h1>
          <p className="text-foreground-muted">
            Last Revised: <span className="text-white">March 2025</span>
          </p>
          <p className="text-foreground-muted mt-4 leading-relaxed">
            At TechTitans AI, we respect your privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard the data you share with us when you
            visit our website or engage our services.
          </p>
        </motion.div>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="text-xl font-display font-bold text-white mb-4">{section.title}</h2>
              <div className="text-foreground-muted leading-relaxed text-sm whitespace-pre-line">
                {section.content.split("**").map((part, idx) =>
                  idx % 2 === 1 ? (
                    <strong key={idx} className="text-white font-semibold">{part}</strong>
                  ) : (
                    <span key={idx}>{part}</span>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
