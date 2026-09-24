import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { textStyles } from '../../styles/theme';
import { articles, type Article } from '../../lib/demo';
import { Badge, Card } from '../../components/ui';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { SEO } from '../../components/layout/SEO';

const WRAPPER = 'max-w-6xl w-full mx-auto px-4 md:px-8 py-12 md:py-20';

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={{ pathname: '/learn/[slug]', params: { slug: article.slug } }} asChild>
      <Pressable>
        <Card>
          <Badge tone="outline">{article.category}</Badge>
          <Text style={textStyles.h3} className="text-ink mt-3">
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
      <ScrollView className="flex-1">
        <View className={WRAPPER}>
          <Text style={textStyles.eyebrow} className="text-crimson">
            LEARN
          </Text>
          <Text style={textStyles.h1} className="text-ink mt-3">
            Know before you go
          </Text>
          <Text style={textStyles.body} className="text-inkSoft mt-3 max-w-2xl">
            Short, honest guides written for first-time donors — what happens, why it matters,
            and which fears are myths.
          </Text>
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
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
