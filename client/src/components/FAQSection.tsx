import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section id="faq" className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 text-[var(--main-0)]">Frequently Asked Questions</h2>
        <p className="text-[var(--main-2)] max-w-2xl mx-auto">
          Everything you need to know about tracking your Instagram unfollowers
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border border-[var(--main-1)] bg-white rounded-lg mb-4 overflow-hidden shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:bg-[var(--main-1)]/10 [&[data-state=open]]:bg-[var(--main-1)]/10 text-[var(--main-0)]">
              <span className="text-left font-medium">How do I download my Instagram data?</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2 text-[var(--main-2)]">
              <ol className="list-decimal pl-5 space-y-2">
                <li>Open Instagram on your mobile device or web browser</li>
                <li>Go to your profile and tap on the three lines (hamburger menu)</li>
                <li>Tap "Settings and privacy" near the bottom</li>
                <li>Scroll down and tap "Download your information"</li>
                <li>Select "Request download" and follow the instructions</li>
                <li>Choose "JSON" as the format when given the option</li>
                <li>Instagram will email you when your data is ready to download</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="border border-[var(--main-1)] bg-white rounded-lg mb-4 overflow-hidden shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:bg-[var(--main-1)]/10 [&[data-state=open]]:bg-[var(--main-1)]/10 text-[var(--main-0)]">
              <span className="text-left font-medium">Is my Instagram data safe with Unfollowgram?</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2 text-[var(--main-2)]">
              Absolutely! We process your data entirely in your browser, which means your Instagram information never leaves your device. We don't store, share, or transmit your data to any server. Your privacy is our top priority.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="border border-[var(--main-1)] bg-white rounded-lg mb-4 overflow-hidden shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:bg-[var(--main-1)]/10 [&[data-state=open]]:bg-[var(--main-1)]/10 text-[var(--main-0)]">
              <span className="text-left font-medium">Which files do I need to upload?</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2 text-[var(--main-2)]">
              After downloading your Instagram data, look for the file named <code className="bg-[var(--main-1)]/20 px-1 py-0.5 rounded text-[var(--main-7)]">followers_and_following.json</code> in the downloaded package. This file contains all the information we need to analyze your followers and unfollowers. If you can't find this specific file, you can also upload both <code className="bg-[var(--main-1)]/20 px-1 py-0.5 rounded text-[var(--main-7)]">followers.json</code> and <code className="bg-[var(--main-1)]/20 px-1 py-0.5 rounded text-[var(--main-7)]">following.json</code> files.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4" className="border border-[var(--main-1)] bg-white rounded-lg mb-4 overflow-hidden shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:bg-[var(--main-1)]/10 [&[data-state=open]]:bg-[var(--main-1)]/10 text-[var(--main-0)]">
              <span className="text-left font-medium">How accurate is the unfollower detection?</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2 text-[var(--main-2)]">
              Our tool is highly accurate at finding who is not following you back based on the data Instagram provides. However, the "unfollowed time" and "follow duration" are estimations since Instagram doesn't provide the exact timing of when someone unfollowed you. For the most accurate results, we recommend downloading fresh data from Instagram regularly.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5" className="border border-[var(--main-1)] bg-white rounded-lg mb-4 overflow-hidden shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:bg-[var(--main-1)]/10 [&[data-state=open]]:bg-[var(--main-1)]/10 text-[var(--main-0)]">
              <span className="text-left font-medium">Can I track new unfollowers over time?</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2 text-[var(--main-2)]">
              Yes! For the best tracking experience, download your Instagram data periodically (we recommend once a month) and analyze it with our tool. While we don't store your previous uploads, you can keep track of changes by downloading your data regularly and comparing the results.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6" className="border border-[var(--main-1)] bg-white rounded-lg mb-4 overflow-hidden shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:bg-[var(--main-1)]/10 [&[data-state=open]]:bg-[var(--main-1)]/10 text-[var(--main-0)]">
              <span className="text-left font-medium">Is Unfollowgram affiliated with Instagram?</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2 text-[var(--main-2)]">
              No, Unfollowgram is not affiliated with, endorsed by, or connected to Instagram or Meta in any way. We are an independent tool that helps users analyze their Instagram data. We abide by Instagram's terms of service and only process data that users have legally obtained from Instagram.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}