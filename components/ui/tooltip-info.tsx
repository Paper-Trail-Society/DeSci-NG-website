// ShadcnUI Stuff
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { cn } from '@/lib/utils/css';

export const TooltipInfo = ({
  classNameText,
  classNameContent,
  classNameTrigger,
  text,
  icon,
  children,
}: {
  classNameText?: string;
  classNameContent?: string;
  classNameTrigger?: string;
  text: string;
  icon?: any;
  children: any;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className={cn("cursor-default", classNameTrigger)}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className={cn(
            'bg-gray-300 border-neutral-725 flex items-center justify-between rounded-[4px] py-0 h-6 text-gray-700',
            classNameContent,
          )}
        >
          <div className={cn('mr-2 self-center text-[9px] text-current', classNameText)}>{text}</div> {icon}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
