import { agents, Agent } from '@/app/data/agents';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Phone, Mail } from 'lucide-react';

function AgentCard({ agent }: { agent: Agent }) {
  const agentImage = PlaceHolderImages.find((img) => img.id === agent.image);

  return (
    <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center">
        {agentImage && (
          <Image
            src={agentImage.imageUrl}
            alt={agent.name}
            width={128}
            height={128}
            className="rounded-full border-4 border-primary/20"
            data-ai-hint={agentImage.imageHint}
          />
        )}
      </CardHeader>
      <CardContent>
        <CardTitle className="font-headline text-xl">{agent.name}</CardTitle>
        <CardDescription className="text-accent-foreground font-medium mt-1">{agent.title}</CardDescription>
        <div className="mt-4 flex justify-center gap-2">
            <Button size="icon" variant="outline"><Phone className="w-4 h-4" /></Button>
            <Button size="icon" variant="outline"><Mail className="w-4 h-4" /></Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Agents() {
  return (
    <section id="agents" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Meet Our Expert Agents</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
            Our dedicated team is here to guide you through every step of your real estate journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
}
