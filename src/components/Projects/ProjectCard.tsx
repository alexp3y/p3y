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
    <div className="flex flex-col border-2 border-p3y-red rounded-xl h-fit text-p3y-gunmetal dark:text-p3y-red">
      <div className="h-[220px]">
        <Image
          priority
          className="rounded-t-[10px]"
          src={image}
          width={375}
          height={220}
          alt={title}
        />
      </div>
      <div className="w-full text-center flex flex-col flex-grow items-center justify-between dark:bg-p3y-gunmetal rounded-b-xl bg-p3y-ivory border-t border-p3y-red">
        <div className="w-full border-b-2 border-p3y-red pb-1 pt-2">
          <h3 className="text-2xl uppercase">{title}</h3>
        </div>
        <div className="p-2 gap-y-1 flex flex-col">
          <div className="flex items-center justify-center w-full gap-x-8">
            <Link
              href={demoUrl ? demoUrl : '/'}
              target="_blank"
              rel="noreferrer noopener"
              aria-disabled={!demoUrl}
            >
              <button
                className="border bg-p3y-red rounded-md px-2.5 py-[6px] border-p3y-gunmetal"
                disabled={!demoUrl}
              >
                <Image
                  priority
                  src={'/images/link.svg'}
                  width={18}
                  height={18}
                  alt={title}
                />
              </button>
            </Link>
            <Link
              href={repoUrl ? repoUrl : '/'}
              target="_blank"
              rel="noreferrer noopener"
              aria-disabled={!repoUrl}
            >
              <button
                className="border bg-p3y-red rounded-md px-2.5 py-[6px] border-p3y-gunmetal"
                disabled={!repoUrl}
              >
                <Image
                  priority
                  src={'/images/code.svg'}
                  width={18}
                  height={18}
                  alt={title}
                />
              </button>
            </Link>
          </div>
          <p className="text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
