import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Item, RouteProps } from '../models/item';
import { useResponsive } from './useResponsive';
import { commonStyles } from '../styles/commonStyles';

const ItemDetailView: React.FC<RouteProps> = ({ route, navigation }) => {
  const { item } = route.params;
  const { isTablet, isLandscape, isWeb } = useResponsive();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={[
          styles.title,
          isTablet && styles.titleTablet
        ]}>
          Detalhes do Gato
        </Text>
      </View>

      <View style={[
        commonStyles.content,
        isTablet && commonStyles.contentTablet,
        isLandscape && commonStyles.contentLandscape,
        isWeb && commonStyles.contentWeb
      ]}>
        {item.imageUrl && (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={[
              styles.detailImage,
              isTablet && styles.detailImageTablet,
              isLandscape && styles.detailImageLandscape
            ]}
          />
        )}
        
        <View style={styles.textContainer}>
          <Text style={[
            styles.itemTitle,
            isTablet && styles.itemTitleTablet
          ]}>
            {item.title}
          </Text>
          
          <Text style={[
            styles.itemId,
            isTablet && styles.itemIdTablet
          ]}>
            ID: {item.id}
          </Text>
        </View>

        <View style={styles.actions}>
          <Button 
            mode="outlined" 
            onPress={() => navigation.goBack()}
            style={[
              commonStyles.button,
              isTablet && commonStyles.buttonTablet
            ]}
          >
            Voltar
          </Button>
          
          <Button 
            mode="contained" 
            onPress={() => {
              navigation.goBack();
            }}
            style={[
              commonStyles.button,
              styles.editButton,
              isTablet && commonStyles.buttonTablet
            ]}
          >
            Editar
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  titleTablet: {
    fontSize: 24,
  },
  detailImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  detailImageTablet: {
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  detailImageLandscape: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  itemTitleTablet: {
    fontSize: 22,
  },
  itemId: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  itemIdTablet: {
    fontSize: 16,
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  editButton: {
    marginLeft: 10,
  },
});

export default ItemDetailView;
