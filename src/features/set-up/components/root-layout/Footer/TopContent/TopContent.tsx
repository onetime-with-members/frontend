import Copyright from './Copyright';
import InstagramLink from './InstagramLink';
import Logo from './Logo';

export default function TopContent() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Logo />
        <InstagramLink />
      </div>
      <Copyright />
    </div>
  );
}
