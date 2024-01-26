import { Link, Head } from '@inertiajs/react';

import { Button, buttonVariants } from "@/shadcn/ui/button"

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/shadcn/ui/menubar';
import { PageProps } from '@/types';

export default function IndexPage({ auth }: PageProps) {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {auth.user ? (
        <><Menubar className="flex justify-between mb-4">
          <div className="logo">
            <svg width="100" height="100" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1C0.447715 1 0 1.44772 0 2V13C0 13.5523 0.447715 14 1 14H14C14.5523 14 15 13.5523 15 13V2C15 1.44772 14.5523 1 14 1H1ZM7.5 10.625C9.22589 10.625 10.625 9.22589 10.625 7.5C10.625 5.77411 9.22589 4.375 7.5 4.375C5.77411 4.375 4.375 5.77411 4.375 7.5C4.375 9.22589 5.77411 10.625 7.5 10.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </div>
        </Menubar><div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              The Best Quiz Maker for Business & Education
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              ChallengeCreator's secure, professional web-based Quiz maker is an easy-to-use, customizable online testing solution for business, training & educational assessments with Tests & Quizzes graded instantly, saving hours of paperwork!
            </p>
            <Button asChild>
              <Link href={route('dashboard')} className="font-semibold text-white-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Go to dashboard
              </Link>
            </Button>
          </div></>
      ) : (
        <><Menubar className="flex justify-between mb-4">
          <div className="logo">
            <svg width="100" height="100" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1C0.447715 1 0 1.44772 0 2V13C0 13.5523 0.447715 14 1 14H14C14.5523 14 15 13.5523 15 13V2C15 1.44772 14.5523 1 14 1H1ZM7.5 10.625C9.22589 10.625 10.625 9.22589 10.625 7.5C10.625 5.77411 9.22589 4.375 7.5 4.375C5.77411 4.375 4.375 5.77411 4.375 7.5C4.375 9.22589 5.77411 10.625 7.5 10.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </div>
          <div className="button flex gap-4">
            <Button asChild>
              <Link href={route('login')} className="font-semibold text-white-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Log in
              </Link>
            </Button>
            <Button asChild>
              <Link href={route('register')} className="font-semibold text-white-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Sign up
              </Link>
            </Button>
          </div>
        </Menubar>
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              The Best Quiz Maker for Business & Education
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              ChallengeCreator's secure, professional web-based Quiz maker is an easy-to-use, customizable online testing solution for business, training & educational assessments with Tests & Quizzes graded instantly, saving hours of paperwork!
            </p>
            <Button asChild>
              <Link href={route('dashboard')} className="font-semibold text-white-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Get Started
              </Link>
            </Button>
          </div></>
      )
      }
    </section>
  )
}