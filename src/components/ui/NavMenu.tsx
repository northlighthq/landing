"use client";

import * as Primitive from "@radix-ui/react-navigation-menu";
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from "react";
import { cn } from "@/lib/cn";

export const NavMenu = Primitive.Root;

export const NavMenuList = Primitive.List;

export const NavMenuLink = Primitive.Link;

export const NavMenuItem = forwardRef<ComponentRef<typeof Primitive.Item>, ComponentPropsWithoutRef<typeof Primitive.Item>>(function NavMenuItem({ className, ...props }, ref) {
  return <Primitive.Item ref={ref} className={cn("list-none", className)} {...props} />;
});

export const NavMenuTrigger = forwardRef<ComponentRef<typeof Primitive.Trigger>, ComponentPropsWithoutRef<typeof Primitive.Trigger>>(function NavMenuTrigger({ className, ...props }, ref) {
  return <Primitive.Trigger ref={ref} className={cn("group", className)} {...props} />;
});

export const NavMenuContent = forwardRef<ComponentRef<typeof Primitive.Content>, ComponentPropsWithoutRef<typeof Primitive.Content>>(function NavMenuContent({ className, ...props }, ref) {
  return <Primitive.Content ref={ref} className={cn("absolute inset-x-0 top-0 data-[motion=from-end]:animate-[nav-from-right_180ms_ease-out] data-[motion=from-start]:animate-[nav-from-left_180ms_ease-out] data-[motion=to-end]:animate-[nav-to-right_180ms_ease-out] data-[motion=to-start]:animate-[nav-to-left_180ms_ease-out]", className)} {...props} />;
});

export const NavMenuViewport = forwardRef<ComponentRef<typeof Primitive.Viewport>, ComponentPropsWithoutRef<typeof Primitive.Viewport>>(function NavMenuViewport({ className, ...props }, ref) {
  return (
    <div className="flex w-full justify-center">
      <Primitive.Viewport
        ref={ref}
        className={cn("relative h-(--radix-navigation-menu-viewport-height) w-full origin-[top_center] overflow-hidden transition-[height] duration-200 ease-out data-[state=closed]:animate-[nav-out_120ms_ease-in] data-[state=open]:animate-[nav-in_150ms_ease-out]", className)}
        {...props}
      />
    </div>
  );
});
