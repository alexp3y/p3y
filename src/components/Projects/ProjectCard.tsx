import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  demoUrl?: string;
  repoUrl?: string;
  image: string;
  title: string;
  description: string;
}

const ProjectCard: React.FC<Props> = ({
  demoUrl,
  repoUrl,
  image,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col h-fit text-p3y-gunmetal dark:text-p3y-grey shadow-lg rounded-xl">
      <div className="h-[220px] border border-p3y-gunmetal dark:border-p3y-grey rounded-t-[8px]">
        <Image
          priority
          className="rounded-t-lg"
          src={image}
          width={375}
          height={220}
          alt={title}
        />
      </div>
      <div className="w-full text-center flex flex-col flex-grow items-center justify-between dark:bg-p3y-gunmetal rounded-b-xl  border border-p3y-gunmetal dark:border-p3y-grey">
        <div className="w-full bg-p3y-ivory dark:bg-p3y-gunmetal py-2 border-b">
          <h3 className="text-2xl uppercase">{title}</h3>
        </div>
        <div className="p-3 gap-y-2 flex flex-col">
          <div className="flex items-center justify-center w-full gap-x-8 transform duration-150 transition-transform">
            <Link
              href={demoUrl ? demoUrl : '/'}
              target="_blank"
              rel="noreferrer noopener"
              aria-disabled={!demoUrl}
            >
              <div className="bg-p3y-gunmetal dark:bg-p3y-red rounded-full">
                <button
                  className="border bg-p3y-ivory dark:bg-p3y-gunmetal dark:border-p3y-grey rounded-full px-4 py-[6px] border-p3y-gunmetal hover:translate-x-[2px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0 duration-150 transition-all hover:bg-p3y-red"
                  disabled={!demoUrl}
                >
                  <Image
                    className="dark:hidden"
                    priority
                    src={'/images/link.svg'}
                    width={18}
                    height={18}
                    alt={title}
                  />
                  <Image
                    className="hidden dark:block"
                    priority
                    src={'/images/link-light.svg'}
                    width={18}
                    height={18}
                    alt={title}
                  />
                </button>
              </div>
            </Link>
            <Link
              href={repoUrl ? repoUrl : '/'}
              target="_blank"
              rel="noreferrer noopener"
              aria-disabled={!repoUrl}
            >
              <div className="bg-p3y-gunmetal dark:bg-p3y-red rounded-full">
                <button
                  className="border bg-p3y-ivory rounded-full px-4 py-[6px] border-p3y-gunmetal dark:bg-p3y-gunmetal dark:border-p3y-grey hover:translate-x-[2px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0 duration-150 transition-all hover:bg-p3y-red"
                  disabled={!repoUrl}
                >
                  <Image
                    className="dark:hidden"
                    priority
                    src={'/images/code.svg'}
                    width={18}
                    height={18}
                    alt={title}
                  />
                  <Image
                    className="hidden dark:block"
                    priority
                    src={'/images/code-light.svg'}
                    width={18}
                    height={18}
                    alt={title}
                  />
                </button>
              </div>
            </Link>
          </div>
          <p className="text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
