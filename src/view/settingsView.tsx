import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { useResponsive } from './useResponsive';
import { commonStyles } from '../styles/commonStyles';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';

const { width, height } = Dimensions.get('window');

const SettingsView: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const { notifications, layout, toggleNotifications, setLayout } = useSettings();
  const { isTablet, isLandscape, isWeb } = useResponsive();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[
        commonStyles.content,
        isTablet && commonStyles.contentTablet,
        isLandscape && commonStyles.contentLandscape,
        isWeb && commonStyles.contentWeb
      ]}>
        <Title style={[
          commonStyles.title,
          isTablet && commonStyles.titleTablet,
          { color: colors.text }
        ]}>
          Configurações
        </Title>

        <Card style={[
          commonStyles.card,
          isTablet && commonStyles.cardTablet,
          { backgroundColor: colors.surface }
        ]}>
          <Card.Content>
            <Title style={[
              commonStyles.cardTitle,
              isTablet && commonStyles.cardTitleTablet,
              { color: colors.text }
            ]}>
              Aparência
            </Title>
            <View style={styles.settingRow}>
              <Text style={[
                styles.settingLabel,
                isTablet && styles.settingLabelTablet,
                { color: colors.text }
              ]}>
                modo noturno
              </Text>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
              />
            </View>
          </Card.Content>
        </Card>

        <Card style={[
          commonStyles.card,
          isTablet && commonStyles.cardTablet,
          { backgroundColor: colors.surface }
        ]}>
          <Card.Content>
            <Title style={[
              commonStyles.cardTitle,
              isTablet && commonStyles.cardTitleTablet,
              { color: colors.text }
            ]}>
              Notificações
            </Title>
            <View style={styles.settingRow}>
              <Text style={[
                styles.settingLabel,
                isTablet && styles.settingLabelTablet,
                { color: colors.text }
              ]}>
                receber notificações
              </Text>
              <Switch
                value={notifications}
                onValueChange={toggleNotifications}
              />
            </View>
          </Card.Content>
        </Card>

        <Card style={[
          commonStyles.card,
          isTablet && commonStyles.cardTablet,
          { backgroundColor: colors.surface }
        ]}>
          <Card.Content>
            <Title style={[
              commonStyles.cardTitle,
              isTablet && commonStyles.cardTitleTablet,
              { color: colors.text }
            ]}>
              Sobre o App
            </Title>
            <Paragraph style={[
              styles.paragraph,
              isTablet && styles.paragraphTablet,
              { color: colors.text }
            ]}>
              lista de gatos
            </Paragraph>
            <Paragraph style={[
              styles.paragraph,
              isTablet && styles.paragraphTablet,
              { color: colors.text }
            ]}>
              imagens aleatórias de gatos
            </Paragraph>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={() => {}}
          style={[
            styles.resetButton,
            isTablet && styles.resetButtonTablet
          ]}
        >
          Resetar Configurações
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: Math.min(width * 0.04, 18),
    flex: 1,
  },
  settingLabelTablet: {
    fontSize: Math.min(width * 0.045, 20),
  },
  paragraph: {
    fontSize: Math.min(width * 0.035, 16),
    marginBottom: Math.min(height * 0.006, 5),
  },
  paragraphTablet: {
    fontSize: Math.min(width * 0.04, 18),
  },
  resetButton: {
    marginTop: Math.min(height * 0.025, 20),
    paddingVertical: Math.min(height * 0.01, 8),
  },
  resetButtonTablet: {
    paddingVertical: Math.min(height * 0.015, 12),
  },
});

export default SettingsView;
