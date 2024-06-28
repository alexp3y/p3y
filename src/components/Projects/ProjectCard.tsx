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
    <div className="rounded-lg bg-p3y-red">
      <div className="flex flex-col h-fit text-p3y-gunmetal dark:text-p3y-red rounded-[9px] border-2 border-p3y-red translate-x-[5px] -translate-y-[5px]">
        <div className="h-[220px]">
          <Image
            priority
            className="rounded-t-lg"
            src={image}
            width={375}
            height={220}
            alt={title}
          />
        </div>
        <div className="w-full text-center flex flex-col flex-grow items-center justify-between bg-p3y-ivory dark:bg-p3y-gunmetal rounded-b-lg border-t border-p3y-red">
          <div className="w-full py-2">
            <h3 className="text-2xl uppercase dark:text-p3y-grey">{title}</h3>
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
                    className="border rounded-full px-4 py-[6px] border-p3y-gunmetal dark:bg-p3y-gunmetal dark:border-p3y-red -translate-y-[1px] translate-x-[1px] hover:translate-x-[2px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0 duration-150 transition-all bg-p3y-red"
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
                    className="border rounded-full px-4 py-[6px] border-p3y-gunmetal dark:bg-p3y-gunmetal dark:border-p3y-red -translate-y-[1px] translate-x-[1px] hover:translate-x-[2px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0 duration-150 transition-all bg-p3y-red"
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
            <p className="text-base dark:text-p3y-grey">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
