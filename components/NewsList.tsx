// components/NewsList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../constants/api';

interface NewsArticle {
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
}

const NewsList = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchNews = async (query: string) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: query,
          apiKey: API_KEY,
        },
      });
      setNews(response.data.articles);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchNews(''); 
  }, []);

  const handleSearch = () => {
    fetchNews(searchQuery);
  };

  const renderItem = ({ item }: { item: NewsArticle }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.urlToImage }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{new Date(item.publishedAt).toLocaleDateString()}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for news..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  date: {
    color: '#666',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
  },
});

export default NewsList;
