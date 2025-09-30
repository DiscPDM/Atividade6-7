import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const commonStyles = StyleSheet.create({
  content: {
    padding: Math.min(width * 0.05, 30),
    paddingTop: Math.min(height * 0.06, 50),
  },
  contentTablet: {
    padding: Math.min(width * 0.08, 50),
  },
  contentLandscape: {
    padding: Math.min(width * 0.04, 20),
  },
  contentWeb: {
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
    padding: Math.min(width * 0.05, 40),
  },

  title: {
    fontSize: Math.min(width * 0.06, 28),
    fontWeight: 'bold',
    marginBottom: Math.min(height * 0.025, 20),
    textAlign: 'center',
  },
  titleTablet: {
    fontSize: Math.min(width * 0.07, 32),
  },

  button: {
    minWidth: Math.min(width * 0.3, 120),
  },
  buttonTablet: {
    minWidth: Math.min(width * 0.4, 150),
    paddingVertical: Math.min(height * 0.01, 8),
  },

  card: {
    marginBottom: Math.min(height * 0.025, 20),
    elevation: 2,
  },
  cardTablet: {
    marginBottom: Math.min(height * 0.03, 25),
  },
  cardTitle: {
    fontSize: Math.min(width * 0.045, 20),
    marginBottom: Math.min(height * 0.02, 15),
  },
  cardTitleTablet: {
    fontSize: Math.min(width * 0.05, 22),
  },

  container: {
    flex: 1,
    padding: Math.min(width * 0.05, 30),
    paddingTop: Math.min(height * 0.06, 50),
  },
  containerTablet: {
    padding: Math.min(width * 0.08, 50),
  },

  listContainer: {
    paddingBottom: Math.min(height * 0.025, 20),
  },
  listContainerLandscape: {
    paddingHorizontal: Math.min(width * 0.025, 15),
  },
  listContainerWeb: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },

  item: {
    padding: Math.min(width * 0.04, 20),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
  },
  itemTablet: {
    padding: Math.min(width * 0.05, 25),
    margin: Math.min(width * 0.01, 8),
    borderRadius: Math.min(width * 0.02, 10),
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 0,
    flex: 1,
    minHeight: Math.min(height * 0.1, 80),
  },
  itemLandscape: {
    padding: Math.min(width * 0.03, 15),
    flex: 1,
  },

  itemText: {
    fontSize: Math.min(width * 0.04, 18),
  },
  itemTextTablet: {
    fontSize: Math.min(width * 0.045, 20),
  },

  itemImage: {
    width: Math.min(width * 0.1, 50),
    height: Math.min(width * 0.1, 50),
    borderRadius: Math.min(width * 0.05, 25),
    marginRight: Math.min(width * 0.02, 12),
  },
  itemImageTablet: {
    width: Math.min(width * 0.12, 60),
    height: Math.min(width * 0.12, 60),
    borderRadius: Math.min(width * 0.06, 30),
    marginRight: Math.min(width * 0.03, 15),
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: 'white',
    padding: Math.min(width * 0.05, 25),
    margin: Math.min(width * 0.05, 25),
    borderRadius: Math.min(width * 0.02, 10),
    width: '80%',
    maxWidth: 400,
  },
  dialogTablet: {
    width: '60%',
    maxWidth: 600,
    padding: Math.min(width * 0.08, 40),
  },
  dialogLandscape: {
    width: '70%',
    maxWidth: 500,
  },
  dialogWeb: {
    width: '90%',
    maxWidth: 500,
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  },

  modalTitle: {
    fontSize: Math.min(width * 0.045, 20),
    fontWeight: 'bold',
    marginBottom: Math.min(height * 0.025, 20),
    textAlign: 'center',
  },
  modalTitleTablet: {
    fontSize: Math.min(width * 0.055, 24),
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: Math.min(width * 0.025, 15),
    marginBottom: Math.min(height * 0.025, 20),
    borderRadius: Math.min(width * 0.01, 5),
  },
  inputTablet: {
    padding: Math.min(width * 0.04, 20),
    fontSize: Math.min(width * 0.04, 18),
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Math.min(height * 0.025, 20),
  },
  buttonRow: {
    flex: 1,
    marginHorizontal: Math.min(width * 0.01, 5),
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  deleteButtonText: {
    color: '#d32f2f',
  },
});
