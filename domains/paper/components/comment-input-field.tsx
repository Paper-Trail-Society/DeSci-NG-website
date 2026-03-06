import React, { useState } from 'react';
import { SendIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Text } from '@/components/ui/text';

interface CommentInputFieldProps {
  isSubmitting: boolean;
  placeholder: string;
  onSubmitComment: (content: string) => void;
  compact?: boolean;
}

const CommentInputField = ({ isSubmitting, placeholder, onSubmitComment, compact = false }: CommentInputFieldProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (content.trim() && !isSubmitting) {
      onSubmitComment(content.trim());
      setContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`flex w-full flex-col rounded-xl border border-neutral-100 bg-white/50 transition-all focus-within:bg-white focus-within:shadow-sm ${compact ? 'gap-1 p-0.5' : 'gap-2 p-1 shadow-sm focus-within:shadow-md rounded-2xl'}`}
    >
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        variant="noBorderAndFocus"
        size="sm"
        disabled={isSubmitting}
        className={`w-full resize-none rounded-lg bg-transparent text-sm leading-relaxed placeholder:text-neutral-400 focus:outline-none ${compact ? 'min-h-[60px] px-3 py-2' : 'min-h-[100px] p-4'}`}
      />
      <div className={`flex items-center justify-between ${compact ? 'px-1.5 pb-1' : 'px-2 pb-2'}`}>
        <Text size={"xs"} className="text-neutral-400">
          ⌘/Ctrl + Enter to send
        </Text>
        <Button 
          type="submit" 
          disabled={!content.trim() || isSubmitting}
          className={`rounded-full p-0 shadow-sm transition-all hover:scale-105 active:scale-95 disabled:scale-100 flex items-center justify-center ${compact ? 'h-8 w-8' : 'h-9 w-9'}`}
        >
          {isSubmitting ? (
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <SendIcon className={`${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} ml-0.5`} />
          )}
        </Button>
      </div>
    </form>
  );
};

export default CommentInputField;
