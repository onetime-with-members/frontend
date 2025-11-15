import { useContext } from 'react';

import { GuideDialogContext } from '@/features/schedule/contexts/GuideDialogContext';

export default function TextContent() {
  const {
    guideContents: { title, description },
  } = useContext(GuideDialogContext);

  return (
    <div className="py-5 text-center text-gray-70">
      <h2 className="title-md-300">{title}</h2>
      <p className="text-md-100">{description}</p>
    </div>
  );
}
