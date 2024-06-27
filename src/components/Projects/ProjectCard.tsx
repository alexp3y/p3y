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
    <div className="flex flex-col border-2 border-p3y-red rounded-xl h-fit">
      <div className="h-[200px]">
        <Image
          priority
          className="rounded-t-lg"
          src={image}
          width={325}
          height={200}
          alt={title}
        />
      </div>
      <div className="w-full text-center flex flex-col flex-grow items-center justify-between p-3 dark:bg-p3y-gunmetal rounded-b-xl bg-p3y-ivory border-t border-p3y-red gap-3">
        <h3 className="text-2xl uppercase">{title}</h3>
        <div className="flex items-center justify-center w-full gap-x-8">
          <Link
            href={demoUrl ? demoUrl : '/'}
            target="_blank"
            rel="noreferrer noopener"
            aria-disabled={!demoUrl}
          >
            <button
              className="border rounded-md p-2 disabled:bg-p3y-grey disabled:border-p3y-grey bg-p3y-maize dark:bg-p3y-blue dark:disabled:bg-p3y-grey"
              disabled={!demoUrl}
            >
              <Image
                priority
                src={'/images/link.svg'}
                width={20}
                height={20}
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
              className="border rounded-md p-2 disabled:bg-p3y-grey disabled:border-p3y-grey bg-p3y-maize dark:bg-p3y-blue dark:disabled:bg-p3y-grey"
              disabled={!repoUrl}
            >
              <Image
                priority
                src={'/images/code.svg'}
                width={20}
                height={20}
                alt={title}
              />
            </button>
          </Link>
        </div>
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
