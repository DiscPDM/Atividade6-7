export interface Item {
  id: string;
  title: string;
  imageUrl?: string;
}

export interface NavigationProps {
  navigation: any;
}

export interface RouteProps {
  route: {
    params: {
      item: Item;
    };
  };
  navigation: any;
}

export type RootStackParamList = {
  MainTabs: undefined;
  ItemDetail: {
    item: Item;
  };
};