import { MarketingPageLayout } from '@/components/marketing-layout';
import { Mail, MessageSquare, MapPin, Globe, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  return (
    <MarketingPageLayout
      title="How can we help you?"
      subtitle="Whether you're looking for a custom enterprise plan or need technical support, our team is here to help."
      icon={MessageSquare}
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Get in touch</h2>
            <p className="text-gray-500">
              Expect a response within 2-4 hours during business hours (UTC-5).
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  placeholder="Jane"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  placeholder="Doe"
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jane@company.com"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                rows={4}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-xl border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="How can we help?"
              />
            </div>
            <Button className="w-full rounded-xl py-6 font-bold shadow-xl shadow-blue-500/20">
              Send Message
            </Button>
          </form>
        </div>

        <div className="space-y-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Contact Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="rounded-lg bg-gray-50 p-2 text-blue-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Email
                  </p>
                  <a
                    href="mailto:hello@noxfolio.com"
                    className="font-medium transition-colors hover:text-blue-600"
                  >
                    hello@noxfolio.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="rounded-lg bg-gray-50 p-2 text-blue-600">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Support
                  </p>
                  <a
                    href="mailto:support@noxfolio.com"
                    className="font-medium transition-colors hover:text-blue-600"
                  >
                    support@noxfolio.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="rounded-lg bg-gray-50 p-2 text-blue-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Headquarters
                  </p>
                  <p className="font-medium">
                    101 California St, San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-8">
            <h4 className="mb-2 font-bold text-blue-900">Technical Support</h4>
            <p className="mb-4 text-sm text-blue-700">
              Are you a developer integrated with our API? Check our
              documentation for faster troubleshooting.
            </p>
            <a
              href="/docs"
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              View API Docs →
            </a>
          </div>
        </div>
      </div>
    </MarketingPageLayout>
  );
}
