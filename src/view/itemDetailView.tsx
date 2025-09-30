import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Item, RouteProps } from '../models/item';
import { useResponsive } from './useResponsive';
import { commonStyles } from '../styles/commonStyles';
import { useTheme } from '../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

const ItemDetailView: React.FC<RouteProps> = ({ route, navigation }) => {
  const { item } = route.params;
  const { colors } = useTheme();
  const { isTablet, isLandscape, isWeb } = useResponsive();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[
          styles.title,
          isTablet && styles.titleTablet,
          { color: colors.text }
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
                isTablet && styles.itemTitleTablet,
                { color: colors.text }
              ]}>
                {item.title}
              </Text>
              
              <Text style={[
                styles.itemId,
                isTablet && styles.itemIdTablet,
                { color: colors.secondary }
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
    padding: Math.min(width * 0.05, 25),
    paddingTop: Math.min(height * 0.06, 50),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: Math.min(width * 0.04, 20),
    padding: Math.min(width * 0.01, 8),
  },
  title: {
    fontSize: Math.min(width * 0.05, 24),
    fontWeight: 'bold',
    color: '#333',
  },
  titleTablet: {
    fontSize: Math.min(width * 0.06, 28),
  },
  detailImage: {
    width: Math.min(width * 0.5, 300),
    height: Math.min(width * 0.5, 300),
    borderRadius: Math.min(width * 0.25, 150),
    marginBottom: Math.min(height * 0.025, 20),
  },
  detailImageTablet: {
    width: Math.min(width * 0.6, 400),
    height: Math.min(width * 0.6, 400),
    borderRadius: Math.min(width * 0.3, 200),
  },
  detailImageLandscape: {
    width: Math.min(width * 0.4, 250),
    height: Math.min(width * 0.4, 250),
    borderRadius: Math.min(width * 0.2, 125),
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: Math.min(height * 0.04, 30),
  },
  itemTitle: {
    fontSize: Math.min(width * 0.045, 20),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: Math.min(height * 0.012, 10),
  },
  itemTitleTablet: {
    fontSize: Math.min(width * 0.055, 24),
  },
  itemId: {
    fontSize: Math.min(width * 0.035, 16),
    color: '#666',
    textAlign: 'center',
  },
  itemIdTablet: {
    fontSize: Math.min(width * 0.04, 18),
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Math.min(width * 0.05, 25),
  },
  editButton: {
    marginLeft: Math.min(width * 0.025, 15),
  },
});

export default ItemDetailView;
