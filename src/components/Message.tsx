import { format } from 'date-fns';
import { UserIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Message = ({ content, isUser, timestamp }: MessageProps) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex max-w-xs sm:max-w-md md:max-w-lg ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}
      >
        <div
          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isUser ? 'bg-indigo-100 text-indigo-800' : 'bg-purple-100 text-purple-800'}`}
        >
          {isUser ? (
            <UserIcon className="h-5 w-5" />
          ) : (
            <SparklesIcon className="h-5 w-5" />
          )}
        </div>
        <div
          className={`px-4 py-2 rounded-lg ${isUser ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'}`}
        >
          <p className="whitespace-pre-wrap">{content}</p>
          <p
            className={`text-xs mt-1 ${isUser ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'}`}
          >
            {format(timestamp, 'h:mm a')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
