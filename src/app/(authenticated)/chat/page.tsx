import { ChatWrapper } from '@/components/ui/organisms/chat/chat-wrapper';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Chat'
};

export default ChatWrapper({ showBots: false });
