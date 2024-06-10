import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

interface Props {
  link: string;
  image: string;
  title: string;
  external?: boolean;
}

const ProjectCard: React.FC<Props> = ({ link, image, title, external }) => {
  return (
    <Link
      href={link}
      target={external ? '_blank' : ''}
      rel={external ? '_blank' : ''}
    >
      <div className="flex flex-col border border-p3y-red rounded-2xl cursor-pointer h-[240px]">
        <Image
          priority
          className="rounded-t-2xl shadow-md"
          src={image}
          width={300}
          height={200}
          alt={title}
        />
        <div className="w-full text-center flex flex-col flex-grow items-center justify-center">
          <h3 className="text-2xl">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
