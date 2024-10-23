import { Chat } from '@/components/ui/organisms/chat/chat';
import { nanoid } from '@/lib/utils/id';

export function DefaultChat({
  showBots = false
}: Readonly<{
  showBots: boolean;
}>) {
  const id = nanoid();
  return (
    <div className="h-full">
      <Chat id={id} showBots={showBots} />
    </div>
  );
}

type ChatElement = typeof DefaultChat | undefined;

export function ChatWrapper({
  showBots,
  element
}: Readonly<{
  showBots: boolean;
  element?: ChatElement;
}>) {
  return function ChatPage() {
    const Element = element ? element : DefaultChat;
    return <Element showBots={showBots} />;
  };
}
