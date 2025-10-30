import Skeleton from 'react-loading-skeleton';

import {
  SKELETON_TOOLBAR_TITLE_COLOR,
  SKELETON_TOOLBAR_TITLE_HIGHLIGHT_COLOR,
} from '@/constants';

export default function ToolbarTitleSkeleton() {
  return (
    <Skeleton
      width={200}
      baseColor={SKELETON_TOOLBAR_TITLE_COLOR}
      highlightColor={SKELETON_TOOLBAR_TITLE_HIGHLIGHT_COLOR}
      borderRadius={9999}
    />
  );
}
