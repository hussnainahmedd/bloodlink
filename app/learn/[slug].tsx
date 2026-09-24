import { Link, router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { fonts, textStyles } from '../../styles/theme';
import { articles } from '../../lib/demo';
import { Badge, EmptyState } from '../../components/ui';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';
import { Container } from '../../components/layout/Container';

export default function ArticleDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  return (
    <View className="flex-1 bg-paper">
      <SEO title={article ? article.title : 'Article not found'} description={article?.excerpt} />
      <Header />
      <ScrollView className="flex-1 ambient-paper">
        <Container narrow className="py-12 md:py-20">
          <Link href="/learn" asChild>
            <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14, color: '#C8102E' }}>
              ← All articles
            </Text>
          </Link>

          {!article ? (
            <View className="mt-6">
              <EmptyState
                mark="!"
                title="Article not found"
                message="This article doesn't exist or has been removed."
                actionLabel="Back to learn"
                onAction={() => router.push('/learn')}
              />
            </View>
          ) : (
            <View className="mt-6">
              <Badge tone="outline">{article.category}</Badge>
              <Text style={textStyles.display} className="text-ink mt-4 text-balance">
                {article.title}
              </Text>
              <View className="mt-4 pb-6 border-b border-hairline">
                <Text style={textStyles.caption} className="text-muted">
                  {article.readMinutes} min read · Educational content, not medical advice
                </Text>
              </View>
              <View className="mt-6 gap-5">
                {article.body.map((p, i) => (
                  <Text key={i} style={textStyles.body} className="text-inkSoft">
                    {p}
                  </Text>
                ))}
              </View>
              <View className="mt-10">
                <Link href="/learn" asChild>
                  <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14, color: '#C8102E' }}>
                    ← Back to all articles
                  </Text>
                </Link>
              </View>
            </View>
          )}
        </Container>
        <Footer />
      </ScrollView>
    </View>
  );
}
