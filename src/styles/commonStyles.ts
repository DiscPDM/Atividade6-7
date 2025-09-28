import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  content: {
    padding: 20,
    paddingTop: 50,
  },
  contentTablet: {
    padding: 30,
  },
  contentLandscape: {
    padding: 15,
  },
  contentWeb: {
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  titleTablet: {
    fontSize: 28,
  },

  button: {
    minWidth: 120,
  },
  buttonTablet: {
    minWidth: 150,
    paddingVertical: 8,
  },

  card: {
    marginBottom: 20,
    elevation: 2,
  },
  cardTablet: {
    marginBottom: 25,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  cardTitleTablet: {
    fontSize: 20,
  },

  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  containerTablet: {
    padding: 30,
  },

  listContainer: {
    paddingBottom: 20,
  },
  listContainerLandscape: {
    paddingHorizontal: 10,
  },
  listContainerWeb: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },

  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTablet: {
    padding: 20,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 0,
  },
  itemLandscape: {
    padding: 12,
  },

  itemText: {
    fontSize: 16,
  },
  itemTextTablet: {
    fontSize: 18,
  },

  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  itemImageTablet: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    width: '80%',
    maxWidth: 400,
  },
  dialogTablet: {
    width: '60%',
    maxWidth: 600,
    padding: 30,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalTitleTablet: {
    fontSize: 22,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
  },
  inputTablet: {
    padding: 15,
    fontSize: 16,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonRow: {
    flex: 1,
    marginHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  deleteButtonText: {
    color: '#d32f2f',
  },
});
