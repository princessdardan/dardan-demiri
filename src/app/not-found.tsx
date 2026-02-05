import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        {/* Creative 404 illustration */}
        <div className="relative mb-8">
          <div className="text-[150px] md:text-[200px] font-display font-bold text-accent/10 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-accent-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-accent" />
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
          Page not found
        </h1>

        <p className="text-foreground-muted mb-8">
          Looks like this page took a wrong turn. The page you're looking for
          doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/#portfolio">
              <ArrowLeft className="w-4 h-4 mr-2" />
              View My Work
            </Link>
          </Button>
        </div>

        {/* Fun message */}
        <p className="mt-12 text-sm text-foreground-subtle">
          Fun fact: The first 404 error was in 1992, and people have been
          getting lost on the internet ever since.
        </p>
      </div>
    </div>
  );
}
