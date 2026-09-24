import { Link } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { textStyles } from '../../styles/theme';
import { stories, type Story } from '../../lib/demo';
import { Badge, Card } from '../../components/ui';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';

function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={{ pathname: '/stories/[id]', params: { id: story.id } }} asChild>
      <Pressable>
        <Card>
          <View className="flex-row flex-wrap items-center gap-2 mb-3">
            <Badge tone={story.role === 'Donor' ? 'leaf' : 'ink'}>{story.role}</Badge>
            <Text style={textStyles.caption} className="text-muted">
              {story.date}
            </Text>
          </View>
          <Text style={textStyles.h3} className="text-ink text-balance">
            {story.title}
          </Text>
          <Text style={textStyles.bodySmall} className="text-inkSoft mt-2">
            {story.excerpt}
          </Text>
          <Text style={textStyles.caption} className="text-muted mt-4">
            By {story.author} · Read the story →
          </Text>
        </Card>
      </Pressable>
    </Link>
  );
}

export default function Stories() {
  return (
    <View className="flex-1 bg-paper">
      <SEO title="Donor stories" description="Real-feeling stories from donors and recipient families." />
      <Header />
      <ScrollView className="flex-1 ambient-paper">
        <Container className="py-12 md:py-20">
          <SectionHeader
            eyebrow="STORIES"
            title="Twelve minutes that mattered"
            lede="Donors, recipients, and the families in between — short accounts of what one donation can do. Names are fictional; the shape of these stories is very real."
          />
          <View className="mt-8 gap-5">
            {stories.map((s) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </View>
        </Container>
        <Footer />
      </ScrollView>
    </View>
  );
}
