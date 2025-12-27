import { IconBrandInstagram } from '@tabler/icons-react';

export default function InstagramLink() {
  return (
    <a
      href="https://www.instagram.com/one.time.official/"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full bg-gray-70 p-2 duration-150 hover:bg-[#3f4352] active:bg-[#3f4352]"
    >
      <IconBrandInstagram size={20} className="text-gray-40" />
    </a>
  );
}
