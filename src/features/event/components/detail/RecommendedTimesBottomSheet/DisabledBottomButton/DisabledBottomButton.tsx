import { motion } from 'framer-motion';

import Button from '@/components/button';
import { opacityMotionProps } from '@/lib/motion-props';

export default function DisabledBottomButton() {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-[45] flex-1 bg-gray-00 p-4 md:hidden"
      {...opacityMotionProps}
    >
      <Button variant="dark" fullWidth disabled>
        일정이 확정되었어요
      </Button>
    </motion.div>
  );
}
