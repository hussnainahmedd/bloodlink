import { Link, router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { fonts, textStyles } from '../../styles/theme';
import { stories } from '../../lib/demo';
import { Badge, EmptyState } from '../../components/ui';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';

const WRAPPER = 'max-w-3xl w-full mx-auto px-4 md:px-8 py-12 md:py-20';

export default function StoryDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const story = stories.find((s) => s.id === id);

  return (
    <View className="flex-1 bg-paper">
      <SEO title={story ? story.title : 'Story not found'} description={story?.excerpt} />
      <Header />
      <ScrollView className="flex-1">
        <View className={WRAPPER}>
          <Link href="/stories" asChild>
            <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14, color: '#C8102E' }}>
              ← All stories
            </Text>
          </Link>

          {!story ? (
            <View className="mt-6">
              <EmptyState
                mark="!"
                title="Story not found"
                message="This story doesn't exist or has been removed."
                actionLabel="Back to stories"
                onAction={() => router.push('/stories')}
              />
            </View>
          ) : (
            <View className="mt-6">
              <View className="flex-row flex-wrap items-center gap-2">
                <Badge tone={story.role === 'Donor' ? 'leaf' : 'ink'}>{story.role}</Badge>
                <Text style={textStyles.caption} className="text-muted">
                  {story.date}
                </Text>
              </View>
              <Text style={textStyles.display} className="text-ink mt-4">
                {story.title}
              </Text>
              <View className="mt-4 pb-6 border-b border-hairline">
                <Text style={textStyles.bodySmall} className="text-inkSoft">
                  By <Text style={{ fontFamily: fonts.sansSemiBold, color: '#1C1917' }}>{story.author}</Text>
                </Text>
                <Text style={textStyles.caption} className="text-muted mt-1">
                  Names and details are fictional demo content.
                </Text>
              </View>
              <View className="mt-6 gap-5">
                {story.body.map((p, i) => (
                  <Text key={i} style={textStyles.body} className="text-inkSoft">
                    {p}
                  </Text>
                ))}
              </View>
              <View className="mt-10">
                <Link href="/stories" asChild>
                  <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14, color: '#C8102E' }}>
                    ← Back to all stories
                  </Text>
                </Link>
              </View>
            </View>
          )}
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
