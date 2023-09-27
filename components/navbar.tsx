"use client";

import { Button } from "./ui/button";
import { ModeToggle } from "./toggle";
import { Home, ShoppingBag, Mail, PencilRuler, Glasses, Slack } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  function navigateTo(path: string) {
    router.push(path);
  }

  return (
    <div className="border bg-card text-card-foreground p-3 shadow-sm md:rounded-lg flex justify-between items-center top-0 sticky z-50">
      {/* Navigation Menus */}
      <div className="space-x-3 items-center">
        <Button
        onClick={() => navigateTo("/")}
        variant="outline"
        size="sm"
        className="ml-auto h-8">
            <Home className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => navigateTo("/")}
          variant="outline"
          size="sm"
          className="ml-auto h-8"
        >
          <Glasses className=" h-4 w-4" />
          <span className="hidden md:block ml-2">Home</span>
        </Button>
        <Button
          onClick={() => navigateTo("/outstatic")}
          variant="outline"
          size="sm"
          className="ml-auto h-8"
        >
          <Slack className=" h-4 w-4" />
          <span className="hidden md:block ml-2">Community</span>
        </Button>
        <Button
          onClick={() => navigateTo("/#projects")}
          variant="outline"
          size="sm"
          className="ml-auto h-8"
        >
          <PencilRuler className=" h-4 w-4" />
          <span className="hidden md:block ml-2">VR</span>
        </Button>
        <Button
          onClick={() => navigateTo("/#work")}
          variant="outline"
          size="sm"
          className="ml-auto h-8"
        >
          <ShoppingBag className=" h-4 w-4" />
          <span className="hidden md:block ml-2">Store</span>
        </Button>
        <Button
          onClick={() => navigateTo("/#contact")}
          variant="outline"
          size="sm"
          className="ml-auto h-8"
        >
          <Mail className=" h-4 w-4" />
          <span className="hidden md:block ml-2">Contact</span>
        </Button>
      </div>

      {/* ModeToggle on the right */}
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
}
