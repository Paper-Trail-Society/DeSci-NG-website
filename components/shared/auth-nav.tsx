"use client";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSignOut } from "@/domains/auth/hooks";
import { useAuthContext } from "@/lib/contexts/auth-context";
import { LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AuthNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthContext();

  const signOutMutation = useSignOut({
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("Sign out error:", error);
    },
  });

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  const navItems = [
    { href: "/dashboard", label: "Your Profile" },
    { href: "/upload-paper", label: "Upload New Paper" },
    { href: "/dashboard/manage-papers", label: "Manage Papers" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/assets/desci-ng-logo.png"
              alt="Desci NG Logo"
              width={100}
              height={100}
              className="h-10 w-auto"
            />
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-[#B52221]"
                    : "text-gray-700 hover:text-[#B52221]"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B52221]" />
                )}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User size={20} className="text-gray-600" />
              <Text className="text-sm text-gray-700 hidden sm:block">
                {user?.email || "User"}
              </Text>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              disabled={signOutMutation.isPending}
              className="flex items-center space-x-2"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthNav;
