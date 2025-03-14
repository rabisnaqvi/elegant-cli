import { Widont } from '@/components/home/common';
import { NewsletterForm } from '@/components/core/NewsletterForm/NewsletterForm';
import { formatDate } from '@/utils/formatDate';
import { mdxComponents } from '@/utils/mdxComponents';
import { MDXProvider } from '@mdx-js/react';
import clsx from 'clsx';
import Link from 'next/link';
import { ArticleJsonLd } from 'next-seo';
import { useRouter } from 'next/router';

export function BlogPostLayout({ children, meta }) {
  // use our router to get the url
  const router = useRouter();

  let author = "";

  // get our author
  {meta.authors.map((author) => (
    author = author.name
  ))}

  return (
    <>
      <ArticleJsonLd 
        useAppDir={false}
        url={process.env.NEXT_PUBLIC_APP_URL + router.pathname}
        title={meta.title}
        images={[
          process.env.NEXT_PUBLIC_APP_URL + meta.image.src
        ]}
        datePublished={meta.date}
        authorName={[{
          name: author,
          url: `https://twitter.com/${author.twitter}`,
        }]}
        description={meta.description}
        isAccessibleForFree={true}
      />
      <div className="overflow-hidden">
        <div className="max-w-8xl mx-auto">
          <div className="flex px-4 pt-8 pb-10 lg:px-8">
            <Link href="/blog">
              <a className="group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
                <svg
                  viewBox="0 -9 3 24"
                  className="overflow-visible mr-3 text-slate-400 w-auto h-6 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                >
                  <path
                    d="M3 0L0 3L3 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Go back
              </a>
            </Link>
          </div>
        </div>
        <div className="px-4 sm:px-6 md:px-8">
          <div className="max-w-3xl mx-auto pb-28">
            <main>
              <article className="relative pt-10">
                <h1
                  className={clsx(
                    'text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl '
                  )}
                >
                  <Widont>{meta.title}</Widont>
                </h1>
                <div className="text-sm leading-6">
                  <dl>
                    <dt className="sr-only">Date</dt>
                    <dd
                      className={clsx('absolute top-0 inset-x-0 text-slate-700 dark:text-slate-400')}
                    >
                      <time dateTime={meta.date}>
                        {formatDate(meta.date, '{dddd}, {MMMM} {DD}, {YYYY}')}
                      </time>
                    </dd>
                  </dl>
                </div>
                <div className="mt-6">
                  <ul className={clsx('flex flex-wrap text-sm leading-6 -mt-6 -mx-5')}>
                    {meta.authors.map((author) => (
                      <li
                        key={author.twitter}
                        className="flex items-center font-medium whitespace-nowrap px-5 mt-6"
                      >
                        <img
                          src={author.avatar}
                          alt=""
                          className="mr-3 w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800"
                          decoding="async"
                        />
                        <div className="text-sm leading-4">
                          <div className="text-slate-900 dark:text-slate-200">{author.name}</div>
                          <div className="mt-1">
                            <a
                              href={`https://twitter.com/${author.twitter}`}
                              className="text-primary-500 hover:text-primary-600 dark:text-primary-400"
                            >
                              @{author.twitter}
                            </a>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={clsx('mt-12 prose prose-slate dark:prose-dark')}>
                  <MDXProvider components={mdxComponents}>{children}</MDXProvider>
                </div>
              </article>
            </main>
            <footer className="mt-16">
            <div className="relative">
                <NewsletterBlock action={process.env.NEXT_PUBLIC_CONVERTKIT_ACTION_URL}/>
              </div>
              <div className="relative">
                <section className="relative py-16 border-t border-slate-200 dark:border-slate-200/5">
                  <div className='pt-8 pb-10 text-center text-slate-500 dark:border-slate-200/5'>
                    Built with <a href='https://elegantframework.com/' 
                        aria-label='Built with the Elegant framework'
                        className='font-semibold hover:text-primary-500 dark:hover:text-primary-400'
                      >
                        Elegant
                      </a>.
                  </div>
                </section>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * A newsletter signup form.
 * @param {string} action an action url to handle the for submission.
 * @returns An html section containing a newsletter signup form.
 */
const NewsletterBlock = ({action}) => {
  // if a url to handle the newsletter click has been provided
  // allow the newsletter sign up section to be displayed.
  if(action !== undefined && action.length > 0)
  {
    return(
      <section className="relative py-16 border-t border-slate-200 dark:border-slate-200/5">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight dark:text-white">
          Get all of our updates directly to your inbox.
          <br />
          Sign up for our newsletter.
        </h2>
        <div className="mt-5 max-w-md">
          <NewsletterForm action={action} />
        </div>
      </section>
    );
  }
  return null;
};