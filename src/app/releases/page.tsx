import fs from 'fs';
import path from 'path';

import Link from 'next/link';

import Header from '@/components/collections/layouts/Header';

const Releases = (): React.ReactElement => {
  const versionsDir = path.join(process.cwd(), 'versions');
  const files = fs.readdirSync(versionsDir);

  const releases = files
    .map((file) => {
      const filePath = path.join(versionsDir, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return { ...content, version: file.replace('.json', '') };
    })
    .reverse();

  return (
    <div className="relative isolate">
      <Header />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
              Our Releases
            </h2>
            <p className="mt-2 mb-2 text-lg/8 text-gray-300">
              We&apos;re working hard to make this app as useful for you as possible. You can check
              what&apos;s new on this page , and you can even join our{' '}
              <Link
                href={'https://discord.gg/YQP4wwbyfg'}
                target="_blank"
                className="text-indigo-500"
              >
                Discord
              </Link>{' '}
              to share ideas and participate to the project!
            </p>
            <p className="mt-2 text-lg/8 text-gray-300">
              We are in the process of building exciting new features to help you build knowledge
              and progress, some leveraging the newest AI technologies. So stay tuned!
            </p>
            <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
              {releases.map((release) => (
                <article
                  key={release.version}
                  className="flex max-w-xl flex-col items-start justify-between"
                >
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={release.datetime} className="text-white">
                      {release.date}
                    </time>
                    <p className="relative rounded-full bg-indigo-500 px-3 py-1.5 font-medium text-white">
                      v{release.version}
                    </p>
                  </div>
                  <div className="relative">
                    <h3 className="mt-3 text-lg/6 font-semibold text-white">
                      <span className="absolute inset-0" />
                      {release.title}
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-300">
                      {release.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Releases;
