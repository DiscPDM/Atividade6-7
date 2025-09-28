import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { useResponsive } from './useResponsive';
import { commonStyles } from '../styles/commonStyles';

const SettingsView: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const { isTablet, isLandscape, isWeb } = useResponsive();

  return (
    <ScrollView style={styles.container}>
      <View style={[
        commonStyles.content,
        isTablet && commonStyles.contentTablet,
        isLandscape && commonStyles.contentLandscape,
        isWeb && commonStyles.contentWeb
      ]}>
        <Title style={[
          commonStyles.title,
          isTablet && commonStyles.titleTablet
        ]}>
          Configurações
        </Title>

        <Card style={[
          commonStyles.card,
          isTablet && commonStyles.cardTablet
        ]}>
          <Card.Content>
            <Title style={[
              commonStyles.cardTitle,
              isTablet && commonStyles.cardTitleTablet
            ]}>
              Aparência
            </Title>
            <View style={styles.settingRow}>
              <Text style={[
                styles.settingLabel,
                isTablet && styles.settingLabelTablet
              ]}>
                modo noturno
              </Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
              />
            </View>
          </Card.Content>
        </Card>

        <Card style={[
          commonStyles.card,
          isTablet && commonStyles.cardTablet
        ]}>
          <Card.Content>
            <Title style={[
              commonStyles.cardTitle,
              isTablet && commonStyles.cardTitleTablet
            ]}>
              Notificações
            </Title>
            <View style={styles.settingRow}>
              <Text style={[
                styles.settingLabel,
                isTablet && styles.settingLabelTablet
              ]}>
                receber notificações
              </Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
              />
            </View>
          </Card.Content>
        </Card>

        <Card style={[
          commonStyles.card,
          isTablet && commonStyles.cardTablet
        ]}>
          <Card.Content>
            <Title style={[
              commonStyles.cardTitle,
              isTablet && commonStyles.cardTitleTablet
            ]}>
              Sobre o App
            </Title>
            <Paragraph style={[
              styles.paragraph,
              isTablet && styles.paragraphTablet
            ]}>
              lista de gatos
            </Paragraph>
            <Paragraph style={[
              styles.paragraph,
              isTablet && styles.paragraphTablet
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
    fontSize: 16,
    flex: 1,
  },
  settingLabelTablet: {
    fontSize: 18,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 5,
  },
  paragraphTablet: {
    fontSize: 16,
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
  resetButtonTablet: {
    paddingVertical: 12,
  },
});

export default SettingsView;
