import Link from 'next/link';
import Logo from '@/components/core/Logos/Logo/Logo';
import { SearchButton } from '@/components/Search';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NavItems, NavPopover } from '@/components/Header';
import SplashHeader from "@/components/core/Headers/SplashHeader";
import SplashFooter from '@/components/core/Footer/SplashFooter';
import clsx from 'clsx';
import styles from '@/pages/index.module.css';

export function SplashPageLayout({ children }) {
    return (
        <>
            <SplashHeader 
                appName={process.env.NEXT_PUBLIC_APP_NAME}
                gitHubUrl={process.env.NEXT_PUBLIC_APP_REPOSITORY}
                navigationItems={[
                    {
                        href: "/docs/installation",
                        path: "/docs/",
                        label: "Docs",        
                    },
                    {
                        href: "/blog",
                        path: "/blog",
                        label: "Blog",        
                    }
                ]}
                beams={true}
            />
            <main className="pt-10 mb-6 mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12">
                {children}
            </main>
            <SplashFooter navigation={[
              {
                title: "Community",
                links: [
                    { title: 'GitHub', href: process.env.NEXT_PUBLIC_APP_REPOSITORY, external: true },
                    { title: 'Indie Hackers', href: 'https://www.indiehackers.com/product/elegant-framework', external: true },
                    { title: 'Twitter', href: 'https://twitter.com/thebrandonowens', external: true },
                    { title: 'Reddit', href: 'https://www.reddit.com/r/elegantframework/', external: true }
                ]
              },
              {
                  title: "Features",
                  links: [
                      { title: 'Theme Customization', href: 'https://elegantframework.com/docs/theme/' },
                      { title: 'Easy Configuration', href: 'https://elegantframework.com/docs/configuration/' },
                      { title: 'Affordable Hosting', href: 'https://elegantframework.com/docs/deployment/' },
                      { title: 'Safe & Fast', href: 'https://elegantframework.com/blog/2023-04-20-the-future-is-markdown'}
                  ]
              },
              {
                  title: "Services",
                  links: [
                      { title: 'Google Analytics', href: 'https://elegantframework.com/docs/google-analytics/' },
                      { title: 'ConvertKit', href: 'https://elegantframework.com/docs/convertkit/' },
                      { title: 'Vercel', href: 'https://elegantframework.com/docs/deployment/' },
                  ]
              },
              {
                title: "Resources",
                links: [
                    { title: 'Website Design Services', href: 'https://elegantframework.com/experts' },
                ]
                }   
            ]}/>
        </>
    );
};