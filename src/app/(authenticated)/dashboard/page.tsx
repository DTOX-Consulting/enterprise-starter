import { ScrollArea } from '@/components/ui/atoms/scroll-area';

export default function DashboardPage() {
  return (
    <ScrollArea className="h-[calc(100vh-10rem)] rounded-md border p-4">
      <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">Dashboard</h4>
    </ScrollArea>
  );
}
