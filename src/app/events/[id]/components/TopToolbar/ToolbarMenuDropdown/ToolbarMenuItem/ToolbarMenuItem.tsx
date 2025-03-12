import EditIcon from '@/components/icon/EditIcon';
import TrashIcon from '@/components/icon/TrashIcon';
import { useRouter } from '@/navigation';
import cn from '@/utils/cn';

interface ToolbarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  name: string;
  icon: 'edit' | 'delete';
  href?: string;
  variant?: 'default' | 'danger';
}

export default function ToolbarMenuItem({
  name,
  icon,
  href = '#',
  variant = 'default',
  ...props
}: ToolbarMenuItemProps) {
  const router = useRouter();

  function handleMenuItemClick() {
    router.push(href);
  }

  return (
    <li
      className={cn(
        'flex w-full cursor-pointer items-center gap-1 py-1.5 pl-4 pr-5 pt-2 text-gray-60 duration-150 text-md-200 first:pt-2 last:pb-2',
        {
          'text-danger-50': variant === 'danger',
        },
      )}
      onClick={handleMenuItemClick}
      {...props}
    >
      <span>
        {icon === 'edit' && <EditIcon size={20} fill="#757A95" />}
        {icon === 'delete' && (
          <TrashIcon size={20} fill="#E4678D" innerFill="#FFFFFF" />
        )}
      </span>
      <span>{name}</span>
    </li>
  );
}
