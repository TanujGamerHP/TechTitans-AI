import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the TechTitans AI website or engaging our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services.

These Terms apply to all visitors, clients, and others who access or use our services. We reserve the right to update these Terms at any time without prior notice. Continued use of our services after any changes constitutes your acceptance of the revised Terms.`,
  },
  {
    title: "2. Services Offered",
    content: `TechTitans AI provides professional digital services including but not limited to:

• **Branding & Identity Design** — Logo creation, visual identity systems, brand guidelines, and packaging design.
• **Web Development** — Custom websites, web applications, e-commerce stores, and landing pages.
• **Graphic Design** — Social media graphics, marketing materials, infographics, and print design.
• **Video Editing & Motion Graphics** — Content creation, brand films, explainer videos, reels, and YouTube content.

The specific scope, deliverables, timelines, and pricing for each project are defined in a separate Project Agreement or proposal document signed by both parties.`,
  },
  {
    title: "3. Project Agreements & Payments",
    content: `3.1 **Proposals & Contracts:** All projects begin with a written proposal or contract outlining the scope of work, deliverables, timeline, and payment terms. Work will commence only after the client approves the proposal in writing.

3.2 **Payment Terms:** A deposit (typically 50% of the project fee) is required before work begins. The remaining balance is due upon project completion and before final files are delivered.

3.3 **Late Payments:** Invoices unpaid after the agreed due date may incur a late fee of 2% per month on the outstanding balance.

3.4 **Refund Policy:** Deposits are non-refundable once work has commenced. If a project is cancelled mid-way, the client is liable for payment proportional to the work completed.`,
  },
  {
    title: "4. Client Responsibilities",
    content: `To ensure smooth project delivery, the client agrees to:

• Provide all necessary materials, content, assets, and feedback in a timely manner.
• Designate a single point of contact for project communication.
• Review and provide feedback on deliverables within the agreed review window (typically 5 business days).
• Ensure that any materials provided to TechTitans AI do not infringe upon third-party intellectual property rights.

Delays caused by the client (e.g., late content delivery, delayed feedback) may result in adjusted project timelines and/or additional costs.`,
  },
  {
    title: "5. Intellectual Property",
    content: `5.1 **Client Ownership:** Upon receipt of full payment, all final deliverables and creative assets become the property of the client.

5.2 **Portfolio Rights:** TechTitans AI retains the right to display completed work in our portfolio, website, social media, and marketing materials unless the client explicitly requests confidentiality in writing.

5.3 **Pre-Payment Ownership:** All work-in-progress materials remain the intellectual property of TechTitans AI until full payment has been received.

5.4 **Third-Party Assets:** Any stock images, fonts, icons, or software licensed for use in a project are subject to their respective licensing agreements. TechTitans AI will inform the client of any third-party licensing requirements.`,
  },
  {
    title: "6. Revisions & Scope Changes",
    content: `Each project includes a specified number of revision rounds as outlined in the project proposal. Additional revisions or changes to the original scope of work will be quoted and billed separately.

Scope changes that significantly alter the project direction, add features, or extend timelines may require a revised proposal and additional deposit before work continues.`,
  },
  {
    title: "7. Confidentiality",
    content: `Both parties agree to keep all project-related information, business strategies, and proprietary data confidential. TechTitans AI will not share your project details, business information, or any materials you provide with any third party without your explicit written consent — except as required to deliver the agreed services (e.g., sharing assets with a printing vendor).`,
  },
  {
    title: "8. Limitation of Liability",
    content: `TechTitans AI shall not be liable for any indirect, incidental, consequential, or punitive damages arising from the use of our services or deliverables. Our total liability for any claim arising under these Terms shall not exceed the total fees paid by the client for the specific project in question.

We are not responsible for any losses arising from client-provided content that infringes third-party rights, technical failures beyond our control, or client decisions made based on our creative work.`,
  },
  {
    title: "9. Warranties & Disclaimers",
    content: `TechTitans AI warrants that all work is created with professional skill and care. However, we do not guarantee specific business outcomes, search engine rankings, or conversion rates from any design, development, or marketing work.

The website and its content are provided "as is." We make no warranties, express or implied, regarding the accuracy or completeness of information on our website.`,
  },
  {
    title: "10. Termination",
    content: `Either party may terminate a project with 14 days' written notice. Upon termination:

• The client must pay for all work completed up to the termination date.
• TechTitans AI will deliver all completed work-in-progress upon receipt of final payment.
• Deposits are non-refundable.

TechTitans AI reserves the right to refuse or terminate services at any time if a client engages in abusive, unethical, or unlawful behavior.`,
  },
  {
    title: "11. Governing Law",
    content: `These Terms and Conditions are governed by the laws of India. Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts of Solan, Himachal Pradesh, India.`,
  },
  {
    title: "12. Contact Us",
    content: `If you have any questions about these Terms and Conditions, please contact us:

**TechTitans AI**
#134/19, Ground Floor, AVBT Building, ITI Road, Solan (H.P.) 173212
Email: techtitansai@zohomail.in
Phone: 8979768681 | 7876799926 | 86270 79550`,
  },
];

export default function TermsConditions() {
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
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Terms &amp; Conditions</h1>
          <p className="text-foreground-muted">
            Last Revised: <span className="text-white">March 2025</span>
          </p>
          <p className="text-foreground-muted mt-4 leading-relaxed">
            Please read these Terms and Conditions carefully before using TechTitans AI's website or engaging
            our services. These terms outline the rules and regulations for the use of our services and website.
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
