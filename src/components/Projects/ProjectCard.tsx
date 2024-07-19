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
    <div className="relative bg-p3y-red w-[300px] md:w-[350px] aspect-square">
      <div className="absolute bg-p3y-blue translate-x-4 -translate-y-3 w-[300px] md:w-[350px] aspect-square"></div>
      <div className="w-[300px] md:w-[350px] aspect-square flex flex-col text-p3y-gunmetal dark:text-p3y-red border-2 border-p3y-gunmetal dark:border-p3y-grey translate-x-2 -translate-y-1">
        <div className="max-h-fit">
          <Image
            priority
            className=""
            src={image}
            width={350}
            height={220}
            alt={title}
          />
        </div>
        <div className="w-full text-center flex flex-col flex-grow items-center justify-evenly bg-p3y-grey dark:bg-p3y-gunmetal border-t-2 border-p3y-gunmetal">
          <div className="w-full pb-1">
            <h3 className="text-2xl uppercase dark:text-p3y-grey">{title}</h3>
          </div>
          <div className="flex items-center justify-center w-full gap-x-8 transform duration-150 transition-transform">
            <Link
              href={demoUrl ? demoUrl : '/'}
              target="_blank"
              rel="noreferrer noopener"
              aria-disabled={!demoUrl}
            >
              <div className="bg-p3y-blue">
                <button
                  className="border-2  px-4 py-[6px] border-p3y-gunmetal dark:bg-p3y-gunmetal dark:border-p3y-grey -translate-y-[2px] translate-x-[2px] hover:translate-x-[4px] hover:-translate-y-[4px] active:translate-x-0 active:translate-y-0 duration-150 transition-all bg-p3y-grey"
                  disabled={!demoUrl}
                >
                  <Image
                    className="dark:hidden"
                    priority
                    src={'/images/link.svg'}
                    width={19}
                    height={19}
                    alt={title}
                  />
                  <Image
                    className="hidden dark:block"
                    priority
                    src={'/images/link-light.svg'}
                    width={19}
                    height={19}
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
              <div className="bg-p3y-blue">
                <button
                  className="border-2 px-4 py-[6px] border-p3y-gunmetal dark:bg-p3y-gunmetal dark:border-p3y-grey -translate-y-[2px] translate-x-[2px] hover:translate-x-[4px] hover:-translate-y-[4px] active:translate-x-0 active:translate-y-0 duration-150 transition-all bg-p3y-grey"
                  disabled={!repoUrl}
                >
                  <Image
                    className="dark:hidden"
                    priority
                    src={'/images/code.svg'}
                    width={19}
                    height={19}
                    alt={title}
                  />
                  <Image
                    className="hidden dark:block"
                    priority
                    src={'/images/code-light.svg'}
                    width={19}
                    height={19}
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
  );
};

export default ProjectCard;
