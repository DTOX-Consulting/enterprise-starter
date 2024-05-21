import { Chat } from '@/components/ui/organisms/chat/chat';
import { type AuthRedirectResponse, authenticationRedirection } from '@/lib/auth/redirect';
import { nanoid } from '@/lib/utils';

export function DefaultChat({
  showBots = false
}: {
  showBots: boolean;
  auth: AuthRedirectResponse;
}) {
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
}: {
  showBots: boolean;
  element?: ChatElement;
}) {
  return async function ChatPage() {
    const auth = await authenticationRedirection();
    const Element = element ? element : DefaultChat;
    return <Element auth={auth} showBots={showBots} />;
  };
}
