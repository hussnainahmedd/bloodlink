import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { textStyles } from '../../styles/theme';
import { articles, type Article } from '../../lib/demo';
import { Badge, Card } from '../../components/ui';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';
import { Container } from '../../components/layout/Container';
import { SectionHeader } from '../../components/layout/SectionHeader';

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={{ pathname: '/learn/[slug]', params: { slug: article.slug } }} asChild>
      <Pressable>
        <Card>
          <Badge tone="outline">{article.category}</Badge>
          <Text style={textStyles.h3} className="text-ink mt-3 text-balance">
            {article.title}
          </Text>
          <Text style={textStyles.bodySmall} className="text-inkSoft mt-2">
            {article.excerpt}
          </Text>
          <Text style={textStyles.caption} className="text-muted mt-4">
            {article.readMinutes} min read →
          </Text>
        </Card>
      </Pressable>
    </Link>
  );
}

export default function Learn() {
  const groups = useMemo(() => {
    const map = new Map<string, Article[]>();
    articles.forEach((a) => {
      const list = map.get(a.category) ?? [];
      list.push(a);
      map.set(a.category, list);
    });
    return [...map.entries()];
  }, []);

  return (
    <View className="flex-1 bg-paper">
      <SEO title="Learn" description="Short, honest guides on blood donation — why it matters, how it works, and what to expect." />
      <Header />
      <ScrollView className="flex-1 ambient-paper">
        <Container className="py-12 md:py-20">
          <SectionHeader
            eyebrow="LEARN"
            title="Know before you go"
            lede="Short, honest guides written for first-time donors — what happens, why it matters, and which fears are myths."
          />
          {groups.map(([category, list]) => (
            <View key={category} className="mt-10">
              <Text style={textStyles.eyebrow} className="text-muted mb-4">
                {category.toUpperCase()}
              </Text>
              <View className="gap-5">
                {list.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </View>
            </View>
          ))}
        </Container>
        <Footer />
      </ScrollView>
    </View>
  );
}
